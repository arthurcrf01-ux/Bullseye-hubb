import React, { createContext, useContext, useEffect, useState } from 'react';
import localforage from 'localforage';
import { CollectorItem, User, Community, CommunityMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface StoreState {
  items: CollectorItem[];
  currentUser: User | null;
  leaderboard: User[];
  communities: Community[];
  isLoaded: boolean;
  addItem: (item: CollectorItem) => void;
  deleteItem: (id: string) => void;
  login: (name: string) => Promise<void>;
  logout: () => Promise<void>;
  createCommunity: (name: string, description: string) => Promise<void>;
  sendMessage: (communityId: string, text: string) => Promise<void>;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CollectorItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localforage to handle larger base64 strings securely
    const loadData = async () => {
      try {
        const storedItems = await localforage.getItem<CollectorItem[]>('bullseye_items') || [];
        const storedUser = await localforage.getItem<User>('bullseye_user');
        const storedCommunities = await localforage.getItem<Community[]>('bullseye_communities') || [];
        
        setItems(storedItems);
        setCommunities(storedCommunities);
        if (storedUser) {
          // Recalculate points
          const points = storedItems.length * 10;
          setCurrentUser({ ...storedUser, points });
        }
      } catch (err) {
        console.error("Failed to load collection", err);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  const login = async (name: string) => {
    const newUser: User = {
      id: uuidv4(),
      name,
      points: items.length * 10,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    setCurrentUser(newUser);
    await localforage.setItem('bullseye_user', newUser);
  };

  const logout = async () => {
    setCurrentUser(null);
    await localforage.removeItem('bullseye_user');
  };

  const addItem = async (item: CollectorItem) => {
    const newItems = [item, ...items];
    setItems(newItems);
    if (currentUser) {
      const updatedUser = { ...currentUser, points: newItems.length * 10 };
      setCurrentUser(updatedUser);
      await localforage.setItem('bullseye_user', updatedUser);
    }
    await localforage.setItem('bullseye_items', newItems);
  };

  const deleteItem = async (id: string) => {
    const newItems = items.filter(i => i.id !== id);
    setItems(newItems);
    if (currentUser) {
      const updatedUser = { ...currentUser, points: newItems.length * 10 };
      setCurrentUser(updatedUser);
      await localforage.setItem('bullseye_user', updatedUser);
    }
    await localforage.setItem('bullseye_items', newItems);
  };

  const leaderboard = currentUser ? [currentUser] : [];

  const createCommunity = async (name: string, description: string) => {
    const newCommunity: Community = {
      id: uuidv4(),
      name,
      description,
      createdAt: Date.now(),
      messages: []
    };
    const updated = [newCommunity, ...communities];
    setCommunities(updated);
    await localforage.setItem('bullseye_communities', updated);
  };

  const sendMessage = async (communityId: string, text: string) => {
    if (!currentUser) return;
    
    const message: CommunityMessage = {
      id: uuidv4(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatarUrl,
      text,
      createdAt: Date.now()
    };

    const updated = communities.map(c => {
      if (c.id === communityId) {
        return { ...c, messages: [...c.messages, message] };
      }
      return c;
    });

    setCommunities(updated);
    await localforage.setItem('bullseye_communities', updated);
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

