import React, { useState } from 'react';
import { Newspaper, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export function ArticlesView() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articles = [
    {
      title: "Por Dentro do Mistério: Por que os T-Hunts da Hot Wheels valem tanto?",
      category: "Carrinhos em Miniatura",
      excerpt: "Se você já comprou um Hot Wheels numa gôndola de supermercado, preste atenção. Desde 1995, a Mattel esconde no meio das caixas regulares edições limitadíssimas...",
      content: `Se você já comprou um Hot Wheels numa gôndola de supermercado, preste atenção. Desde 1995, a Mattel esconde no meio das caixas regulares edições limitadíssimas chamadas Treasure Hunts (T-Hunts) e Super Treasure Hunts ($TH).

Os $TH contam com pintura Spectraflame exclusiva inspirada nos clássicos originais, além de pneus de borracha Real Riders autênticos, que dão um peso e um caimento muito superior à miniatura. Mas o verdadeiro segredo da raridade está na distribuição meticulosa. Eles não vêm avisando em etiquetas gigantes na embalagem; você precisa estar com o olhar muito treinado para achar um pequeno símbolo de chama flamejante escondido atrás da miniatura, impresso direto na cartela, ou mesmo um discreto 'TH' quase camuflado na pintura metálica do carrinho.

Essa caça ao tesouro movimenta fóruns hiperativos na internet e encarece drasticamente o mercado paralelo. Para se ter uma ideia, modelos icônicos como um Datsun Bluebird 510 $TH ou um Nissan Skyline R34 podem chegar facilmente na casa dos R$ 1.500 logo na semana do lançamento. O motivo real dos preços absurdos dos revendedores não é o custo de produção, mas pura oferta e demanda: encontrar um Super Treasure Hunt pessoalmente, pendurado na humilde gôndola de um mercado normal, tem quase a mesma chance estatística de ganhar na loteria secundária.`
    },
    {
      title: "Como os Hot Wheels Redlines da Era Clássica Valem Fortunas",
      category: "Carrinhos em Miniatura",
      excerpt: "Os verdadeiros puristas e colecionadores de Hot Wheels conhecem muito bem os cobiçados 'Redlines', fabricados na época de ouro da marca...",
      content: `Os verdadeiros puristas e colecionadores de Hot Wheels conhecem muito bem os cobiçados 'Redlines', fabricados na época de ouro da marca entre 1968 e 1977. Distintivos por uma pequena e charmosa linha vermelha pintada nas laterais das rodas, essas edições representam hoje o verdadeiro Santo Graal das miniaturas fundidas (die-cast) no planeta.

O que torna essa série tão cara é a pureza do molde de metal e as condições quase impossíveis em que sobreviveram – afinal, eram brinquedos feitos para crianças baterem sem piedade contra a parede e arrastarem pelo asfalto quente nos anos 70. Quando alguém da nossa geração abre o sótão do avô e encontra um desses em estado perfeito de conservação na caixa original (blister), as cifras simplesmente enlouquecem.

Modelos raríssimos e que nunca entraram sequer em produção de massa, como o icônico protótipo cor-de-rosa do Volkswagen Beach Bomb Pink de 1969, já chegaram a ser arrematados por assombrosos $150.000 em leilões fechados para executivos. Tais cifras sublinham a loucura e a beleza do mercado: um carrinho de poucos centímetros carrega mais valor do que veículos reais na garagem de muita gente, ressaltando o ditado americano de que "o lixo que as mães jogaram fora no passado virou a aposentadoria garantida no presente".`
    },
    {
      title: "O Mercado de Pokémon TCG e o Grading das Cartas",
      category: "Cartas Colecionáveis",
      excerpt: "No inflamado universo contemporâneo de Pokémon TCG, uma carta não é apenas definida por sua raridade descrita no papel...",
      content: `No inflamado universo contemporâneo de Pokémon TCG, e de cartas voltadas a jogos de maneira geral, uma carta não é apenas definida por sua raridade descrita no texto holográfico – ela é estritamente definida pela sua condição de isolamento estrutural e microscópico.

Fatores invisíveis a olho nu, como holografia imaculada sem as indesejadas 'print lines' de máquina, bordas perfeitamente limpas sem resíduos de corte (sem o temido 'whitening') e uma imagem perfeitamente centralizada (o 'centering') são os reais ditadores implacáveis de preço. O mesmíssimo caco de papelão pode custar R$ 5,00 num fichário sujo ou atingir R$ 50.000,00 fechado em acrílico.

A culpa dessa valorização astronômica repousa sob os ombros das agências certificadoras de alto peso. Empresas americanas bilionárias como a PSA, a BGS (Beckett) e a nova geração da CGC transformaram a humilde brincadeira colecionável da sua infância – de bater bafo no recreio – em uma implacável bolsa de valores para adultos com altíssima renda disponível.

A peça mítica desse mercado especulativo continua sendo o lendário Charizard Holográfico de Primeira Edição Base Set (versão Shadowless, sem sombra nas bordas): ele não tem valor pra torneios modernos, mas se enviado numa maleta blindada pra matriz da PSA na Califórnia e retornar trancafiado no 'slab' de acrílico cimentado com a sonhada e inatingível nota perfeita 10 (Gem Mint/Pristine), ele literalmente vale o mesmo preço de uma mansão de luxo numa capital.`
    },
    {
      title: "O Renascimento Econômico dos Action Figures Retrô",
      category: "Bonecos & Toys",
      excerpt: "Eles começaram explodindo a cultura geek de massa no início dos anos 80, com potências indomáveis ​​como Masters of the Universe e Star Wars...",
      content: `A explosão da indústria pop como conhecemos começou injetando plástico na cultura geek infantil do início dos anos 80, por meio de tsunamis comerciais indomáveis elaborados pela Kenner e Hasbro, ​como Masters of the Universe (He-Man), G.I. Joe (Comandos em Ação), Transformers e as incansáveis correntes de personagens da trilogia clássica Star Wars.

Embora o afeto e a nostalgia nunca tenham tirado os heróis de cena, o que aconteceu com os estoques encalhados e caixas originais não abertas no final da década foi impressionante: eles não são mais apenas bonecos. Eles ganharam um peso de artefato de museu ou ativo financeiro de alto grau. Especialistas não compram apenas a figura; eles compram o cheiro do papelão da época. O mercado hoje exige itens AFA Graded fechados intocados e lacrados por vácuo do próprio fabricante.

Avaliações extremas ocorrem aos detalhes: você sabia que até mesmo o amarelamento causado por sol na loja de departamento antiga (sun damage) na redoma de acrílico da embalagem destrona brutalmente o valor da peça? Como 99% das crianças empolgadas rasgavam furiosamente a caixa na primeira hora de posse no salão da sala, restaram raríssimos exemplares "mint on card".

Curiosamente, até peças destruídas fora da embalagem, que costumam lotar caixas organizadoras largadas em sótãos molhados, valem sozinhas pequenas fortunas quando tratamos de "acessórios periféricos". Minúsculos pedaços descartáveis, plásticos em formato de mini-sabres, comunicadores invisíveis ou pequeninas tampas de compartimentos de bateria que eram sumariamente aspiradas, quebradas na boca ou engolidas por animais, agora chegam a valer centenas de dólares solitariamente e viram o elo de ouro para completar a figura de um colecionador desesperado.`
    },
    {
      title: "Numismática 101: A Coleção das Moedas Incomuns",
      category: "Moedas & Relíquias",
      excerpt: "Considerada por milênios como o autêntico 'hobby de reis e impérios', a numismática – o profundo estudo do dinheiro – vai muito além de guardar trocos...",
      content: `Considerada de fato por mais de dois milênios como o autêntico 'nobre hobby de imperadores', a numismática – que é o profundo e meticuloso estudo e armazenamento de dinheiro (físico, metálico ou fiduciário) – vai de forma imensurável muito além do do simples instinto humano de não jogar foras trocos curiosos achados no fundo do ralo.

No pico da exclusividade desse mercado peculiar, desmistifica-se um fato surpreendente: a imensa maioria das moedas valiosas não ganha suas cifras astronômicas leiloadas apenas pela pura antiguidade (pois você poderia comprar uma legítima e empoeirada moeda rudimentar do Império Romano inteiro por menos de 50 dólares online). Em vez de idade pura, o foco reside numa obsessão curiosa: em bizarros e hilários erros físicos na prensa fabril durante atos cruciais comandados pela Casa da Moeda de governos centrais.

Um dos casos modernos mais famosos e perigosos que move os engravatados americanos foca em torno do tão falsificado e escorregadio "Penny Mítico de Cobre" datado dos tensos calendários estadunidenses de guerra, no ano de 1943. Fabricado durante uma agressiva crise de racionamento devido à Segunda Guerra (onde o cobre deveria estar indo inteiramente fazer munições ao invés de centavos, fazendo os EUA produzir moedas de aço branco para economizar), sobraram as chamadas "Blank Planchets" presas no maquinário.

Essa única falha acidental fez saírem umas escassas dezenas de centavos americanos revestidos ainda em cobre e que viajaram escondidos no bolso de fazendeiros desavisados da guerra, passando de mão em mão. Hoje, custam dezenas e dezenas de milhares nas mãos de curadores sérios. Provando pra muitos especialistas o porquê essa arte nunca morre: repousa no simples ato mental onde todo metal envelhecido largado em caixas escuras contém inteiramente preservadas tramas históricas de um país inteiro guardadas em menos de 20 gramas.`
    }
  ];

  if (selectedArticle !== null) {
    const article = articles[selectedArticle];
    return (
      <div className="max-w-4xl mx-auto py-8 animate-in slide-in-from-right-4 duration-500">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Voltar para Artigos</span>
        </button>

        <article className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-md">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-10">
            {article.title}
          </h1>

          <div className="prose prose-invert prose-indigo max-w-none">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 text-lg leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    );
  }

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
            onClick={() => setSelectedArticle(index)}
            className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition-colors flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-md">
                {article.category}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-snug">
              {article.title}
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 flex-1">
              {article.excerpt}
            </p>
            <div className="mt-auto flex items-center justify-between text-sm font-medium text-indigo-400 opacity-80 group-hover:opacity-100 transition-opacity pt-4 border-t border-slate-800/50">
              <span className="group-hover:pl-2 transition-all">Ler artigo completo</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
