import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/StoreContext';
import { ChatMessage, Friendship, User } from '../types';
import { collection, query, orderBy, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { X, Send, User as UserIcon } from 'lucide-react';

export function DirectMessageModal({ friendshipId, onClose }: { friendshipId: string, onClose: () => void }) {
  const { currentUser, friendships, sendDirectMessage } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [friend, setFriend] = useState<User | null>(null);
  const [text, setText] = useState('');
  
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const friendship = friendships.find(f => f.id === friendshipId);

  useEffect(() => {
    if (!friendship || !currentUser) return;
    
    const friendId = friendship.participants.find(id => id !== currentUser.id);
    if (friendId) {
       getDoc(doc(db, 'users', friendId)).then(snap => {
         if (snap.exists()) setFriend(snap.data() as User);
       });
    }

    const q = query(
      collection(db, 'friendships', friendshipId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => d.data() as ChatMessage));
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsub();
  }, [friendshipId, currentUser, friendship]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const txt = text;
    setText('');
    await sendDirectMessage(friendshipId, txt);
  };

  if (!friendship || !currentUser) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col sm:flex-row">
      <div className="flex-1 flex flex-col bg-slate-950 sm:max-w-md sm:mx-auto border-x border-slate-800">
        <header className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            {friend ? (
              <img src={friend.avatarUrl} alt={friend.name} className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                <UserIcon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h2 className="text-white font-semibold leading-tight">{friend?.name || 'Carregando...'}</h2>
              <p className="text-xs text-indigo-400">Chat Privado</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-10 opacity-50">
              <p className="text-slate-400 text-sm">Diga olá para iniciar a conversa.</p>
            </div>
          )}
          {messages.map(msg => {
             const isMe = msg.userId === currentUser?.id;
             return (
               <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                 <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${isMe ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-100 rounded-tl-sm border border-slate-700'}`}>
                   {msg.text}
                 </div>
                 <span className="text-[10px] text-slate-500 mt-1 px-1">
                   {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
               </div>
             );
          })}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Digite uma mensagem..."
              className="flex-1 bg-slate-800 text-white rounded-full px-4 py-2 border border-slate-700 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button 
              type="submit"
              disabled={!text.trim()}
              className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white disabled:opacity-50 disabled:bg-slate-700 transition-colors"
            >
              <Send className="w-4 h-4 ml-[-2px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
