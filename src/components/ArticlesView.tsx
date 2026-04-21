import React from 'react';
import { Newspaper, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export function ArticlesView() {
  const articles = [
    {
      title: "Por Dentro do Mistério: Por que os T-Hunts da Hot Wheels valem tanto?",
      category: "Carrinhos em Miniatura",
      readTime: "7 min",
      content: "Se você já comprou um Hot Wheels numa gôndola de supermercado, preste atenção. Desde 1995, a Mattel esconde no meio das caixas regulares edições limitadíssimas chamadas Treasure Hunts (T-Hunts) e Super Treasure Hunts ($TH). Os $TH contam com pintura Spectraflame exclusiva inspirada nos clássicos originais, além de pneus de borracha Real Riders autênticos, que dão um peso e um caimento muito superior à miniatura. Mas o verdadeiro segredo da raridade está na distribuição meticulosa. Eles não vêm avisando em etiquetas gigantes na embalagem; você precisa estar com o olhar muito treinado para achar um pequeno símbolo de chama flamejante escondido atrás da miniatura, impresso direto na cartela, ou mesmo um discreto 'TH' quase camuflado na pintura metálica do carrinho. Essa caça ao tesouro movimenta fóruns hiperativos na internet e encarece drasticamente o mercado paralelo. Para se ter uma ideia, modelos icônicos como um Datsun Bluebird 510 $TH ou um Nissan Skyline R34 podem chegar facilmente na casa dos R$ 1.500 logo na semana do lançamento, apenas porque encontrar um pessoalmente, na gôndola de um mercado normal, tem a mesma chance estatística de ganhar na loteria secundária."
    },
    {
      title: "Como os Hot Wheels Redlines da Era Clássica Valem Fortunas",
      category: "Carrinhos em Miniatura",
      readTime: "4 min",
      content: "Os verdadeiros puristas e colecionadores de Hot Wheels conhecem muito bem os cobiçados 'Redlines', fabricados na época de ouro da marca entre 1968 e 1977. Distintivos por uma pequena e charmosa linha vermelha pintada nas laterais das rodas, essas edições representam hoje o verdadeiro Santo Graal das miniaturas fundidas (die-cast) no planeta. O que torna essa série tão cara é a pureza do molde de metal e as condições em que sobreviveram – afinal, eram brinquedos feitos para crianças baterem contra a parede nos anos 70. Quando você encontra um em estado perfeito de conservação na caixa original (blister), as cifras enlouquecem. Modelos raríssimos e que nunca entraram em produção de massa, como o icônico protótipo do Volkswagen Beach Bomb Pink de 1969, já chegaram a ser arrematados por assombrosos $150.000 em leilões fechados para figurões, ressaltando o ditado fundamental de nossos tempos modernos: aquilo que os vizinhos consideravam apenas entulho ou o lixo do passado pode ser o passaporte dourado financeiro ou o tesouro do presente."
    },
    {
      title: "O Mercado de Pokémon TCG e a Grade Grading das Cartas",
      category: "Cartas Colecionáveis",
      readTime: "6 min",
      content: "No inflamado universo contemporâneo de Pokémon TCG, e de cartas voltadas a jogos de maneira geral, uma carta não é apenas definida por sua raridade descrita no papel – ela é estritamente definida pela sua condição de isolamento microscópico. Fatores como holografia imaculada sem 'print lines', bordas perfeitamente limpas (sem os temidos 'whitening') e uma imagem perfeitamente centralizada na impressão são os reais ditadores de preço que farão uma peça custar R$ 5,00 ou R$ 50.000,00. Agências certificadoras de peso, como a gigantesca PSA, a BGS (Beckett) e a CGC, transformaram a humilde brincadeira e coleção infantil do seu passado em uma impiedosa bolsa de valores de alta octanagem no mercado adulto. O melhor exemplo disso é uma carta base do clássico Charizard Holográfico de Primeira Edição (Shadowless): ela pode valer apenas as lembranças do dono se estiver dobrada, arranhada ou rasgada, mas pode lhe custar o valor de uma luxuosa casa caso volte de uma dessas agências selada no slab acrílico com a desejadíssima nota perfeita 10 (Gem Mint/Pristine)."
    },
    {
      title: "O Renascimento dos Action Figures Retrô",
      category: "Bonecos & Toys",
      readTime: "5 min",
      content: "Eles começaram explodindo a cultura geek de massa no início dos anos 80, com potências indomáveis ​​como Masters of the Universe (He-Man), G.I. Joe (Comandos em Ação), Transformers e as incansáveis linhas infinitas de bonecos clássicos de Star Wars. Embora a nostalgia e a cultura pop nunca tenham tirado os bonecos de circulação, os moldes autênticos antigos ganharam hoje um peso gravitacional totalmente diferente daquilo que eram. Colecionadores sérios agora buscam obsessivamente por itens perfeitamente lacrados e selados da época (AFA Graded fechados na caixa de cartão), onde avaliações extremas ocorrem: sabia que até mesmo o amarelamento (sun damage) e o estado físico ou cor da redoma de acrílico da embalagem muda drasticamente o valor ofertado pela peça num piscar de olhos? Como a vasta maioria das crianças obviamente rasgou a caixa na primeira hora de posse, sobreviveram pouquíssimos exemplares inalterados. Inclusive, peças soltas também valem pequenas fortunas: alguns acessórios minúsculos exclusivos, mini-sabres ou peças de armadura, que foram aspirados brutalmente ou engolidos facilmente por animais e aparelhos de pó na década de 80, chegam a valer dezenas a centenas de dólares quando preservados originais, tornando o caça aos componentes fidedignos um esporte competitivo."
    },
    {
      title: "Numismática 101: A Fascinante Coleção de Moedas Incomuns",
      category: "Moedas & Relíquias",
      readTime: "3 min",
      content: "Considerada por milênios como o autêntico 'hobby de reis e impérios', a numismática – que é o profundo estudo e o ato colecionável de dinheiro – vai muito, muito além do que uma simples vontade de não descartar trocos em pedágios. No alto escalão desse mercado peculiar, uma moeda frequentemente não ganha o seu valor astronômico pela sua pura antiguidade romana (como muitos acham cobiçando algo da Idade Média), mas sim por erros microscópicos de rotina fabril e curiosidades industriais falhas no instante crucial da cunhagem pelo banco central do país. Um dos exemplos modernos americanos de maior impacto envolve as raríssimas moedas conhecidas como o famoso e evasivo Penny Mítico de Cobre, datado do tenso ano de 1943. Feito num momento crucial de racionamento devido à Segunda Guerra Mundial, representam acidentes de pranchas esquecidas e hoje valem dezenas de milhares nas mãos de especialistas. Isso prova sua magia latente: toda moeda velha abandonada na gaveta carrega literalmente a história política pesada de toda sua nação de origem escondida de forma fria e invisível num levíssimo e singelo pedacinho cilíndrico de metal pesando menos de 20 gramas."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-500">
      <header className="mb-12 md:mb-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600/10 border border-indigo-600/30 rounded-xl mb-4">
            <Newspaper className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Artigos & Curiosidades</h1>
          <p className="text-slate-400 mt-2">Dicas, histórias e o mercado do mundo do colecionismo.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <motion.article 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition-colors flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-md">
                {article.category}
              </span>
              <span className="text-slate-500 text-xs font-mono">{article.readTime} Leitura</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-snug">
              {article.title}
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 flex-1">
              {article.content}
            </p>
            <div className="mt-auto flex items-center text-sm font-medium text-indigo-400 opacity-80 group-hover:opacity-100 transition-opacity">
              <span>Continuar lendo</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </motion.article>
        ))}
      </div>
      
      {/* Banner / Google Adsenses possible placement space */}
      <div className="mt-12 bg-slate-800/30 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[150px]">
        <p className="text-slate-500 text-sm uppercase tracking-widest font-mono">Espaço Reservado para Anúncios (AdSense)</p>
      </div>
    </div>
  );
}
