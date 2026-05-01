import React from 'react';
import { BookOpen, Users, Trophy, BookMarked, Globe, Sparkles /*, Sticker as StickerIcon*/ } from 'lucide-react';

export function StickersView() {
  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-500">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-4 uppercase tracking-tight">
          Figurinhas Copa 2026
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
          O guia definitivo para completar seu álbum com eficiência, descobrir cromos raros e criar sua comunidade de troca.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
          <BookMarked className="w-12 h-12 text-emerald-400 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Curiosidades do Álbum 2026</h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
              <p>Três países sediando significa uma quantidade recorde de estádios e páginas dedicadas às culturas dos anfitriões.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
              <p>Os cromos holográficos deste ano (lendários) trazem a tecnologia de escaneamento QR para exibir lances no aplicativo oficial.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
              <p>Figurinhas de estreantes têm bordas holográficas menores, aumentando o valor especulativo de coleções futuras.</p>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 -ml-8 -mt-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
          <Globe className="w-12 h-12 text-cyan-400 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Estratégias de Coleção</h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2"></span>
              <p><strong>Evite colar no começo:</strong> Guarde os cromos mais brilhantes e craques no plástico até a segunda semana para maior poder de negociação.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2"></span>
              <p><strong>A regra do 1 por 3:</strong> Um cromo brilhante geralmente é negociado por pelo menos 3 cromos normais que você precisa urgentemente.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2"></span>
              <p><strong>Foco nas seleções pequenas:</strong> Surpreendentemente, jogadores de seleções menos populares são impressos em menor escala ou retidos.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 border-2 border-indigo-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center">
          <Users className="w-16 h-16 text-indigo-400 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Encontre Pessoas Para Troca
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            A verdadeira magia do álbum não está em comprá-lo completo, mas sim na jornada e nas conexões. Sugerimos que você <strong>crie grupos no WhatsApp ou Telegram</strong> do seu condomínio, escola ou empresa para facilitar o encontro.
            Organize "Points de Troca" em praças de alimentação ou clubes aos finais de semana!
          </p>
          
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-left max-w-2xl w-full">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Dica de Ouro para Grupos
            </h3>
            <p className="text-slate-400">
              Crie uma planilha no Google Sheets compartilhada ou use aplicativos com os membros do seu grupo. 
              Ao invés de perguntar "quem tem o Neymar?", os membros podem consultar e ir direto ao alvo. 
              Isso agiliza as negociações e fortalece as amizades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
