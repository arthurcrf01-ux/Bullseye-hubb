import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function TermsView() {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-slate-900 border border-slate-800 rounded-2xl mb-6">
          <ShieldCheck className="w-12 h-12 text-indigo-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Termos de Uso</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Políticas de privacidade e regras de utilização do ecossistema Bullseye Collectors.
        </p>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">1</span>
            Aceitação dos Termos
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            Ao acessar e utilizar o aplicativo Bullseye Collectors, você concorda em cumprir e se vincular a estes Termos de Uso. 
            Se você não concordar com qualquer parte destes termos, não deverá utilizar nossa plataforma. 
            A Bullseye utiliza Inteligência Artificial avançada para estimar a raridade de itens colecionáveis.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">2</span>
            Análises de Inteligência Artificial
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            As avaliações, categorias de raridade (Common, Uncommon, Rare, Epic, Legendary), notas de 1 a 100 e valores estimados 
            produzidos pelo nosso aplicativo são gerados de forma preditiva por modelos de Inteligência Artificial da Google (Gemini).
            Estes dados têm caráter <strong>puramente ilustrativo, ficcional e de entretenimento</strong>.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-400 text-sm md:text-base">
            <li>As análises não substituem peritos humanos certificados em colecionismo.</li>
            <li>Valores monetários sugeridos não significam que o item possa ser comercializado por aquela quantia exata.</li>
            <li>A Bullseye Collectors não se responsabiliza por perdas, lucros cessantes ou negociações baseadas no aplicativo.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">3</span>
            Termos de Privacidade e Proteção de Dados
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            Levamos sua privacidade a sério. O uso da câmera e do envio de imagens tem o propósito estrito de processar a 
            análise do item submetido à Inteligência Artificial. Nós nos comprometemos a não utilizar seus dados para fins escusos.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-400 text-sm md:text-base">
            <li><strong>Uso de Cookies:</strong> Utilizamos arquivos de cookies e tecnologias de rastreamento no seu dispositivo para possibilitar funções básicas, melhorar sua navegação e permitir a veiculação de anúncios de forma eficiente e personalizada.</li>
            <li><strong>Informações Coletadas:</strong> Coletamos dados básicos que você fornece voluntariamente (como nome de perfil) e interações efetuadas na plataforma (como acesso e quantidade de itens salvos) exclusivamente para garantir o funcionamento do nosso ranking e das ferramentas sociais. As imagens enviadas são processadas provisoriamente para análise via IA e não são vinculadas ao reconhecimento facial ou utilizadas para monitoramento indevido.</li>
            <li><strong>Publicidade de Terceiros e Google AdSense:</strong> Para manter nossos serviços gratuitos, exibimos anúncios no aplicativo. Fornecedores de terceiros, incluindo o Google, utilizam cookies (como o cookie DART) para exibir anúncios com base no seu histórico de visitas no nosso e em outros sites da rede. Você pode ler e desativar o uso de cookies de publicidade personalizada acessando as Configurações de Anúncios do Google a qualquer momento.</li>
            <li><strong>Compartilhamento:</strong> Nós diretamente não comercializamos, alugamos ou vendemos seus dados pessoais a terceiros. A troca de dados anônimos para efeito de propaganda acontece diretamente pelas redes de anúncios oficiais das quais fazemos parte.</li>
            <li><strong>Armazenamento Seguro:</strong> Grande parte dos seus itens salvos e conversas no chat são armazenadas de forma segura e localmente no seu celular ou computador usando o banco de dados nativo do seu navegador da web.</li>
            <li><strong>Comunidades (Fórum Público):</strong> Qualquer texto ou mensagem que você enviar em salas de comunidade é público e de sua estrita responsabilidade legal.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">4</span>
            Conduta do Usuário
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            Os usuários concordam em enviar apenas imagens de itens colecionáveis e objetos relevantes. O upload de imagens contendo 
            conteúdo impróprio, ilegal, abusivo, ou que não possua autorização autoral, é terminantemente proibido.
            A plataforma reserva-se no direito de banir usuários e apagar análises que infrinjam regras de conduta.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
            <p className="text-indigo-300 text-sm italic">
              *Estes Termos de Uso são editáveis e mantidos periodicamente por nossa equipe de moderação. Última atualização em 2026.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
