import React, { createContext, useContext, useEffect, useState } from 'react';
import { CollectorItem, User, Community, CommunityMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { auth, db, loginWithGoogle, logoutGoogle, testConnection } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, onSnapshot, query, setDoc as firestoreSetDoc, deleteDoc, orderBy, where, getDoc } from 'firebase/firestore';

interface StoreState {
  items: CollectorItem[];
  currentUser: User | null;
  leaderboard: User[];
  communities: Community[];
  isLoaded: boolean;
  addItem: (item: CollectorItem) => void;
  deleteItem: (id: string) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  createCommunity: (name: string, description: string) => Promise<void>;
  sendMessage: (communityId: string, text: string) => Promise<void>;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CollectorItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
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
        const qItems = query(collection(db, 'users', firebaseUser.uid, 'items'));
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

    return () => {
      unsubUsers();
      unsubCommunities();
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
    // userId must strictly match currentUser.id according to rules
    const payload = { ...item, userId: currentUser.id };
    await setDoc(itemRef, payload);
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

  return (
    <StoreContext.Provider value={{ items, currentUser, leaderboard, communities, isLoaded, addItem, deleteItem, login, logout, createCommunity, sendMessage }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
