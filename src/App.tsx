import React, { useState } from 'react';
import { StoreProvider, useStore } from './store/StoreContext';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { HomeDashboard } from './components/HomeDashboard';
import { MyCollection } from './components/MyCollection';
import { AddItemView } from './components/AddItemView';
import { LeaderboardView } from './components/LeaderboardView';
import { LoginView } from './components/LoginView';
import { Target } from 'lucide-react';

export type ViewState = 'home' | 'collection' | 'add' | 'leaderboard';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const { currentUser, isLoaded } = useStore();

  if (!isLoaded) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-slate-950">
        <Target className="w-12 h-12 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <LoginView />;
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar (Desktop) */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full relative pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full min-h-full">
           {currentView === 'home' && <HomeDashboard onAddClick={() => setCurrentView('add')} />}
           {currentView === 'collection' && <MyCollection />}
           {currentView === 'add' && <AddItemView onComplete={() => setCurrentView('collection')} />}
           {currentView === 'leaderboard' && <LeaderboardView />}
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
