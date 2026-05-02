import React from 'react';
import { BookOpen, Users, Trophy, BookMarked, Globe, Sparkles, ArrowRight, Stars, LineChart, ShieldCheck } from 'lucide-react';

export function StickersView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in duration-500">
      <header className="mb-12 text-center relative px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-400 to-indigo-500 mb-6 uppercase tracking-tight leading-tight">
          Copa 2026:<br /> A Dinâmica do Colecionismo
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)"}}>
          O guia abrangente e analítico para estrategistas do universo de cromos. Compreenda a escassez matemática, maximize o valor do seu acervo e conecte-se com a elite do colecionismo sul-americano e global.
        </p>
      </header>

      {/* Community Section (Moved to TOP) */}
      <div className="bg-gradient-to-br from-indigo-900/60 via-slate-900 to-emerald-900/40 border border-indigo-500/40 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.15)] flex flex-col md:flex-row items-center gap-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full"></div>
        
        <div className="flex-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Users className="w-4 h-4" />
            Ecossistema de Trocas
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-wide leading-tight">
            Encontre Colecionadores e<br className="hidden lg:block"/> Estabeleça Parcerias
          </h2>
          <div className="space-y-4 text-slate-300 mb-8 font-medium leading-relaxed">
            <p>
              A verdadeira essência do colecionismo não reside na abertura solitária de pacotes, mas na complexa teia de sociabilidade e negociação. Num mercado onde a distribuição de cromos obedece a rigorosos algoritmos de raridade estipulados pelas editoras globais, o escambo organizado torna-se a estratégia financeira e logística mais viável.
            </p>
            <p>
              Nossa infraestrutura tecnológica atua como uma ponte direta, conectando as suas necessidades em tempo real a praças de encontro e grupos de negociação de alta confiabilidade. Descarte métodos obsoletos e adentre as nossas comunidades exclusivas, que contam com moderação dedicada para mitigar riscos de fraudes e garantir trocas justas estruturadas na avaliação profissional dos exemplares.
            </p>
          </div>
          
          <button 
            onClick={() => onNavigate && onNavigate('communities')}
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-indigo-500 hover:from-emerald-400 hover:to-indigo-400 text-white px-8 py-4 rounded-xl font-black text-lg uppercase tracking-wider transform hover:-translate-y-1 transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
          >
            Acessar Comunidades
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full md:w-1/3 flex justify-center relative z-10 shrink-0">
           <div className="w-64 h-64 bg-slate-800 rounded-full border-4 border-slate-700 shadow-2xl relative flex items-center justify-center p-8">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/50 animate-ping opacity-20"></div>
              <Globe className="w-full h-full text-indigo-400 opacity-80" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 blur-2xl rounded-full"></div>
           </div>
        </div>
      </div>

      <div className="text-center mb-10 mt-12">
        <h2 className="text-2xl md:text-3xl font-black text-slate-200 uppercase tracking-widest flex items-center justify-center gap-3">
          <BookMarked className="w-6 h-6 text-yellow-500" />
          O Guia Definitivo e Científico
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-700 shadow-2xl relative overflow-hidden group hover:border-slate-500 transition-colors">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-600">
              <LineChart className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Escassez Computada e Avaliação (Grading)</h3>
          </div>
          
          <div className="space-y-4 text-slate-300 font-medium leading-relaxed relative z-10 text-[15px] md:text-[16px]">
            <p>
              Com a inédita organização baseada em sede tripla (englobando Estados Unidos, México e Canadá), a estrutura documental do livro ilustrado correspondente à temporada de 2026 foi irremediavelmente expandida. Este crescimento dimensional precisou acomodar um vasto segmento de natureza institucional, incorporando projetos arquitetônicos de luxo, símbolos de sedes turísticas e mascotes oficias. Tal fenômeno diluiu substancialmente a densidade de páginas ativamente dedicadas aos elencos de fato, produzindo uma externalidade crítica no mercado: a elevação não planejada, porém aguda, da raridade matemática associada a atletas de elite.
            </p>
            <p>
              No que concerne aos ativos estéticos peculiares — especialmente os cromos lendários texturizados, comumente categorizados pelas divisões Extra Stickers ou Variantes Numeradas —, o cenário ganha contornos de complexidade acentuada. Empregando rotinas algorítmicas de cunho probabilístico, a produtora matriz (tradicionalmente referenciada como Panini ou suas associadas diretas) insere estes exemplares de forma pseudoaleatória nas caixas de distribuição do varejo.
            </p>
            <div className="bg-slate-800/80 border-l-4 border-yellow-500 p-5 rounded-r-xl mt-6 shadow-inner">
              <strong className="text-white block mb-2 text-lg">Diretriz Crítica de Preservação Patrimonial:</strong>
              <span className="text-sm md:text-base">Nunca proceda com a afixação primária de um ativo caso o exame ocular inicial sugira atributos de alta raridade (como brilhos prismáticos ou numerações reduzidas nas margens de impressão). O mercado livre avaliador (Grading) documenta de modo irrevogável que o mínimo desgaste, como a remoção precoce da película traseira original ('peel'), a geração deliberada de microfissuras limítrofes, ou riscos de desgaste em superfície reduzem a cotação financeira de colecionáveis estelares a um décimo de sua capacidade nativa de valorização.</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-700 shadow-2xl relative overflow-hidden group hover:border-slate-500 transition-colors">
          <div className="absolute top-0 left-0 -ml-8 -mt-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
             <div className="p-3 bg-slate-800 rounded-xl border border-slate-600">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Psicologia de Mercado e Estratégia de Barganha</h3>
          </div>
          
          <div className="space-y-4 text-slate-300 font-medium leading-relaxed relative z-10 text-[15px] md:text-[16px]">
            <p>
              A análise temporal da economia das trocas revela um alto grau de vulnerabilidade psicológica entre os colecionadores novatos. Os parâmetros balizadores, muitas vezes, seguem uma lógica empírica batizada entre os peritos como <strong>"Lei da Especulação Inicial"</strong>. Ao longo das quatro primeiras semanas contadas a partir do faturamento dos novos volumes estipulado em catálogo, a ânsia incontrolável pelo vislumbre de cromos brilhantes gera inflacionamentos irrisórios da ordem de dois a três dígitos percentuais contra cromos convencionais.
            </p>
            <p>
              Sob tais circunstâncias, observa-se que indivíduos desprevenidos ou excessivamente eufóricos procuram incessantemente consolidar seu espólio de coleções, desestruturando qualquer fundamento tático duradouro. A atitude adequada a ser adotada por um estrategista meticuloso é a retenção estratégica. Em dias iniciais, amealhe reservas de inventário em massa com o repasse metódico das repetições comuns para jogadores mais velozes.
            </p>
            <ul className="list-none pl-0 mt-6 space-y-4">
              <li className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold border border-blue-500/40 mt-0.5">1</div>
                 <div>
                  <strong className="text-white block">Microgestão Geográfica:</strong> 
                  <span className="text-sm md:text-base">Delegação menores – ou advindas de cenários onde as próprias logísticas de fábrica determinam um controle muito mais frugal do limite de tiragem por milhas rodadas (em especial Ásia, Oceania ou certas partes da África Setentrional) – configuram gargalos seríssimos de produção. Não as despreze!</span>
                 </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold border border-blue-500/40 mt-0.5">2</div>
                 <div>
                  <strong className="text-white block">Inventário Dinâmico Sanitizado:</strong> 
                  <span className="text-sm md:text-base">Mantenha em sua posse catálogos portáteis ("binders") alocando os excedentes numéricamente e com extrema clareza. Executivos desse mercado buscam confiabilidade primária na aparência sistêmica. Negócios velozes acontecem com mais regularidade quando há higienização na demonstração dos recursos visuais à mão.</span>
                 </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

