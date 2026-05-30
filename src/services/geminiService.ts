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
    text: "Você é um mestre curador e avaliador de renome mundial em itens colecionáveis, antiguidades e raridades, com conhecimento enciclopédico sobre mercados de leilões, card games, moedas, brinquedos antigos e memorabilia. Analise a imagem deste item com olhos de especialista. Identifique-o com a maior precisão possível (marca, modelo, edição, ano aproximado, se aplicável). Avalie fatores como estado de conservação (grading), desgaste, marcas do tempo, tiragem e demanda histórica. Dê uma pontuação de raridade de 1 a 100. Categorize-o ESTRITAMENTE em uma destas opções: 'Comum', 'Incomum', 'Raro', 'Épico', 'Lendário'. Crie uma descrição detalhada justificando sua avaliação (por que é raro/comum, detalhes percebidos na foto que aumentam ou reduzem o valor, contexto histórico). Estime o valor de mercado atual em BRL (Reais) ou USD (Dólares). TODO O SEU RETORNO DEVE SER EM PORTUGUÊS (PT-BR).",
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
          systemInstruction: "Atue como um Especialista Avaliador de Colecionáveis de alto nível. Seu objetivo é extrair o máximo de detalhes visuais da imagem para identificar o objeto, seu período histórico, fabricante (se possível) e estado de conservação. Forneça avaliações precisas, utilizando jargões de colecionadores (ex: mint condition, wear and tear, centering, toning) quando apropriado, e justifique a raridade com base em fatores de mercado tangíveis. Seja imparcial e analítico.",
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
