import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    // Tenta pegar a chave do Vite (Netlify) ou do process.env (AI Studio)
    const key = ((import.meta as any).env?.VITE_GEMINI_API_KEY) || 
                (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined);
    
    if (!key) {
      throw new Error("Chave da API do Gemini não encontrada na Netlify. Certifique-se de configurar a variável VITE_GEMINI_API_KEY.");
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

export async function analyzeItemRarity(base64Image: string, expectedMimeType: string) {
  const ai = getAIClient();

  // Strip the prefix if it exists (e.g. data:image/png;base64,)
  const base64Data = base64Image.split(',')[1] || base64Image;

  const imagePart = {
    inlineData: {
      mimeType: expectedMimeType,
      data: base64Data,
    },
  };

  const textPart = {
    text: "Você é um avaliador experiente, entusiasta e direto, especializado em colecionáveis, com foco especial em miniaturas, figurinhas, álbuns e moedas. Analise a foto de forma detalhada e identifique o item com precisão. DIRETRIZES DE VALOR E TOM: 1) Seja extremamente realista com o preço atual de mercado brasileiro. 2) Não invente preços altos para itens comuns (ex: pacotes de figurinhas atuais de banca valem apenas poucos reais, itens de produção em massa recentes não têm prêmio de raridade). 3) Se for um item comum, dê o valor comum comercial. 4) Seja limpo, direto e imparcial, justificando os fatos baseados na demanda real, estado de conservação e raridade. Dê uma pontuação de raridade realista de 1 a 100, e categorize em: 'Comum', 'Incomum', 'Raro', 'Épico', 'Lendário'. RETORNO OBRIGATORIAMENTE EM PT-BR.",
  };

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [imagePart, textPart] },
        config: {
          maxOutputTokens: 2048,
          temperature: 0.1,
          systemInstruction: "Aja como um verdadeiro entusiasta e avaliador maduro do meio colecionável. Avalie o item da imagem de forma simples, direta e realista. Especialidade: moedas, figurinhas/álbuns e miniaturas. Regra de Ouro: NUNCA inflacione preços. Pacotinhos comuns ou itens de produção em massa atual valem preço de tabela. Forneça o valor de forma realista em mercado brasileiro (Reais). Evite jargões excessivos se não precisarem ser usados, mas demonstre profundo conhecimento. Seja direto ao ponto.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "O nome exato ou mais provável do item (ex: Charizard 1ª Edição Base Set, Moeda de 50 Centavos 1998 com defeito, etc).",
              },
              rarityCategory: {
                type: Type.STRING,
                description: "Deve ser OBRIGATORIAMENTE uma destas: Comum, Incomum, Raro, Épico, Lendário.",
              },
              rarityScore: {
                type: Type.NUMBER,
                description: "Uma pontuação de raridade e desejo de mercado, variando de 1 a 100.",
              },
              description: {
                type: Type.STRING,
                description: "Uma análise detalhada das características visuais, estado de conservação e contexto histórico que justificam a avaliação e o valor estimado.",
              },
              estimatedValue: {
                type: Type.STRING,
                description: "Valor estimado de mercado (ex: 'R$ 150,00 - R$ 300,00' ou 'U$ 2.000,00+').",
              },
            },
            required: ["name", "rarityCategory", "rarityScore", "description", "estimatedValue"],
          },
        },
      });

      const jsonStr = response.text.trim();
      if (!jsonStr) throw new Error("No response from AI");
      
      const result = JSON.parse(jsonStr);
      
      // Ensure the category is valid, fallback to Comum
      const validCategories = ['Comum', 'Incomum', 'Raro', 'Épico', 'Lendário'];
      if (!validCategories.includes(result.rarityCategory)) {
          result.rarityCategory = 'Incomum';
      }

      return result as {
         name: string;
         rarityCategory: 'Comum' | 'Incomum' | 'Raro' | 'Épico' | 'Lendário';
         rarityScore: number;
         description: string;
         estimatedValue: string;
      };
    } catch (error: any) {
      console.error(`AI Analysis Failed (Attempt ${attempts + 1}/${maxAttempts})`, error);
      attempts++;
      
      // If it's a known non-retryable error like API key missing, break immediately
      if (error.message && error.message.includes("VITE_GEMINI_API_KEY")) {
        throw error; 
      }
      
      // Delay before retry if we have attempts left
      if (attempts < maxAttempts) {
         await new Promise(resolve => setTimeout(resolve, 3000 * attempts)); // wait 3s, then 6s
         continue;
      }
      
      let friendlyMessage = "Erro desconhecido ao contatar a IA.";
      if (error.message) {
        if (error.message.includes("503") || error.message.includes("high demand") || error.message.includes("UNAVAILABLE")) {
          friendlyMessage = "Nossos servidores de IA continuam com alta demanda no momento. Por favor, tente analisar novamente mais tarde.";
        } else if (error.message.includes("429") || error.message.includes("quota")) {
          friendlyMessage = "Limite de análises estourado e tentamos reconectar mas ainda está lotado. Por favor, aguarde alguns instantes (talvez 1 minuto) antes de enviar uma nova foto.";
        } else {
          try {
            const parsed = JSON.parse(error.message);
            if (parsed.error && parsed.error.message) {
              friendlyMessage = parsed.error.message;
            } else {
              friendlyMessage = error.message;
            }
          } catch(e) {
               friendlyMessage = error.message;
          }
        }
      }
      
      throw new Error("Falha na análise: " + friendlyMessage);
    }
  }
}
