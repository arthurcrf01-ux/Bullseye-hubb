import React from 'react';
import { useStore } from '../store/StoreContext';
import { motion } from 'motion/react';
import { Trash2 } from 'lucide-react';

const rarityColors = {
  Comum: 'bg-emerald-500 text-slate-950',
  Incomum: 'bg-indigo-500 text-white',
  Raro: 'bg-blue-500 text-white',
  Épico: 'bg-purple-500 text-white',
  Lendário: 'bg-yellow-500 text-slate-950',
  // keep old keys in case database has old records
  Common: 'bg-emerald-500 text-slate-950',
  Uncommon: 'bg-indigo-500 text-white',
  Rare: 'bg-blue-500 text-white',
  Epic: 'bg-purple-500 text-white',
  Legendary: 'bg-yellow-500 text-slate-950',
};

export function MyCollection() {
  const { items, deleteItem } = useStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="pb-8 pt-4">
        <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-1">Acervo</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Sua Coleção.</h1>
      </header>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 mb-4 text-lg">Sua coleção está vazia.</p>
          <p className="text-slate-500 text-sm">Adicione um novo item para começar a ganhar pontos e subir no ranking!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={item.id}
              className="group relative bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="aspect-square bg-slate-800 relative overflow-hidden">
                <img 
                  src={item.photoBase64} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Rarity Badge */}
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${rarityColors[item.rarityCategory]}`}>
                  {item.rarityCategory}
                </div>

                {/* Score */}
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 rounded-sm text-xs font-mono text-indigo-400">
                  {item.rarityScore}/100
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-white mb-2 line-clamp-1">{item.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 mb-4 flex-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Valor</span>
                  <span className="text-xs font-mono text-indigo-400">{item.estimatedValue}</span>
                </div>
              </div>

              {/* Delete Button */}
              <button 
                onClick={() => deleteItem(item.id)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-full items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity flex shadow-xl hover:bg-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
