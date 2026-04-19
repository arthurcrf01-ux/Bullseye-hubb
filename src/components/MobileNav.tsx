import React from 'react';
import { Home, LayoutGrid, PlusCircle, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';
import { ViewState } from '../App';

interface MobileNavProps {
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
}

export function MobileNav({ currentView, setCurrentView }: MobileNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'collection', icon: LayoutGrid, label: 'Acervo' },
    { id: 'add', icon: PlusCircle, label: 'Novo Item' },
    { id: 'leaderboard', icon: Trophy, label: 'Ranking' },
  ] as const;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 z-50 px-2 pb-safe">
      <nav className="flex justify-around items-center pt-2 pb-4">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl transition-all",
                isActive ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-full mb-1 transition-all",
                isActive && item.id === 'add' ? "bg-indigo-600 text-white" : ""
              )}>
                <Icon className={cn("w-6 h-6", isActive && item.id === 'add' && "w-6 h-6")} />
              </div>
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
