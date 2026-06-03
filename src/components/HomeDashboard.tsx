import React from 'react';
import { useStore } from '../store/StoreContext';
import { Trophy, ArrowRight, Zap, Star, Target, Album } from 'lucide-react';
import { motion } from 'motion/react';
import headerArt from '../assets/images/vector_miniature_bullseye_card_1780160299601.png';

export function HomeDashboard({ onAddClick, onNavigate }: { onAddClick: () => void; onNavigate: (view: string) => void }) {
  const { currentUser, items, leaderboard } = useStore();
  
  if (!currentUser) return null;

  // Usuário do mês (ou o atual se não houver ranking)
  const topMonthly = leaderboard[0] || currentUser;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER PREMIUM - O "SHOWROOM" DO BULLSEYE */}
      <header className="relative flex flex-col md:flex-row justify-between items-center gap-12 pb-12 pt-8 border-b border-slate-800/60">
        
        {/* Lado Esquerdo: Textos e Botão */}
        <div className="relative z-10 text-left flex-1 order-2 md:order-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center flex-shrink-0 animate-pulse-slow border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xs font-black tracking-[0.3em] text-slate-500 uppercase">Bullseye Collector Hub</h2>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-4">
            Bem-vindo,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{currentUser.name}</span>.
          </h1>
          
          <p className="text-slate-400 max-w-md mt-6 text-base leading-relaxed font-medium opacity-80">
            Gerencie sua coleção de miniaturas, cartas e figurinhas com inteligência. Descubra a raridade e o valor real do seu acervo.
          </p>

          <div className="mt-10">
            <button 
              onClick={onAddClick}
              className="w-full md:w-auto group flex items-center justify-center py-5 px-10 bg-indigo-600 rounded-2xl hover:bg-indigo-500 transition-all cursor-pointer shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_50px_rgba(79,70,229,0.5)] active:scale-95"
            >
              <div className="text-white flex items-center justify-center gap-3 group-hover:scale-105 transition-all">
                <Zap className="w-6 h-6 fill-white" />
                <span className="text-sm font-black text-white tracking-widest uppercase">Analisar Novo Item</span>
              </div>
            </button>
          </div>
        </div>

        {/* Lado Direito: A Arte Premium (Porsche + Card) */}
        <div className="dashboard-visual-container order-1 md:order-2 w-full md:w-auto flex justify-center py-10 md:py-0">
          <img 
            src={headerArt} 
            alt="Ilustração Premium" 
            className="img-porsche-premium pointer-events-none"
          />
        </div>
      </header>

      {/* BANNER PROMOCIONAL: COPA 2026 */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-[0_30px_60px_rgba(16,185,129,0.25)] cursor-pointer group border border-emerald-400/30"
        onClick={() => onNavigate('stickers')}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-1/2 border-r border-white/40 h-full relative">
             <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 border border-white/40 rounded-full"></div>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shrink-0 border border-white/40 shadow-2xl">
              <Album className="text-white w-10 h-10" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tighter flex items-center justify-center md:justify-start gap-3">
                ÁLBUM COPA 26 <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-bounce" />
              </h3>
              <p className="text-emerald-50 text-lg font-semibold opacity-90">
                Point de trocas oficial! Encontre figurinhas raras e complete seu álbum.
              </p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl group-hover:translate-x-2">
            Ver Comunidade
          </button>
        </div>
      </motion.div>

      {/* GRID DE ESTATÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-10 rounded-[2rem] bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-indigo-500/50 transition-all group">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4 group-hover:text-indigo-400 transition-colors">Sua Pontuação</h3>
          <div className="text-6xl font-black text-indigo-400 tracking-tighter">{currentUser.points}</div>
          <p className="text-[10px] text-slate-600 font-bold uppercase mt-2 tracking-widest">+10 PTS POR ITEM ADICIONADO</p>
        </div>

        <div className="p-10 rounded-[2rem] bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-white/30 transition-all">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Total de Itens</h3>
          <div className="text-6xl font-black text-white tracking-tighter">{items.length}</div>
          <p className="text-[10px] text-slate-600 font-bold uppercase mt-2 tracking-widest">NA SUA COLEÇÃO VIRTUAL</p>
        </div>

        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-600/20 to-slate-900 border border-indigo-500/30 flex flex-col justify-between relative overflow-hidden group">
          <div className="z-10">
            <span className="px-4 py-1.5 bg-indigo-500 text-[10px] font-black uppercase rounded-full mb-4 inline-block tracking-[0.15em] text-white">Top Collector</span>
            <div className="flex items-center gap-4">
              <img src={topMonthly.avatarUrl} alt="Avatar" className="w-14 h-14 rounded-full border-2 border-indigo-400 shadow-lg" />
              <div>
                <h1 className="text-2xl font-black text-white truncate max-w-[150px]">{topMonthly.name}</h1>
                <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest">{topMonthly.points} PTS</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
        </div>
      </div>

      {/* SEÇÃO DE ITENS RECENTES */}
      <div className="pt-6 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
              <Album className="w-6 h-6 text-indigo-500" />
              Últimos Itens Analisados
          </h3>
          <button onClick={() => onNavigate('collection')} className="text-sm text-indigo-400 hover:text-indigo-300 font-black uppercase tracking-widest transition-colors flex items-center gap-2">
            Ver Tudo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.slice(0, 3).map((item, i) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -8 }}
                  className="group relative bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden flex cursor-pointer hover:border-indigo-500/50 transition-all shadow-xl"
                  onClick={() => onNavigate('collection')}
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 bg-slate-800 shrink-0 relative overflow-hidden">
                    <img src={item.photoBase64} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-indigo-400 mb-1">{item.rarityCategory}</span>
                      <h4 className="font-bold text-white text-base line-clamp-2 leading-tight mb-1">{item.name}</h4>
                      <span className="text-xs text-slate-500 font-bold">VALORIZADO EM +{item.rarityScore} PTS</span>
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          <div className="p-16 border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center bg-slate-900/20 backdrop-blur-sm">
            <Zap className="w-12 h-12 text-slate-700 mb-6" />
            <h4 className="text-slate-400 text-xl font-bold mb-2">Nenhum item analisado ainda</h4>
            <p className="text-slate-600 mb-8 max-w-sm font-medium">Comece sua jornada analisando sua primeira miniatura ou carta rara agora!</p>
            <button onClick={onAddClick} className="px-8 py-3 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all border border-indigo-500/30">
              CADASTRAR MEU PRIMEIRO ITEM
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
