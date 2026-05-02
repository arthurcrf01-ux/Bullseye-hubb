import React, { createContext, useContext, useEffect, useState } from 'react';
import { CollectorItem, User, Community, CommunityMessage, Friendship, ChatMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { auth, db, loginWithGoogle, logoutGoogle, testConnection } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, onSnapshot, query, setDoc as firestoreSetDoc, deleteDoc, orderBy, where, getDoc } from 'firebase/firestore';

interface StoreState {
  items: CollectorItem[];
  currentUser: User | null;
  leaderboard: User[];
  communities: Community[];
  friendships: Friendship[];
  isLoaded: boolean;
  addItem: (item: CollectorItem) => void;
  deleteItem: (id: string) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  createCommunity: (name: string, description: string) => Promise<void>;
  sendMessage: (communityId: string, text: string) => Promise<void>;
  deleteCommunityMessage: (communityId: string, messageId: string) => Promise<void>;
  sendFriendRequest: (targetUserId: string) => Promise<void>;
  acceptFriendRequest: (friendshipId: string) => Promise<void>;
  removeFriend: (friendshipId: string) => Promise<void>;
  sendDirectMessage: (friendshipId: string, text: string) => Promise<void>;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CollectorItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    testConnection();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch/create user document
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        let userObj: User;
        if (userSnap.exists()) {
          userObj = userSnap.data() as User;
        } else {
          userObj = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Colecionador',
            points: 0,
            avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
          };
          await setDoc(userRef, userObj);
        }
        setCurrentUser(userObj);

        // Fetch Items
        const qItems = query(collection(db, 'users', firebaseUser.uid, 'items'), where('userId', '==', firebaseUser.uid));
        const unsubItems = onSnapshot(qItems, (snap) => {
          const fetchedItems = snap.docs.map(d => d.data() as CollectorItem);
          setItems(fetchedItems.sort((a,b) => b.createdAt - a.createdAt));
          
          // update user points atomically
          const newPoints = fetchedItems.length * 10;
          if (newPoints !== userObj.points) {
             userObj.points = newPoints;
             setCurrentUser({...userObj});
             // Fire and forget update
             setDoc(userRef, { points: newPoints }, { merge: true });
          }
        });

      } else {
        setCurrentUser(null);
        setItems([]);
        setIsLoaded(true);
      }
    });

    return () => unsub();
  }, []);

  // Sync communities and leaderboard publicly if signed in
  useEffect(() => {
    if (!currentUser) return;
    
    // Leaderboard
    const qUsers = query(collection(db, 'users'), where('points', '>=', 0));
    const unsubUsers = onSnapshot(qUsers, (snap) => {
       const users = snap.docs.map(d => d.data() as User);
       users.sort((a, b) => b.points - a.points);
       setLeaderboard(users);
    });

    // Communities
    const qCommunities = query(collection(db, 'communities'), where('createdAt', '>=', 0));
    const unsubCommunities = onSnapshot(qCommunities, async (snap) => {
      const comms: Community[] = [];
      for (const d of snap.docs) {
        const commData = d.data() as Omit<Community, 'messages'>;
        
        // Fetch subcollection messages
        // Doing this manually once per community change could be slow, but for MVP it works
        // Realtime sync for messages will be implemented via separate listener in UI or here.
        // For now, fetch them statically on community load
        const msgsSnap = await getDocs(query(collection(db, 'communities', d.id, 'messages'), where('createdAt', '>=', 0)));
        const messages = msgsSnap.docs.map(md => md.data() as CommunityMessage);
        messages.sort((a,b) => a.createdAt - b.createdAt);
        
        comms.push({ ...commData, messages } as Community);
      }
      comms.sort((a,b) => b.createdAt - a.createdAt);
      setCommunities(comms);
      setIsLoaded(true);
    });

    // Friendships
    const qFriendships = query(collection(db, 'friendships'), where('participants', 'array-contains', currentUser.id));
    const unsubFriendships = onSnapshot(qFriendships, (snap) => {
      const updatedFriendships = snap.docs.map(d => d.data() as Friendship);
      setFriendships(updatedFriendships.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unsubUsers();
      unsubCommunities();
      unsubFriendships();
    };
  }, [currentUser]);

  const login = async () => {
    await loginWithGoogle();
  };

  const logout = async () => {
    await logoutGoogle();
  };

  const addItem = async (item: CollectorItem) => {
    if (!currentUser) return;
    const itemRef = doc(db, 'users', currentUser.id, 'items', item.id);
    const payload = { ...item, userId: currentUser.id };
    
    try {
      await setDoc(itemRef, payload);
    } catch (err: any) {
      console.error("Firestore Error in addItem:", err);
      // O throw propaga o erro de volta para quem chamou (AddItemView) para ele travar a tela e mostrar a mensagem vermelha.
      throw new Error("Erro de Segurança no Servidor: " + err.message);
    }
  };

  const deleteItem = async (id: string) => {
    if (!currentUser) return;
    const itemRef = doc(db, 'users', currentUser.id, 'items', id);
    await deleteDoc(itemRef);
  };

  const createCommunity = async (name: string, description: string) => {
    if (!currentUser) return;
    const commId = uuidv4();
    const newCommunity: Omit<Community, 'messages'> = {
      id: commId,
      name,
      description,
      creatorId: currentUser.id,
      createdAt: Date.now(),
    };
    await setDoc(doc(db, 'communities', commId), newCommunity);
  };

  const sendMessage = async (communityId: string, text: string) => {
    if (!currentUser) return;
    const msgId = uuidv4();
    const message: CommunityMessage = {
      id: msgId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatarUrl,
      text,
      createdAt: Date.now()
    };
    await setDoc(doc(db, 'communities', communityId, 'messages', msgId), message);
    
    // Manually push to local state to reflect instantly before snapshot catches up
    setCommunities(prev => prev.map(c => {
      if (c.id === communityId) {
        return { ...c, messages: [...c.messages, message] };
      }
      return c;
    }));
  };

  const deleteCommunityMessage = async (communityId: string, messageId: string) => {
    if (!currentUser) return;
    // We do not check if it's the current user's message here, relying on UI or Security Rules
    await deleteDoc(doc(db, 'communities', communityId, 'messages', messageId));
    
    // Manually remove from local state
    setCommunities(prev => prev.map(c => {
      if (c.id === communityId) {
        return { ...c, messages: c.messages.filter(m => m.id !== messageId) };
      }
      return c;
    }));
  };

  const sendFriendRequest = async (targetUserId: string) => {
    if (!currentUser) return;
    const participants = [currentUser.id, targetUserId].sort();
    const friendshipId = participants.join('_');
    
    // Verify if already exists
    const existing = friendships.find(f => f.id === friendshipId);
    if (existing) return;

    const friendship: Friendship = {
      id: friendshipId,
      participants,
      status: 'pending',
      requesterId: currentUser.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await setDoc(doc(db, 'friendships', friendshipId), friendship);
  };

  const acceptFriendRequest = async (friendshipId: string) => {
    if (!currentUser) return;
    const existing = friendships.find(f => f.id === friendshipId);
    if (!existing || existing.status === 'accepted') return;
    
    await setDoc(doc(db, 'friendships', friendshipId), {
      status: 'accepted',
      updatedAt: Date.now()
    }, { merge: true });
  };

  const removeFriend = async (friendshipId: string) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'friendships', friendshipId));
  };

  const sendDirectMessage = async (friendshipId: string, text: string) => {
    if (!currentUser) return;
    const msgId = uuidv4();
    const message: ChatMessage = {
      id: msgId,
      userId: currentUser.id,
      text,
      createdAt: Date.now()
    };
    await setDoc(doc(db, 'friendships', friendshipId, 'messages', msgId), message);
  };

  return (
    <StoreContext.Provider value={{
      items, currentUser, leaderboard, communities, friendships, isLoaded, 
      addItem, deleteItem, login, logout, createCommunity, sendMessage, deleteCommunityMessage,
      sendFriendRequest, acceptFriendRequest, removeFriend, sendDirectMessage
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
