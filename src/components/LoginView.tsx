import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Target, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function LoginView() {
  const [name, setName] = useState('');
  const { login } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-950 p-4 font-sans text-slate-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Target className="w-32 h-32" />
        </div>
        
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase italic text-white leading-none">Bullseye</h1>
            <p className="text-xs text-indigo-400 font-medium">Collector's Hub</p>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Qual seu nome?</h2>
          <p className="text-sm text-slate-400 mb-6">Identifique-se para iniciar sua coleção e ranqueamento.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome ou apelido..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                autoFocus
              />
            </div>
            <button 
              type="submit"
              disabled={!name.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Entrar
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
