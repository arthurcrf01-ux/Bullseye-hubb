import React, { useEffect, useState } from 'react';
import { User, CollectorItem } from '../types';
import { useStore } from '../store/StoreContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { X, UserPlus, Check, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function UserProfileModal({ user, onClose, onMessage }: { user: User, onClose: () => void, onMessage?: (friendshipId: string) => void }) {
  const { currentUser, friendships, sendFriendRequest, acceptFriendRequest } = useStore();
  const [items, setItems] = useState<CollectorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const q = query(collection(db, 'users', user.id, 'items'), where('userId', '==', user.id));
      const snap = await getDocs(q);
      const fetched = snap.docs.map(d => d.data() as CollectorItem);
      setItems(fetched.sort((a,b) => b.createdAt - a.createdAt));
      setLoading(false);
    }
    fetchItems();
  }, [user.id]);

  const friendshipId = currentUser ? [currentUser.id, user.id].sort().join('_') : null;
  const friendship = friendships.find(f => f.id === friendshipId);

  const isMe = currentUser?.id === user.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20" />
          <div className="relative flex items-center gap-4 z-10">
            <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full border-2 border-indigo-500/50" />
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-indigo-400 font-mono text-sm">{user.points} Pontos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 z-10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {!isMe && currentUser && (
            <div className="mb-6 flex justify-center">
              {!friendship ? (
                <button 
                  onClick={() => sendFriendRequest(user.id)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-colors"
                >
                  <UserPlus className="w-4 h-4" /> Adicionar Amigo
                </button>
              ) : friendship.status === 'pending' ? (
                friendship.requesterId === currentUser.id ? (
                  <span className="bg-slate-800 text-slate-400 px-6 py-2 rounded-full font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Solicitação Enviada
                  </span>
                ) : (
                  <button 
                    onClick={() => acceptFriendRequest(friendship.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-colors"
                  >
                    <Check className="w-4 h-4" /> Aceitar Solicitação
                  </button>
                )
              ) : (
                <button 
                  onClick={() => onMessage && onMessage(friendship.id)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Enviar Mensagem
                </button>
              )}
            </div>
          )}

          <h3 className="text-lg font-semibold text-white mb-4">Coleção ({items.length})</h3>
          
          {loading ? (
            <p className="text-slate-500 text-center py-8">Carregando...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500 text-center py-8 text-sm">Este usuário ainda não tem itens.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {items.map(item => (
                <div key={item.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50">
                  <div className="aspect-square bg-black">
                    <img src={item.photoBase64} alt={item.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-2">
                    <h4 className="text-white text-xs font-medium truncate">{item.name}</h4>
                    <p className="text-indigo-400 text-[10px] uppercase font-bold tracking-wider">{item.rarityCategory}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
