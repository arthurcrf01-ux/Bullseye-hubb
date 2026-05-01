import React from 'react';
import { BookOpen, Users, Trophy, BookMarked, Globe, Sparkles, ArrowRight, Stars } from 'lucide-react';

export function StickersView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-500">
      <header className="mb-12 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-green-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-blue-500 mb-6 uppercase tracking-tight leading-tight">
          Copa 2026:<br /> A Febre das Figurinhas
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)"}}>
          Prepare-se para o maior torneio do mundo. O guia definitivo para completar seu álbum com eficiência, descobrir cromos ultrarraros e criar sua comunidade de troca oficial no aplicativo.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-green-900/40 to-slate-900 rounded-3xl p-8 border border-green-500/30 shadow-2xl relative overflow-hidden group hover:border-green-400/60 transition-colors">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 transition-all"></div>
          <Stars className="w-12 h-12 text-yellow-400 mb-6 group-hover:rotate-12 transition-transform" />
          <h2 className="text-2xl font-bold text-white mb-4">A Lógica dos Cromos Lendários</h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-yellow-400 mt-2 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
              <p>Com três países sediando o torneio simultaneamente, esta edição possui uma proporção inédita de páginas dedicadas à infraestrutura, diminuindo a tiragem de lendas do esporte.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-yellow-400 mt-2 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
              <p>Os cromos <strong>Ouro, Prata, Bronze e Vinho</strong> retornam. Um Ouro de um craque mundial na primeira página de uma seleção atinge picos de avaliação astronômicos nos primeiros 10 dias de lançamento.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-yellow-400 mt-2 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
              <p>Dica: Nunca cole um cromo brilhante perfeitamente alinhado se você suspeita que ele vale dinheiro seco. O ato de remover a película traseira zera o valor dele para avaliadores (grading).</p>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-3xl p-8 border border-blue-500/30 shadow-2xl relative overflow-hidden group hover:border-blue-400/60 transition-colors">
          <div className="absolute top-0 left-0 -ml-8 -mt-8 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all"></div>
          <Globe className="w-12 h-12 text-blue-400 mb-6 group-hover:-rotate-12 transition-transform" />
          <h2 className="text-2xl font-bold text-white mb-4">Estratégias de Negociação</h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-2 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
              <p><strong>A Regra da Segunda Semana:</strong> Segure suas repetidas! Nos primeiros dias o mercado está inflacionado, mas na segunda semana, colecionadores desesperados oferecem 5 cromos comuns por um escudo brilhante.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-2 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
              <p><strong>Foco nas Nações Menores:</strong> Cuidado, as editoras frequentemente restringem os números finais de lotes de nações sem muita tradição, criando escassez artificial para os últimos times do álbum.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-2 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
              <p><strong>Organização Matemática:</strong> Ordene seu monte de repetidas numericamente usando elásticos por centenas. Apresentar-se como organizado atrai negociações velozes em praças públicas.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-900/60 via-slate-900 to-yellow-900/40 border-2 border-yellow-500/40 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-yellow-400/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Users className="w-10 h-10 text-yellow-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-wide">
            Encontre Pessoas Para Troca
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            A verdadeira magia da Copa do Mundo não está em comprar caixas fechadas sozinho em casa, mas sim na emoção da negociação presencial. Esqueça aplicativos avulsos disfuncionais: <strong>nossa plataforma possui Comunidades exclusivas</strong> de colecionadores de alto nível próximas a você.
          </p>
          
          <button 
            onClick={() => onNavigate && onNavigate('communities')}
            className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-8 py-5 rounded-2xl font-black text-lg md:text-xl uppercase tracking-wider transform hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)]"
          >
            Acessar Nossas Comunidades
            <ArrowRight className="w-6 h-6 animate-bounce-x" />
          </button>
        </div>
      </div>
    </div>
  );
}
