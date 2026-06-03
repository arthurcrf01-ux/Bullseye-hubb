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
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* BANNER DE LOJA PROFISSIONAL - EXATAMENTE COMO A REFERÊNCIA */}
      <header className="premium-store-banner md:flex-row items-center gap-10">
        
        {/* Alvo gigante no fundo (Igual à mulher na foto que você mandou) */}
        <div className="banner-logo-bg hidden md:block">🎯</div>

        {/* Lado Esquerdo: Boas vindas e Textos */}
        <div className="relative z-10 flex-1 text-left">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-black tracking-[0.3em] text-indigo-400 uppercase">Bullseye Showroom</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tighter">
            Bem-vindo,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{currentUser.name}</span>.
          </h1>
          
          <p className="text-slate-300 max-w-sm text-sm font-medium leading-relaxed opacity-80 mb-10">
            Gerencie, avalie e descubra o valor real da sua coleção de miniaturas e cartas raras na maior plataforma de colecionadores.
          </p>

          <button 
            onClick={onAddClick}
            className="w-full md:w-auto flex items-center justify-center gap-3 py-4 px-10 bg-indigo-600 rounded-2xl hover:bg-indigo-500 transition-all shadow-[0_20px_40px_rgba(79,70,229,0.3)] group active:scale-95"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span className="text-sm font-black text-white uppercase tracking-widest">Analisar Novo Item</span>
          </button>
        </div>

        {/* Lado Direito: O Produto em Destaque (Showroom sobre o azul) */}
        <div className="showroom-container shrink-0">
          <img 
            src={headerArt} 
            alt="Showroom" 
            className="img-porsche-premium pointer-events-none"
          />
        </div>
      </header>

      {/* BANNER DA COPA (Tema de futebol/campo preservado) */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-800 rounded-[2.5rem] p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(16,185,129,0.25)] border border-emerald-500/50 flex flex-col justify-center min-h-[180px] cursor-pointer"
        onClick={() => onNavigate('stickers')}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-1/2 border-r-2 border-white/30 h-full relative">
             <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 border-2 border-white/30 rounded-full"></div>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <Album className="text-white w-8 h-8" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black text-white mb-1 uppercase tracking-tight flex items-center justify-center md:justify-start gap-2">
                ÁLBUM COPA 2026 <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
              </h3>
              <p className="text-emerald-50 text-base font-medium opacity-90">Troque figurinhas e complete sua coleção agora!</p>
            </div>
          </div>
          <button className="bg-white text-emerald-950 px-8 py-3 rounded-xl font-black uppercase tracking-wide hover:bg-emerald-50 shadow-lg transition-all">Ver Comunidade</button>
        </div>
      </motion.div>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800 shadow-xl">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Pontuação</h3>
          <div className="text-5xl font-black text-indigo-400">{currentUser.points}</div>
        </div>
        <div className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800 shadow-xl">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Total de Itens</h3>
          <div className="text-5xl font-black text-white">{items.length}</div>
        </div>
        <div className="p-6 rounded-[2rem] bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 flex items-center gap-4 shadow-xl">
          <img src={topMonthly.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-indigo-400" />
          <div>
            <div className="text-[10px] font-bold uppercase text-indigo-400 tracking-widest">Top Collector</div>
            <div className="text-xl font-black text-white">{topMonthly.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
