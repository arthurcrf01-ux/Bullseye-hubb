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
    text: "Analyze this item from a collector's standpoint. Provide a catchy name for the item if none is obvious. Give it a rarity score from 1 to 100, provide a brief description of why it has this rarity, and provide a real-world estimated monetary value in Brazilian Reais (BRL) or US Dollars (USD) (e.g., 'R$ 50 - R$ 100', 'U$ 20.00 - U$ 45.00'). Always make it explicitly clear in the string that it is an estimate (e.g., 'Valor Estimado: R$ 50'). IMPORTANT: The 'name', 'description', and 'estimatedValue' must be written in English. However, for the 'rarityCategory', you must strictly classify the item into exactly one of these five Portuguese categories: 'Comum', 'Incomum', 'Raro', 'Épico', 'Lendário'.",
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [imagePart, textPart] },
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "The name of the item in English.",
            },
            rarityCategory: {
              type: Type.STRING,
              description: "Must be exactly one of the Portuguese labels: Comum, Incomum, Raro, Épico, Lendário.",
            },
            rarityScore: {
              type: Type.NUMBER,
              description: "A score from 1 to 100 representing its rarity.",
            },
            description: {
              type: Type.STRING,
              description: "A short paragraph in English explaining the item's features and why it received this rarity rating.",
            },
            estimatedValue: {
              type: Type.STRING,
              description: "A real-world estimated value.",
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
    console.error("AI Analysis Failed", error);
    // Preserva o erro da chave de API não configurada para aparecer na tela
    if (error.message && error.message.includes("VITE_GEMINI_API_KEY")) {
      throw error; 
    }
    throw new Error("Falha ao analisar o item pelo Gemini. (" + (error.message || "Erro desconhecido") + ")");
  }
}
