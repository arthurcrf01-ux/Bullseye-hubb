import React from 'react';
import { BookOpen, Users, Trophy, BookMarked, Globe, Sparkles, ArrowRight, Stars, LineChart, ShieldCheck } from 'lucide-react';

export function StickersView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in duration-500">
      <header className="mb-12 text-center relative px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-400 to-indigo-500 mb-6 uppercase tracking-tight leading-tight">
          Copa 2026:<br /> A Febre das Figurinhas
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)"}}>
          Tudo o que você precisa saber para se tornar um verdadeiro mestre das figurinhas! Aprenda as melhores dicas para encontrar as mais raras, proteger seus cromos brilhantes e fazer trocas incríveis para completar seu álbum bem mais rápido.
        </p>
      </header>

      {/* Community Section (Moved to TOP) */}
      <div className="bg-gradient-to-br from-indigo-900/60 via-slate-900 to-emerald-900/40 border border-indigo-500/40 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.15)] flex flex-col md:flex-row items-center gap-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full"></div>
        
        <div className="flex-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Users className="w-4 h-4" />
            Nossos Encontros
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-wide leading-tight">
            Encontre Amigos e<br className="hidden lg:block"/> Faça Trocas Incríveis
          </h2>
          <div className="space-y-4 text-slate-300 mb-8 font-medium leading-relaxed">
            <p>
              A parte mais legal de colecionar não é apenas abrir os pacotes sozinho no seu quarto, mas sim a grande aventura de se juntar com os amigos para ver quem tirou as melhores! Além disso, a gente sabe que depender apenas da sorte na hora de comprar os pacotinhos na banca pode ficar bem caro e demorado. Por esse motivo, as melhores coleções são sempre completadas através de excelentes trocas.
            </p>
            <p>
              Em nosso aplicativo, você não precisa ficar perdidão procurando onde a galera está se reunindo. Nós desenvolvemos uma plataforma especial que mapeia os melhores grupos e pontos de troca na sua região. Venha fazer parte de nossas queridas comunidades exclusivas. Lá você encontra um ambiente super animado e organizado para trocar o seu monte de repetidas da melhor forma possível, conhecendo outros colecionadores tão fantásticos quanto você!
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
          O Guia Secreto do Colecionador
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
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Os Segredos das Figurinhas Super Raras</h3>
          </div>
          
          <div className="space-y-4 text-slate-300 font-medium leading-relaxed relative z-10 text-[15px] md:text-[16px]">
            <p>
              Nesta edição incrivelmente histórica, a Copa do Mundo vai acontecer em três países bem grandes ao mesmo tempo: Estados Unidos, Canadá e México! Sabem o que isso muda? O nosso amado álbum fica cheio de páginas extras maravilhosas com fotos artísticas dos modernos estádios, super pôsteres vibrantes de todas as cidades e imagens descoladas das mascotes espalhadas pelos cantos. Como tem muito mais tipos diferentes de figurinhas sendo impressas na fábrica, aquela sua carta especial de jogador que você tanto quer pode demorar um pouco a mais para aparecer no seu pacote.
            </p>
            <p>
              Ao abrir um pacote, você rapidamente percebe que existem cromos super coloridos e brilhantes. Mas existe algo ainda mais mágico: as lendárias "Extra Stickers" (figurinhas extras lendárias). Essas cartas especialíssimas, algumas com charmosas bordinhas na cor Ouro, Prata, Bronze e até mesmo Vinho Cobre, são verdadeiros diamantes do colecionismo. Elas são muito raríssimas, e a emoção de tirar uma de um craque camisa 10 nos primeiros dias é contagiante — muitos apaixonados chegam a oferecer pilhas enormes de outras cartas em troca de uma única figurinha dourada super desejada dessas!
            </p>
            <div className="bg-slate-800/80 border-l-4 border-yellow-500 p-5 rounded-r-xl mt-6 shadow-inner">
              <strong className="text-white block mb-2 text-lg">Proteja Seu Maior Tesouro (Grading):</strong>
              <span className="text-sm md:text-base">Você abriu o pacote e voou uma "Legend" super brilhante para a sua mão? Calma aí e respire fundo antes de arrancar a parte de trás para grudar na página! No mundão do colecionismo de alto nível, os maiores caçadores de raridades costumam mandar essas figurinhas valiosíssimas para o "Grading", que é uma avaliação técnica muito rigorosa para verificar cada bordinha não amassada. Se você colar no papel ou amassar só um pouquinho as pontas do papelão, ela perde bastante do charme e do seu raro valor. Em vez disso, coloque-a com cuidado num protetorzinho limpo (um "sleeve" de plástico flexível). Desse jeito, você a guarda perfeita e mantém os grandes caçadores com os olhos brilhando cheios de inveja do seu valioso tesouro achado na sorte!</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-700 shadow-2xl relative overflow-hidden group hover:border-slate-500 transition-colors">
          <div className="absolute top-0 left-0 -ml-8 -mt-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
             <div className="p-3 bg-slate-800 rounded-xl border border-slate-600">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Estratégias Geniais na Hora da Troca</h3>
          </div>
          
          <div className="space-y-4 text-slate-300 font-medium leading-relaxed relative z-10 text-[15px] md:text-[16px]">
            <p>
              Vocês já repararam na loucura divertida que acontece na pracinha ou em frente da banca logo no primeiro final de semana em que o novo álbum saiu para nós colecionarmos? Os adultos e meninos chamam isso de "Febre da Prateleira Quente". Com a euforia tomando conta, os colecionadores novatos ficam doidinhos e começam a propor negócios não muito bons; eles tentam dar doze repetidas de jogadores normais e ainda alguns escudinhos brilhosos apenas para garantir um holograma qualquer. O segredo? Ter bastante paciência contra toda essa fome inicial!
            </p>
            <p>
              A melhor jogada mestre de um veterano colecionador é justamente o pensamento de longo prazo. Passe os seus dias pioneiros somente focado em juntar muito volume sem se desesperar pelas mais lindas. Ao invés de tentar logo completar as fileiras da sua seleção predileta nos apuros da concorrência, use e guarde as suas valiosas repetidas até o furor original acalmar. Conforme acabam os meses, a multidão começará a ficar ansiosa desesperadamente atrás dos cromos basiquinhos simples com pontuações bem rotineiras para preencher os buraquinhos que faltam aos montes no papel, e os seus antigos bolinhos normais acabarão valendo as trocas maravilhosamente raras e brilhantes dos seus maiores sonhos.
            </p>
            <ul className="list-none pl-0 mt-6 space-y-4">
              <li className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold border border-blue-500/40 mt-0.5">1</div>
                 <div>
                  <strong className="text-white block">Atenção com Seleções Pouco Famosas:</strong> 
                  <span className="text-sm md:text-base">Muitas vezes, sem avisar quase nada de ninguém, a fábrica que produz as cartinhas acaba limitando a quantidade dos adesivos e cromos impressos referentes a equipes esportivas e nações não muito famosas. Eles acabam ficando espremidos em caixas distantes. Não esnobe e nem perca essas cartas tão pouco valorizadas no início; elas viram autênticas pratinhas escondidas nos meses finais, cruciais no escambo com outros experientes!</span>
                 </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold border border-blue-500/40 mt-0.5">2</div>
                 <div>
                  <strong className="text-white block">Um Monte Organizado é um Monte Desejado:</strong> 
                  <span className="text-sm md:text-base">Cuidado muito severo com aquele imenso bolinho amassado jogado inteiro no fundo bolso! Todo perito gosta mesmo é de encontrar um outro amigo com suas figurinhas repetidas super bem armazenadas; de preferência bem cuidadinhas através do uso elegante do elastiquinho ou até organizadas lindamente de cem em cem numa pastinha charmosa. Com essa elegância de exposição os seus negócios andam três vezes mais ligeiros do que qualquer baguncinha espalhada que chateia os olhos e os caçadores por aí.</span>
                 </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


