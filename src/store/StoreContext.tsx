import React, { createContext, useContext, useEffect, useState } from 'react';
import localforage from 'localforage';
import { CollectorItem, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface StoreState {
  items: CollectorItem[];
  currentUser: User | null;
  leaderboard: User[];
  isLoaded: boolean;
  addItem: (item: CollectorItem) => void;
  deleteItem: (id: string) => void;
  login: (name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CollectorItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localforage to handle larger base64 strings securely
    const loadData = async () => {
      try {
        const storedItems = await localforage.getItem<CollectorItem[]>('bullseye_items') || [];
        const storedUser = await localforage.getItem<User>('bullseye_user');
        
        setItems(storedItems);
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

  return (
    <StoreContext.Provider value={{ items, currentUser, leaderboard, isLoaded, addItem, deleteItem, login, logout }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}

