import React from 'react';
import { Target, LayoutGrid, PlusCircle, Trophy, Home, BookOpen, Users, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { ViewState } from '../App';
import { motion } from 'motion/react';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'collection', icon: LayoutGrid, label: 'Minha Coleção' },
    { id: 'add', icon: PlusCircle, label: 'Analisar Item' },
    { id: 'leaderboard', icon: Trophy, label: 'Ranking' },
    { id: 'communities', icon: Users, label: 'Comunidades' },
    { id: 'articles', icon: BookOpen, label: 'Curiosidades & Blog' },
    { id: 'stickers', icon: Star, label: 'Copa 2026' },
  ] as const;

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-md flex flex-col pt-8 pb-4 sticky top-0 h-screen hidden md:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 mb-12">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 animate-pulse-slow">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <h1 className="text-xl font-bold tracking-tighter uppercase italic text-white">Bullseye</h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden",
                isActive 
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/50"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-transparent border-l-2 border-indigo-500"
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="font-medium text-sm relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile Hint */}
      <div className="px-6 mt-auto">
        <p className="text-xs text-slate-500 font-medium">BULLSEYE SYSTEM V1.0</p>
      </div>
    </aside>
  );
}
