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
import { AboutView } from './components/AboutView';
import { Target, BookOpen, Shield, Users, LogIn, Info, Bell, LogOut } from 'lucide-react';
import { CommunitiesView } from './components/CommunitiesView';
import { StickersView } from './components/StickersView';

export type ViewState = 'home' | 'collection' | 'add' | 'leaderboard' | 'articles' | 'terms' | 'communities' | 'about' | 'stickers';

function TopBar({ currentView, setCurrentView }: { currentView: string, setCurrentView: (v: ViewState) => void }) {
  const { currentUser, friendships, leaderboard, acceptFriendRequest, removeFriend, logout } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Requests directed TO me that are pending
  const pendingRequests = friendships.filter(f => 
    f.status === 'pending' && 
    f.participants.includes(currentUser?.id || '') && 
    f.requesterId !== currentUser?.id
  );
  
  const pendingRequestsCount = pendingRequests.length;

  return (
    <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-sm">
       <div className="md:hidden flex items-center gap-2 font-black uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
         Bullseye
       </div>
       <div className="hidden md:block"></div>
       <div className="flex items-center gap-4">
          <div className="relative">
            <button 
               onClick={() => setShowNotifications(!showNotifications)} 
               className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
               {pendingRequestsCount > 0 ? (
                 <>
                   <Bell className="w-5 h-5 text-emerald-400 animate-pulse" />
                   <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-slate-900">{pendingRequestsCount}</span>
                 </>
               ) : (
                 <Bell className="w-5 h-5" />
               )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 border-b border-slate-800 bg-slate-800/50">
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
                    <Bell className="w-4 h-4" /> Notificações
                  </h4>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {pendingRequests.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-400">
                      Nenhuma notificação no momento.
                    </div>
                  ) : (
                    <div className="p-2 space-y-2">
                      {pendingRequests.map(req => {
                        const requester = leaderboard.find(u => u.id === req.requesterId);
                        return (
                          <div key={req.id} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                             <div className="flex items-center gap-2 mb-2">
                               <img src={requester?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${req.requesterId}`} className="w-8 h-8 rounded-full border border-slate-600 bg-slate-700" alt="avatar" />
                               <div className="text-sm">
                                 <span className="font-bold text-white">{requester?.name || 'Alguém'}</span> quer ser seu amigo(a).
                               </div>
                             </div>
                             <div className="flex gap-2 mt-2">
                               <button 
                                 onClick={() => acceptFriendRequest(req.id)}
                                 className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 rounded-lg transition-colors"
                               >
                                 Aceitar
                               </button>
                               <button 
                                 onClick={() => removeFriend(req.id)}
                                 className="flex-1 bg-slate-700 hover:bg-red-500 hover:text-white text-slate-300 text-xs font-bold py-1.5 rounded-lg transition-colors"
                               >
                                 Recusar
                               </button>
                             </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 py-1.5 px-2 pr-4 rounded-full shadow-inner">
            <img src={currentUser?.avatarUrl} className="w-7 h-7 rounded-full border border-slate-700 bg-slate-800 object-cover" alt="Avatar"/>
            <span className="text-sm font-bold truncate max-w-[100px] md:max-w-[150px]">{currentUser?.name}</span>
            <button onClick={logout} className="ml-2 text-slate-500 hover:text-red-400 transition-colors" title="Sair da conta">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
       </div>
    </div>
  );
}

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [showCookieBanner, setShowCookieBanner] = useState(() => !localStorage.getItem('cookiesAccepted'));
  const { currentUser, isLoaded } = useStore();

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-slate-950">
        <Target className="w-12 h-12 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    if (currentView === 'articles') {
       return <PublicLayout currentView={currentView} setCurrentView={setCurrentView}><ArticlesView /></PublicLayout>;
    }
    if (currentView === 'terms') {
       return <PublicLayout currentView={currentView} setCurrentView={setCurrentView}><TermsView /></PublicLayout>;
    }
    if (currentView === 'about') {
       return <PublicLayout currentView={currentView} setCurrentView={setCurrentView}><AboutView /></PublicLayout>;
    }
    return <PublicLayout currentView={currentView} setCurrentView={setCurrentView}><LoginView /></PublicLayout>;
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar (Desktop) */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col w-full relative pb-20 md:pb-0">
        <TopBar currentView={currentView} setCurrentView={setCurrentView} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full min-h-full">
           {currentView === 'home' && <HomeDashboard onAddClick={() => setCurrentView('add')} onNavigate={(v) => setCurrentView(v)} />}
           {currentView === 'collection' && <MyCollection />}
           {currentView === 'add' && <AddItemView onComplete={() => setCurrentView('collection')} />}
           {currentView === 'leaderboard' && <LeaderboardView />}
           {currentView === 'articles' && <ArticlesView />}
           {currentView === 'terms' && <TermsView />}
           {currentView === 'about' && <AboutView />}
           {currentView === 'communities' && <CommunitiesView />}
           {currentView === 'stickers' && <StickersView onNavigate={(v: any) => setCurrentView(v)} />}
        </div>
        
        {/* Footer para SEO e AdSense */}
        <footer className="w-full border-t border-slate-800 bg-slate-900/50 py-8 px-4 mt-8 pb-32 md:pb-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              <span className="font-bold text-slate-300">Bullseye Collectors © 2026</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-500">
              <button 
                onClick={() => setCurrentView('about')}
                className="hover:text-indigo-400 transition-colors flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                Sobre Nós & Contato
              </button>
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
      
      {showCookieBanner && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
            <p className="text-sm text-slate-300">
              Utilizamos cookies e tecnologias similares para exibir anúncios personalizados via Google AdSense e aprimorar a sua experiência. Ao continuar, você concorda com nossos <button onClick={() => setCurrentView('terms')} className="text-indigo-400 underline">Termos de Uso e Política de Privacidade</button>.
            </p>
            <button onClick={acceptCookies} className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-bold transition-colors">
              Aceitar e Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PublicLayout({ children, currentView, setCurrentView }: { children: React.ReactNode, currentView: string, setCurrentView: (v: ViewState) => void }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
          <Target className="w-6 h-6 text-indigo-500" />
          <span className="font-bold text-lg hidden sm:block">Bullseye Collectors</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('about')}
            className={`text-sm font-medium transition-colors ${currentView === 'about' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
          >
            Sobre
          </button>
          <button 
            onClick={() => setCurrentView('articles')}
            className={`text-sm font-medium transition-colors ${currentView === 'articles' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
          >
            Blog
          </button>
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
          >
            <LogIn className="w-4 h-4" /> Entrar / Jogar
          </button>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="w-full border-t border-slate-800 bg-slate-900/50 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            <span className="font-bold text-slate-300">Bullseye Collectors © 2026</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-500">
            <button onClick={() => setCurrentView('about')} className="hover:text-indigo-400 transition-colors">
              Fale Conosco
            </button>
            <button onClick={() => setCurrentView('terms')} className="hover:text-indigo-400 transition-colors">
              Política de Privacidade e Cookies
            </button>
          </div>
        </div>
      </footer>
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
