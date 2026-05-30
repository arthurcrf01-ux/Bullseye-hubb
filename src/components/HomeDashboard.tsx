import React from 'react';
import { useStore } from '../store/StoreContext';
import { Trophy, ArrowRight, Zap, Star, Target, Album } from 'lucide-react';
import { motion } from 'motion/react';
import headerArt from '../assets/images/vector_miniature_bullseye_card_1780160299601.png';

export function HomeDashboard({ onAddClick, onNavigate }: { onAddClick: () => void; onNavigate: (view: string) => void }) {
  const { currentUser, items, leaderboard } = useStore();
  
  if (!currentUser) return null;

  // Calculate top user
  const topMonthly = leaderboard[0] || currentUser;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header className="relative flex flex-col md:flex-row justify-between items-start gap-8 pb-10 pt-6 border-b border-slate-800/50">
        
        {/* Subtle Decorative Art in the background/right for Desktop */}
        <div className="absolute right-0 top-0 bottom-0 md:w-1/2 opacity-30 pointer-events-none hidden md:flex items-center justify-end z-0" style={{ maskImage: 'linear-gradient(to left, black, transparent)', WebkitMaskImage: 'linear-gradient(to left, black, transparent)' }}>
          <img 
            src={headerArt} 
            alt="Ilustração Colecionáveis" 
            className="h-full max-h-[160px] w-auto object-contain mix-blend-screen opacity-90 transition-opacity duration-1000"
          />
        </div>

        <div className="relative z-10 text-left flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center flex-shrink-0 animate-pulse-slow border border-indigo-500/30">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">Bullseye</h2>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-2">
            Bem-vindo,<br/>
            <span className="text-indigo-400">{currentUser.name}</span>.
          </h1>
          <p className="text-slate-400 max-w-md mt-4 text-sm leading-relaxed font-medium">
            Gerencie sua coleção de miniaturas, cartas, figurinhas e moedas. Descubra o valor do seu acervo com nossa análise especializada.
          </p>
        </div>

        <div className="relative z-10 shrink-0 w-full md:w-auto flex flex-col items-start md:items-end self-end">
           {/* Mobile Art */}
           <div className="md:hidden w-full flex justify-end -mt-20 mb-6 opacity-30 pointer-events-none mix-blend-screen overflow-hidden">
             <img src={headerArt} alt="Ilustração Colecionáveis" className="h-28 w-auto object-contain translate-x-4" />
           </div>

          <button 
            onClick={onAddClick}
            className="w-full md:w-auto group flex items-center justify-center py-4 px-8 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all cursor-pointer shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] active:scale-95"
          >
            <div className="text-white flex items-center justify-center gap-2 group-hover:scale-105 transition-all">
              <Zap className="w-5 h-5 fill-white" />
              <span className="text-[13px] font-black text-white tracking-widest uppercase">Analisar Novo Item</span>
            </div>
          </button>
        </div>
      </header>

      {/* World Cup Promotional Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-800 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.3)] cursor-pointer hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:scale-[1.02] transition-all group border border-emerald-500/50 flex flex-col justify-center min-h-[160px]"
        onClick={() => onNavigate('stickers')}
      >
        {/* Field Lines overlay */}
        <div className="absolute inset-0 opacity-20 flex pointer-events-none">
          <div className="w-1/2 border-r-2 border-white/50 h-full relative">
             <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 border-2 border-white/50 rounded-full"></div>
             <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[6px] w-[2px] h-[2px] bg-white rounded-full"></div>
             <div className="absolute top-1/4 right-0 w-16 h-1/2 border-2 border-white/50 border-r-0 translate-x-px"></div>
          </div>
        </div>
        
        {/* Abstract floating stickers / shapes */}
        <div className="absolute -right-4 top-1 opacity-40 transform rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-all duration-700 hidden sm:flex">
          <div className="w-20 h-28 bg-yellow-400 rounded-md border-4 border-white flex flex-col items-center justify-center shadow-2xl">
            <div className="w-10 h-10 rounded-full border-2 border-white/50 mb-2"></div>
            <div className="w-12 h-2 bg-white/50 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute right-24 -bottom-8 opacity-30 transform -rotate-12 group-hover:-rotate-45 transition-all duration-700 hidden sm:flex">
           <div className="w-20 h-28 bg-blue-500 rounded-md border-4 border-white flex flex-col items-center justify-center shadow-2xl">
            <div className="w-10 h-10 rounded-full border-2 border-white/50 mb-2"></div>
            <div className="w-12 h-2 bg-white/50 rounded-sm"></div>
           </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:rotate-180 transition-transform duration-1000 w-6 h-6 sm:w-8 sm:h-8">
                <circle cx="12" cy="12" r="10"/><path d="M12 12l3.5 2"/><path d="M12 12l-3.5 2"/><path d="M12 12v-4"/><path d="M8.5 14L5 12"/><path d="M15.5 14l3.5-2"/><path d="M12 8L9.5 5"/><path d="M12 8l2.5-3"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight flex items-center gap-2">
                Copa 2026 <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
              </h3>
              <p className="text-emerald-50 text-sm sm:text-base font-medium opacity-90 max-w-xl text-shadow-sm">
                Complete seu álbum! Dicas, curiosidades e point de troca das figurinhas limitadas!
              </p>
            </div>
          </div>
          <button className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-950 px-6 py-3 rounded-xl font-black uppercase tracking-wide hover:from-yellow-300 hover:to-yellow-400 transition-colors shadow-xl">
            Ver Especial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Your Score */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Star className="w-32 h-32" />
          </div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Sua Pontuação</h3>
          <div className="text-5xl font-black text-indigo-400 mb-2">{currentUser.points}</div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">+10 pts por item</p>
        </motion.div>

        {/* Collection Size */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl bg-slate-900 border border-slate-800"
        >
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Total de Itens</h3>
          <div className="text-5xl font-black text-white mb-2">{items.length}</div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Na sua coleção virtual</p>
        </motion.div>

        {/* Top Monthly */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 h-44 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 flex flex-col justify-between relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-1"
        >
          <div className="z-10">
            <span className="px-3 py-1 bg-indigo-500 text-[10px] font-bold uppercase rounded-full mb-3 inline-block tracking-widest text-slate-100">Collector of the Month</span>
            <div className="flex items-center gap-3">
              <img src={topMonthly.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border border-indigo-400" />
              <div>
                <h1 className="text-xl font-bold truncate max-w-[150px]">{topMonthly.name}</h1>
                <div className="text-sm font-medium text-indigo-400">{topMonthly.points} PTS</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </motion.div>
      </div>

      {/* Itens Recentes */}
      <div className="pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Album className="w-5 h-5 text-indigo-400" />
              Últimos Itens Analisados
          </h3>
          <button onClick={() => onNavigate('collection')} className="text-sm text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest transition-colors">
            Ver Acervo {'>'}
          </button>
        </div>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.slice(0, 3).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex cursor-pointer hover:border-indigo-500/50 transition-colors"
                  onClick={() => onNavigate('collection')}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-800 shrink-0 relative overflow-hidden">
                    <img src={item.photoBase64} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400 mb-1">{item.rarityCategory}</span>
                      <h4 className="font-bold text-slate-100 text-sm line-clamp-2 leading-tight">{item.name}</h4>
                      <span className="text-xs text-slate-500 font-medium mt-1">+{item.rarityScore} pts</span>
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          <div className="p-8 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-900/30">
            <Zap className="w-8 h-8 text-slate-600 mb-3" />
            <h4 className="text-slate-300 font-bold mb-1">Nenhum item analisado ainda</h4>
            <p className="text-sm text-slate-500 mb-4 max-w-sm">Adicione seu primeiro item para descobrir seu valor e raridade.</p>
            <button 
                onClick={onAddClick}
                className="px-5 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 rounded-full font-bold uppercase tracking-widest text-xs transition-colors"
            >
                CADASTRAR ITEM
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
