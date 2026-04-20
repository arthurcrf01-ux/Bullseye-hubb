import React, { useState } from 'react';
import { StoreProvider, useStore } from './store/StoreContext';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { HomeDashboard } from './components/HomeDashboard';
import { MyCollection } from './components/MyCollection';
import { AddItemView } from './components/AddItemView';
import { LeaderboardView } from './components/LeaderboardView';
import { LoginView } from './components/LoginView';
import { TermsView } from './components/TermsView';
import { ArticlesView } from './components/ArticlesView';
import { Target, BookOpen, Shield, Users } from 'lucide-react';
import { CommunitiesView } from './components/CommunitiesView';

export type ViewState = 'home' | 'collection' | 'add' | 'leaderboard' | 'articles' | 'terms' | 'communities';

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
           {currentView === 'articles' && <ArticlesView />}
           {currentView === 'terms' && <TermsView />}
           {currentView === 'communities' && <CommunitiesView />}
        </div>
        
        {/* Footer para SEO e AdSense */}
        <footer className="w-full border-t border-slate-800 bg-slate-900/50 py-8 px-4 mt-8 pb-32 md:pb-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              <span className="font-bold text-slate-300">Bullseye Collectors © 2026</span>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
              <button 
                onClick={() => setCurrentView('articles')}
                className="hover:text-indigo-400 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Blog & Curiosidades
              </button>
              <button 
                onClick={() => setCurrentView('terms')}
                className="hover:text-indigo-400 transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Termos de Uso
              </button>
            </div>
          </div>
        </footer>
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
