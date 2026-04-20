import React from 'react';
import { Newspaper, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export function ArticlesView() {
  const articles = [
    {
      title: "Por Dentro do Mistério: Por que os T-Hunts da Hot Wheels valem tanto?",
      category: "Carrinhos em Miniatura",
      readTime: "7 min",
      content: "Se você já comprou um Hot Wheels numa gôndola de supermercado, preste atenção. Desde 1995, a Mattel esconde no meio das caixas regulares edições limitadíssimas chamadas Treasure Hunts (T-Hunts) e Super Treasure Hunts ($TH). Os $TH contam com pintura Spectraflame exclusiva e pneus de borracha Real Riders. O segredo da raridade? Eles não vêm avisando em etiquetas gigantes; você precisa achar um pequeno símbolo de chama flamejante escondido atrás da miniatura ou um discreto 'TH' na pintura do carrinho. Esses modelos encarecem drasticamente o mercado paralelo, onde um Datsun Bluebird 510 $TH pode chegar facilmente na casa dos R$ 1.500 no lançamento, apenas porque encontrar um pessoalmente tem a mesma chance de ganhar na loteria."
    },
    {
      title: "Como os Hot Wheels Redlines da Era Clássica Valem Fortunas",
      category: "Carrinhos em Miniatura",
      readTime: "4 min",
      content: "Os colecionadores de Hot Wheels conhecem bem os cobiçados 'Redlines', fabricados entre 1968 e 1977. Distintivos por uma pequena linha vermelha pintada nas rodas, essas edições são o Santo Graal das miniaturas fundidas (die-cast). Modelos como o icônico Volkswagen Beach Bomb Pink de 1969 chegaram a bater mais de $150.000 em leilões, ressaltando o ditado: o lixo do passado pode ser o tesouro do futuro."
    },
    {
      title: "O Mercado de Pokémon TCG e a Grade Grading das Cartas",
      category: "Cartas Colecionáveis",
      readTime: "6 min",
      content: "No universo de Pokémon TCG, uma carta não é apenas definida por sua raridade – é definida pela sua condição (holográfica perfeita, bordas limpas e centralizadas). Agências certificadoras como a PSA transformaram a coleção infantil em uma bolsa de valores de alta octanagem. Uma carta de Charizard de Primeira Edição (Holo) pode valer nada se rasgada, ou custar uma casa se retornar com nota 10 (Gem Mint)."
    },
    {
      title: "O Renascimento dos Action Figures Retrô",
      category: "Bonecos & Toys",
      readTime: "5 min",
      content: "Desde os anos 80 com Masters of the Universe e Star Wars, os bonecos nunca saíram de circulação, mas os moldes antigos ganharam um peso diferente hoje. Colecionadores sérios buscam itens AFA Graded fechados na caixa, onde até a cor do acrílico da época muda o valor da peça. Acessórios minúsculos, que eram facilmente engolidos por aspiradores de pó nos anos 80, valem sozinhos centenas de dólares."
    },
    {
      title: "Numismática 101: A Fascinante Coleção de Moedas Incomuns",
      category: "Moedas & Relíquias",
      readTime: "3 min",
      content: "O hobby de reis, a numismática vai muito além de guardar troco. Uma moeda pode tornar-se rara não pela sua antiguidade, mas por erros e curiosidades na cunhagem. Moedas como o Penny de Cobre americano de 1943 representam acidentes industriais raros na Segunda Guerra. Cada moeda carrega literalmente a história pesada de sua nação de origem num pedaço de metal de 20 gramas."
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
