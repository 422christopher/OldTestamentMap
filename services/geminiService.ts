
import { GoogleGenAI, Type } from "@google/genai";
import { ChapterContext } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Simple localStorage-backed cache to store results across sessions
export async function fetchChapterContext(book: string, chapter: number): Promise<ChapterContext> {
  const cacheKey = `scripture-atlas-cache-${book}-${chapter}`;
  
  // Check if we already have this context cached in localStorage
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    try {
      return JSON.parse(cachedData) as ChapterContext;
    } catch (error) {
      console.error("Error parsing cached context:", error);
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide geographical context and approximate year BC for ${book} Chapter ${chapter}. 
      If it's Genesis 1, focus on the creation of the heavens and the earth (universe).
      If it's Genesis 2-3, focus on the Garden of Eden.
      Otherwise, identify key cities or regions mentioned in the text.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            year: { type: Type.INTEGER, description: "Estimated year BC" },
            summary: { type: Type.STRING, description: "One sentence summary of the chapter geography" },
            locations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  x: { type: Type.NUMBER, description: "Normalized coordinate 0-100" },
                  y: { type: Type.NUMBER, description: "Normalized coordinate 0-100" },
                  type: { type: Type.STRING, description: "city, water, mountain, region" },
                  description: { type: Type.STRING }
                },
                required: ["id", "name", "x", "y", "type"]
              }
            }
          },
          required: ["year", "summary", "locations"]
        }
      }
    });

    const data = JSON.parse(response.text) as ChapterContext;
    
    // Save to localStorage before returning
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (e) {
      console.warn("Could not save to localStorage (possibly quota exceeded):", e);
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching context:", error);
    return {
      year: 4000,
      summary: "Chapter context unavailable.",
      locations: []
    };
  }
}
