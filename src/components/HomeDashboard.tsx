import React from 'react';
import { useStore } from '../store/StoreContext';
import { Trophy, ArrowRight, Zap, Star, Target, Album } from 'lucide-react';
import { motion } from 'motion/react';
import headerArt from '../assets/images/vector_miniature_bullseye_card_1780160299601.png';

export function HomeDashboard({ onAddClick, onNavigate }: { onAddClick: () => void; onNavigate: (view: string) => void }) {
  const { currentUser, items, leaderboard } = useStore();
  
  if (!currentUser) return null;

  const topMonthly = leaderboard[0] || currentUser;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] text-white p-4">
      <header className="relative flex flex-col md:flex-row justify-between items-center gap-8 pb-10 pt-6 border-b border-slate-800/50">
        <div className="relative z-10 text-left flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">Bullseye Hub</h2>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-2">
            Bem-vindo,<br/><span className="text-indigo-400">{currentUser.name}</span>.
          </h1>
          <p className="text-slate-400 max-w-md mt-4 text-sm leading-relaxed font-medium">
            Gerencie sua coleção de miniaturas, cartas e figurinhas. Descubra o valor do seu acervo com nossa análise especializada.
          </p>
          <div className="mt-8">
            <button onClick={onAddClick} className="w-full md:w-auto flex items-center justify-center py-4 px-8 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
              <div className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 fill-white" />
                <span className="text-[13px] font-black uppercase tracking-widest">Analisar Novo Item</span>
              </div>
            </button>
          </div>
        </div>
        <div className="relative flex items-end justify-center shrink-0">
          <img src={headerArt} alt="Showroom" className="img-porsche-premium" />
        </div>
      </header>

      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.3)] border border-emerald-500/50 flex flex-col justify-center min-h-[160px] cursor-pointer"
        onClick={() => onNavigate('stickers')}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
               <Album className="text-white w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tight flex items-center gap-2">ÁLBUM COPA 26 <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" /></h3>
              <p className="text-emerald-50 text-sm font-medium opacity-90">Troque figurinhas e complete sua coleção!</p>
            </div>
          </div>
          <button className="bg-white text-emerald-950 px-6 py-3 rounded-xl font-black uppercase tracking-wide">Ver Comunidade</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Sua Pontuação</h3>
          <div className="text-5xl font-black text-indigo-400">{currentUser.points}</div>
        </div>
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Total de Itens</h3>
          <div className="text-5xl font-black text-white">{items.length}</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 flex items-center gap-4">
          <img src={topMonthly.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-indigo-400" />
          <div className="text-xl font-black text-white">{topMonthly.name}</div>
        </div>
      </div>
    </div>
  );
}
