import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Users, Plus, MessageSquare, Send, ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { Community } from '../types';

export function CommunitiesView() {
  const { communities, createCommunity, sendMessage, currentUser } = useStore();
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    if (newName.trim() && newDesc.trim()) {
      await createCommunity(newName, newDesc);
      setIsCreating(false);
      setNewName('');
      setNewDesc('');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedCommunity) {
      await sendMessage(selectedCommunity.id, message);
      setMessage('');
      
      // Update local view instance to avoid waiting for re-render if needed, 
      // though context update should trigger re-render containing the new list.
      const updatedCommunity = communities.find(c => c.id === selectedCommunity.id);
      if (updatedCommunity) {
        setSelectedCommunity(updatedCommunity);
      }
    }
  };

  // Keep selectedCommunity in sync with context updates
  React.useEffect(() => {
    if (selectedCommunity) {
      const updated = communities.find(c => c.id === selectedCommunity.id);
      if (updated) {
        setSelectedCommunity(updated);
      }
    }
  }, [communities]);

  if (selectedCommunity) {
    return (
      <div className="flex flex-col h-[calc(100vh-160px)] md:h-[calc(100vh-100px)] animate-in fade-in duration-300">
        <header className="flex items-center gap-4 py-4 border-b border-slate-800 mb-4 shrink-0">
          <button 
            onClick={() => setSelectedCommunity(null)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{selectedCommunity.name}</h1>
            <p className="text-xs text-slate-400">{selectedCommunity.description}</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4">
          {selectedCommunity.messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-slate-400 font-medium">Nenhuma mensagem ainda</h3>
              <p className="text-slate-500 text-sm mt-1">Seja o primeiro a puxar assunto em {selectedCommunity.name}.</p>
            </div>
          ) : (
            selectedCommunity.messages.map((msg) => {
              const isMine = msg.userId === currentUser?.id;
              return (
                <div key={msg.id} className={`flex gap-3 ${isMine ? 'flex-row-reverse' : ''}`}>
                  <img src={msg.userAvatar} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-700 shrink-0" />
                  <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[80%]`}>
                    <span className="text-[10px] text-slate-500 font-medium mb-1 px-1 flex items-center gap-1">
                      {msg.userName} 
                      {/* Random flair para engajar */}
                      {msg.userName === currentUser?.name && <Shield className="w-3 h-3 text-indigo-400" />}
                    </span>
                    <div className={`p-3 rounded-2xl text-sm ${isMine ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 rounded-tl-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2 shrink-0 mt-auto">
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite algo para a comunidade..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button 
            type="submit"
            disabled={!message.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white p-3 rounded-xl transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600/10 border border-indigo-600/30 rounded-xl mb-4">
            <Users className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Comunidades</h1>
          <p className="text-slate-400 mt-2">Encontre nichos, compartilhe descobertas e converse.</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          CRIAR GRUPO
        </button>
      </header>

      {isCreating && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Nova Comunidade</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nome do Grupo</label>
              <input 
                value={newName} onChange={e => setNewName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" 
                placeholder="Ex: Coleciodores de T-Hunts"
                maxLength={30}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Descrição Curta</label>
              <input 
                value={newDesc} onChange={e => setNewDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" 
                placeholder="Ex: Focado em miniaturas 1/64 raras."
                maxLength={80}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setIsCreating(false)} className="px-4 py-2 text-slate-400 hover:text-white font-medium text-sm">Cancelar</button>
              <button 
                onClick={handleCreate}
                disabled={!newName.trim() || !newDesc.trim()}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-lg text-sm transition-colors"
               >
                CRIAR AGORA
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {communities.length === 0 && !isCreating ? (
         <div className="text-center py-20 bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl">
           <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
           <h3 className="text-lg font-medium text-slate-300">Nenhuma comunidade ainda</h3>
           <p className="text-slate-500 mt-2">Crie o primeiro grupo e convide colecionadores.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map(community => (
            <motion.div 
              key={community.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedCommunity(community)}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 cursor-pointer transition-colors group flex flex-col h-40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Users className="w-24 h-24" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10 group-hover:text-indigo-400 transition-colors">{community.name}</h3>
              <p className="text-sm text-slate-400 relative z-10 line-clamp-2">{community.description}</p>
              
              <div className="mt-auto relative z-10 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600 group-hover:text-slate-400 transition-colors">
                  {community.messages.length} Mensagens
                </span>
                <MessageSquare className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
