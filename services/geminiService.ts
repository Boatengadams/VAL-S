
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRomanticPoem = async (toName: string, fromName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short (2-4 lines), magnetic, and smooth romantic poem with "rizz" and charisma. 
      Recipient: ${toName || 'my favorite person'}
      Sender: ${fromName || 'your admirer'}
      Goal: Make them melt with a mix of sweet and charismatic charm. Use smooth wordplay. No hashtags.`,
      config: {
        systemInstruction: "You are a professional romantic storyteller who writes with modern charisma (rizz) and depth. You avoid clichés and write lines that are smooth, punchy, and deeply heartfelt. Your goal is to make the reader blush.",
        temperature: 0.95,
      },
    });

    return response.text || `To my dear ${toName},\nYou're the only 10 I see in a room full of people.\nWith all my love, ${fromName}.`;
  } catch (error) {
    console.error("Failed to generate poem:", error);
    return `To my dear ${toName},\nI don't need a map, because I'm already lost in your eyes.\nWith all my love, ${fromName}.`;
  }
};
