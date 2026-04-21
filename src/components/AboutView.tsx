import React from 'react';
import { Target, Mail, Instagram, Info } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="pb-8 pt-4 border-b border-slate-800">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-600/10 border border-indigo-600/30 rounded-xl mb-4">
          <Info className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Sobre a Bullseye</h1>
        <p className="text-slate-400 mt-4 text-lg leading-relaxed">
          O principal hub para conectar colecionadores, preservar relíquias e facilitar trocas e vendas em um ambiente seguro e movido por Inteligência Artificial.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3">Nossa Missão</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sabemos o quanto é difícil descobrir o valor real de uma peça antiga, um carrinho fora da caixa ou uma moeda rara. A Bullseye existe para democratizar a avaliação de itens de coleção através do nosso sistema da IA Gemini e criar a maior comunidade de colecionadores da américa latina.
            </p>
          </section>

          <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-3">O que oferecemos?</h2>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <span><strong>Análise IA:</strong> Avaliamos raridade e estimamos valores baseados em pesquisa web em tempo real.</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <span><strong>Rede Social:</strong> Faça amigos, crie comunidades e organize o seu acervo digital.</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <span><strong>Gamificação:</strong> Suba no nosso ranking global adicionando e rastreando seus tesouros.</span>
              </li>
            </ul>
          </section>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <section className="bg-indigo-950/30 border border-indigo-900/50 p-6 rounded-2xl h-full flex flex-col">
            <h2 className="text-xl font-bold text-white mb-2">Fale Conosco</h2>
            <p className="text-slate-400 text-sm mb-6">
              Dúvidas, sugestões, parcerias comerciais ou problemas com a plataforma? Nossa equipe (e os devs) estão sempre online nas nossas redes.
            </p>
            
            <div className="space-y-4 mt-auto">
              <a 
                href="https://instagram.com/bullseye_ti" 
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 p-4 rounded-xl transition-colors group"
              >
                <div className="bg-indigo-600/20 p-2 rounded-lg group-hover:bg-indigo-600/40 transition-colors">
                   <Instagram className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-bold">Instagram</p>
                  <p className="text-slate-400 text-xs">@bullseye_ti</p>
                </div>
              </a>

              <a 
                href="https://www.tiktok.com/@bullseye_ti" 
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 p-4 rounded-xl transition-colors group"
              >
                <div className="bg-indigo-600/20 p-2 rounded-lg group-hover:bg-indigo-600/40 transition-colors">
                   <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-.9 4.45-2.35 6.08-1.4 1.58-3.4 2.62-5.55 2.89-2.07.24-4.22-.05-6.05-1.07-1.78-1.01-3.23-2.61-3.92-4.52-.7-1.95-.69-4.14-.02-6.08.72-2.12 2.37-3.95 4.42-4.87 2.01-.89 4.31-1.05 6.43-.61v4.21c-1.1-.38-2.34-.41-3.46-.07-.94.28-1.77.92-2.28 1.76-.5.84-.66 1.88-.41 2.82.26 1.05 1.01 1.94 1.98 2.38 1.07.48 2.35.43 3.38-.08.91-.45 1.62-1.27 1.95-2.23.23-.66.3-1.39.29-2.1V.02z"/>
                   </svg>
                </div>
                <div>
                  <p className="text-white font-bold">TikTok</p>
                  <p className="text-slate-400 text-xs">@bullseye_ti</p>
                </div>
              </a>
              
              <a
                href="mailto:taquions.7725.richguys@gmail.com"
                className="flex items-center gap-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 p-4 rounded-xl transition-colors group"
              >
                <div className="bg-indigo-600/20 p-2 rounded-lg group-hover:bg-indigo-600/40 transition-colors">
                   <Mail className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-bold">E-mail para Suporte</p>
                  <p className="text-slate-400 text-xs">taquions.7725.richguys@gmail.com</p>
                </div>
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
