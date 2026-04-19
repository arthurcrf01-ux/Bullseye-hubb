import React from 'react';
import { useStore } from '../store/StoreContext';
import { Trophy, Medal, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function LeaderboardView() {
  const { leaderboard, currentUser } = useStore();
  
  if (!currentUser) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="pb-8 pt-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mb-6 px-4">
          <Trophy className="text-indigo-400 w-8 h-8" />
        </div>
        <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-2">Hall da Fama</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Global Rankings</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Top Collectors</h3>
        {leaderboard.map((user, index) => {
          const isMe = user.id === currentUser.id;
          
          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={user.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isMe 
                  ? 'bg-indigo-900/20 border border-indigo-500/50' 
                  : 'hover:bg-slate-800/50'
              }`}
            >
              {/* Position */}
              <span className={`w-6 text-xs font-bold text-center ${index === 0 ? 'text-indigo-400' : 'text-slate-500'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Avatar & Name */}
              <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full bg-slate-800" referrerPolicy="no-referrer" />
              <span className="flex-1 text-sm font-medium text-white flex items-center gap-2">
                {user.name}
                {isMe && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-600 text-white tracking-wider">You</span>}
              </span>

              {/* Score */}
              <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                {user.points}
              </span>
            </motion.div>
          );
        })}
        {/* Progress rank indicator */}
        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Sua Posição</p>
              {(() => {
                const myRank = leaderboard.findIndex(u => u.id === currentUser.id) + 1;
                const totalUsers = leaderboard.length;
                const topPercent = totalUsers > 1 ? Math.floor((myRank / totalUsers) * 100) : 100;
                
                return (
                  <p className="text-sm font-bold font-mono text-white">
                    #{myRank} {totalUsers > 1 ? `(Top ${topPercent}%)` : '(Único Participante)'}
                  </p>
                );
              })()}
            </div>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-1000" 
                style={{ 
                  width: leaderboard.length > 1 
                    ? `${100 - Math.floor(((leaderboard.findIndex(u => u.id === currentUser.id) + 1) / leaderboard.length) * 100)}%` 
                    : '100%' 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
