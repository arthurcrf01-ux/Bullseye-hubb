import React from 'react';
import { useStore } from '../store/StoreContext';
import { ArrowRight, Zap, Star, Target, Album } from 'lucide-react';
import { motion } from 'motion/react';
import headerArt from '../assets/images/vector_miniature_bullseye_card_1780160299601.png';

export function HomeDashboard({ onAddClick, onNavigate }: { onAddClick: () => void; onNavigate: (view: string) => void }) {
  const { currentUser, items, leaderboard } = useStore();
  if (!currentUser) return null;
  const topMonthly = leaderboard[0] || currentUser;

  return (
    <div className="space-y-8 p-4">
      <header className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10 pt-6 border-b border-slate-800">
        <div className="text-left flex-1">
          <h1 className="text-4xl font-black text-white mb-2">Bem-vindo, {currentUser.name}.</h1>
          <p className="text-slate-400 mb-6">Gerencie sua coleção de miniaturas e cartas.</p>
          <button onClick={onAddClick} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs">Analisar Novo Item</button>
        </div>
        <img src={headerArt} className="w-40 h-auto" alt="Banner" />
      </header>

      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-3xl p-8 cursor-pointer" onClick={() => onNavigate('stickers')}>
        <h3 className="text-2xl font-black text-white uppercase">ÁLBUM COPA 26</h3>
        <p className="text-white opacity-90">Troque figurinhas e complete sua coleção!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-white">
          <h3 className="text-xs font-bold text-slate-500 uppercase">Pontuação</h3>
          <div className="text-5xl font-black text-indigo-400">{currentUser.points}</div>
        </div>
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-white">
          <h3 className="text-xs font-bold text-slate-500 uppercase">Itens</h3>
          <div className="text-5xl font-black text-white">{items.length}</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 flex items-center gap-4 text-white">
          <img src={topMonthly.avatarUrl} className="w-12 h-12 rounded-full border-2 border-indigo-400" />
          <div className="text-xl font-bold">{topMonthly.name}</div>
        </div>
      </div>
    </div>
  );
}
