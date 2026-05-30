import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../store/StoreContext';
import { ChatMessage, Friendship, User } from '../types';
import { collection, query, orderBy, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { X, Send, User as UserIcon, Trash2, Edit2, Check } from 'lucide-react';

export function DirectMessageModal({ friendshipId, onClose }: { friendshipId: string, onClose: () => void }) {
  const { currentUser, friendships, sendDirectMessage, deleteDirectMessage, updateFriendNickname } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [friend, setFriend] = useState<User | null>(null);
  const [text, setText] = useState('');
  
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');
  
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
  
  const handleSaveNickname = async () => {
    if (!nicknameInput.trim()) return;
    await updateFriendNickname(friendshipId, nicknameInput.trim());
    setIsEditingNickname(false);
  };

  if (!friendship || !currentUser) return null;

  const currentNickname = friendship.nicknames?.[currentUser.id] || friend?.name || 'Carregando...';

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col sm:flex-row backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex-1 flex flex-col bg-slate-950 sm:max-w-md sm:mx-auto border-x border-slate-800 shadow-2xl h-[100dvh]">
        <header className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between shadow-md z-10 shrink-0">
          <div className="flex items-center gap-3">
            {friend ? (
              <img src={friend.avatarUrl} alt={friend.name} className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                <UserIcon className="w-5 h-5" />
              </div>
            )}
            <div className="flex flex-col jutsify-center">
              {isEditingNickname ? (
                <div className="flex items-center gap-1">
                  <input
                    autoFocus
                    type="text"
                    value={nicknameInput}
                    onChange={(e) => setNicknameInput(e.target.value)}
                    placeholder="Apelido..."
                    maxLength={30}
                    className="bg-slate-800 text-white text-sm px-2 py-1 rounded border border-slate-600 focus:outline-none w-24"
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveNickname()}
                  />
                  <button onClick={handleSaveNickname} className="p-1 text-emerald-400 hover:bg-slate-700 rounded transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsEditingNickname(false)} className="p-1 text-slate-400 hover:bg-slate-700 rounded transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h2 className="text-white font-semibold leading-tight">{currentNickname}</h2>
                  <button 
                    onClick={() => { setNicknameInput(currentNickname); setIsEditingNickname(true); }}
                    className="text-slate-500 hover:text-indigo-400 transition-colors p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    title="Adicionar/Editar apelido"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <p className="text-[10px] text-indigo-400">Chat Privado</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full transition-colors hover:bg-slate-800">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-10 opacity-50">
              <p className="text-slate-400 text-sm">Diga olá para iniciar a conversa com {currentNickname}.</p>
            </div>
          )}
          {messages.map(msg => {
             const isMe = msg.userId === currentUser?.id;
             return (
               <div key={msg.id} className={`flex flex-col group ${isMe ? 'items-end' : 'items-start'}`}>
                 <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm relative ${isMe ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-100 rounded-tl-sm border border-slate-700'}`}>
                   <p className="break-words">{msg.text}</p>
                 </div>
                 <div className={`flex items-center gap-2 mt-1 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                   <span className="text-[10px] text-slate-500">
                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                   {isMe && (
                     <button 
                       onClick={() => deleteDirectMessage(friendshipId, msg.id)}
                       className="text-slate-600 hover:text-red-400 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                       title="Apagar mensagem"
                     >
                       <Trash2 className="w-3.5 h-3.5" />
                     </button>
                   )}
                 </div>
               </div>
             );
          })}
          <div ref={bottomRef} className="h-2" />
        </div>

        <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0 pb-safe">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Digite uma mensagem..."
              maxLength={2000}
              className="flex-1 bg-slate-800 text-white rounded-full px-4 py-2 border border-slate-700 focus:outline-none focus:border-indigo-500 text-sm shadow-inner"
            />
            <button 
              type="submit"
              disabled={!text.trim()}
              className="w-10 h-10 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-white disabled:opacity-50 disabled:bg-slate-700 transition-colors shadow-md"
            >
              <Send className="w-4 h-4 ml-[-2px]" />
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
