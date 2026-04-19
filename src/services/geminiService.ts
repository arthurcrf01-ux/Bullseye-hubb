import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    // Tenta pegar a chave do Vite (Netlify) ou do process.env (AI Studio)
    const key = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || 
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
    text: "Analyze this item from a collector's standpoint. Provide a catchy name for the item if none is obvious, classify its rarity into one of the specified categories ('Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'), give it a rarity score from 1 to 100, provide a brief description of why it has this rarity, and estimate a fictional aesthetic value (e.g., '1,000 Credits', 'Priceless', '50 Coins').",
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "The name of the item.",
            },
            rarityCategory: {
              type: Type.STRING,
              description: "Must be exactly one of: Common, Uncommon, Rare, Epic, Legendary.",
            },
            rarityScore: {
              type: Type.NUMBER,
              description: "A score from 1 to 100 representing its rarity.",
            },
            description: {
              type: Type.STRING,
              description: "A short paragraph explaining the item's features and why it received this rarity rating.",
            },
            estimatedValue: {
              type: Type.STRING,
              description: "A fictional estimated value (e.g., '500 Bullseye Credits').",
            },
          },
          required: ["name", "rarityCategory", "rarityScore", "description", "estimatedValue"],
        },
      },
    });

    const jsonStr = response.text.trim();
    if (!jsonStr) throw new Error("No response from AI");
    
    const result = JSON.parse(jsonStr);
    
    // Ensure the category is valid, fallback to Common
    const validCategories = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
    if (!validCategories.includes(result.rarityCategory)) {
        result.rarityCategory = 'Uncommon';
    }

    return result as {
       name: string;
       rarityCategory: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
       rarityScore: number;
       description: string;
       estimatedValue: string;
    };
  } catch (error) {
    console.error("AI Analysis Failed", error);
    throw new Error("Falha ao analisar o item. Tente novamente.");
  }
}
