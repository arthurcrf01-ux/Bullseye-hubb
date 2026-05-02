import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Users, Plus, MessageSquare, Send, ArrowLeft, Shield, User, Clock, Check, Trash2, Globe, Trophy, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Community } from '../types';
import { DirectMessageModal } from './DirectMessageModal';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function CommunitiesView() {
  const { communities, createCommunity, sendMessage, deleteCommunityMessage, currentUser } = useStore();
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const [message, setMessage] = useState('');
  
  const [activeTab, setActiveTab] = useState<'communities' | 'friends'>('communities');
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const { friendships } = useStore();

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
      <div className="flex flex-col h-[calc(100vh-160px)] md:h-[calc(100vh-100px)] animate-in fade-in duration-300 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <header className="flex items-center gap-4 p-4 border-b border-white/10 bg-gradient-to-r from-emerald-900/40 to-blue-900/40 shrink-0 relative z-10 backdrop-blur-md">
          <button 
            onClick={() => setSelectedCommunity(null)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 uppercase tracking-tight">{selectedCommunity.name}</h1>
            <p className="text-xs text-slate-300 font-medium">{selectedCommunity.description}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            <Trophy className="w-5 h-5 text-emerald-400" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          {selectedCommunity.messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-slate-300 font-medium text-lg">O campo está vazio</h3>
              <p className="text-slate-500 text-sm mt-1">Dê o pontapé inicial na conversa em {selectedCommunity.name}.</p>
            </div>
          ) : (
            <AnimatePresence>
              {selectedCommunity.messages.map((msg) => {
                const isMine = msg.userId === currentUser?.id;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={msg.id} 
                    className={`flex gap-3 ${isMine ? 'flex-row-reverse' : ''} group`}
                  >
                    <img src={msg.userAvatar} alt="Avatar" className={`w-9 h-9 rounded-full border-2 ${isMine ? 'border-emerald-500/50' : 'border-slate-700'} shrink-0 object-cover`} />
                    <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[80%] md:max-w-[70%]`}>
                      <span className="text-[10px] text-slate-400 font-semibold mb-1 px-1 flex items-center gap-1 uppercase tracking-widest">
                        {msg.userName} 
                        {isMine && <Shield className="w-3 h-3 text-emerald-400" />}
                      </span>
                      <div className={`relative p-3.5 rounded-2xl text-sm md:text-base leading-relaxed break-words shadow-sm ${isMine ? 'bg-gradient-to-br from-emerald-600 to-green-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'}`}>
                        {msg.text}
                      </div>
                      
                      {isMine && (
                        <button
                          onClick={() => deleteCommunityMessage(selectedCommunity.id, msg.id)}
                          className="mt-1 opacity-0 group-hover:opacity-100 text-xs text-red-400/80 hover:text-red-400 flex items-center gap-1 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" /> apagar
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-800 shrink-0 relative z-10">
          <div className="flex gap-2 bg-slate-950 py-2 px-3 rounded-2xl border border-slate-800 focus-within:border-emerald-500/50 transition-colors">
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite algo para o grupo..."
              className="flex-1 bg-transparent px-2 py-2 text-sm md:text-base text-white focus:outline-none"
            />
            <button 
              type="submit"
              disabled={!message.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white w-12 h-12 rounded-xl transition-colors flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 mb-4 relative z-10">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-emerald-600/20 to-blue-600/20 border border-emerald-500/30 rounded-2xl mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Globe className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-tight uppercase">Comunidades</h1>
          <p className="text-slate-300 mt-2 font-medium">Junte-se a colecionadores, crie grupos de troca e feche negócio.</p>
        </div>
        
        <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1 shadow-inner h-12">
          <button
            onClick={() => setActiveTab('communities')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'communities' ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Grupos Abertos
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'friends' ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Seus Contatos
          </button>
        </div>

        {activeTab === 'communities' && (
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white h-12 px-6 rounded-2xl font-black uppercase tracking-wider transition-all shadow-md group whitespace-nowrap"
          >
            <Plus className="w-5 h-5 text-emerald-400 group-hover:rotate-90 transition-transform" />
            NOVO TIME
          </button>
        )}
      </header>

      {activeTab === 'communities' && isCreating && (
        <motion.div 
          initial={{ opacity: 0, height: 0, y: -20 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-emerald-500/30 rounded-3xl p-6 md:p-8 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Criar Novo Ponto de Troca</h3>
          </div>
          
          <div className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Nome do Grupo</label>
              <input 
                value={newName} onChange={e => setNewName(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:bg-slate-900 font-medium transition-all" 
                placeholder="Ex: Troca de Figurinhas - SP, Fãs de Super Treasure Hunts..."
                maxLength={40}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Regras ou Descrição</label>
              <input 
                value={newDesc} onChange={e => setNewDesc(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:bg-slate-900 font-medium transition-all" 
                placeholder="Ex: Apenas figurinhas da Copa 2026. Respeito em primeiro lugar."
                maxLength={100}
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button onClick={() => setIsCreating(false)} className="px-6 py-3 text-slate-400 hover:text-white font-bold text-sm uppercase tracking-wider">Cancelar</button>
              <button 
                onClick={handleCreate}
                disabled={!newName.trim() || !newDesc.trim()}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-xl text-sm transition-all shadow-lg"
               >
                Fundar Grupo
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'communities' ? (
        communities.length === 0 && !isCreating ? (
           <div className="text-center py-20 bg-slate-900/50 border-2 border-slate-800 border-dashed rounded-3xl">
             <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-6" />
             <h3 className="text-2xl font-bold text-white mb-2">Nenhum Ponto de Troca Registrado</h3>
             <p className="text-slate-400 max-w-sm mx-auto">Vá em frente, traga sua galera e crie o primeiro grupo focado na região de vocês.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map(community => (
              <motion.div 
                key={community.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedCommunity(community)}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group flex flex-col h-48 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Globe className="w-32 h-32 text-white" />
                </div>
                <div className="flex items-start justify-between mb-4 relative z-10">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                     <Users className="w-6 h-6 text-emerald-400" />
                   </div>
                   <span className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 text-[10px] uppercase font-black text-slate-400 group-hover:text-emerald-400 transition-colors">
                     <MessageSquare className="w-3.5 h-3.5" />
                     {community.messages.length} msg
                   </span>
                </div>
                <h3 className="text-xl font-black text-white mb-2 relative z-10 leading-tight">{community.name}</h3>
                <p className="text-sm text-slate-400 relative z-10 line-clamp-2 leading-relaxed">{community.description}</p>
                
              </motion.div>
            ))}
          </div>
        )
      ) : (
        <FriendsList 
          friendships={friendships} 
          currentUser={currentUser} 
          onChat={(id) => setActiveChat(id)} 
        />
      )}

      {activeChat && (
        <DirectMessageModal 
          friendshipId={activeChat} 
          onClose={() => setActiveChat(null)} 
        />
      )}
    </div>
  );
}

function FriendsList({ friendships, currentUser, onChat }: any) {
  const { acceptFriendRequest } = useStore();
  const [friendUsers, setFriendUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function loadFriends() {
      if (!currentUser) return;
      const loaded: any[] = [];
      for (const f of friendships) {
        const friendId = f.participants.find((id: string) => id !== currentUser.id);
        if (friendId) {
          try {
            const snap = await getDoc(doc(db, 'users', friendId));
            if (snap.exists()) {
              loaded.push({ ...snap.data(), friendship: f });
            }
          } catch(e) {}
        }
      }
      setFriendUsers(loaded);
    }
    loadFriends();
  }, [friendships, currentUser]);

  if (friendships.length === 0) {
    return (
       <div className="text-center py-20 bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl">
         <User className="w-12 h-12 text-slate-600 mx-auto mb-4" />
         <h3 className="text-lg font-medium text-slate-300">Nenhum amigo ainda</h3>
         <p className="text-slate-500 mt-2">Navegue no Ranking para adicionar novos amigos.</p>
       </div>
    );
  }

  return (
    <div className="space-y-4">
      {friendUsers.map((user) => {
        const { friendship } = user;
        const isPending = friendship.status === 'pending';
        const isRequestFromMe = friendship.requesterId === currentUser?.id;

        return (
          <motion.div 
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center justify-between p-4 rounded-xl border ${isPending ? 'bg-slate-900/40 border-slate-800 border-dashed' : 'bg-slate-900 border-slate-800'}`}
          >
            <div className="flex items-center gap-4">
              <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800" />
              <div>
                <h3 className="text-white font-bold">{user.name}</h3>
                <p className="text-indigo-400 text-xs font-mono">{user.points} pts</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isPending ? (
                isRequestFromMe ? (
                  <span className="text-slate-500 text-sm flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4" /> Aguardando
                  </span>
                ) : (
                  <button 
                    onClick={() => acceptFriendRequest(friendship.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-full font-bold transition-colors flex items-center gap-2"
                  >
                     <Check className="w-4 h-4" /> Aceitar
                  </button>
                )
              ) : (
                <button 
                  onClick={() => onChat(friendship.id)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-full font-bold transition-colors flex items-center gap-2"
                >
                   <MessageSquare className="w-4 h-4" /> Chat
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
