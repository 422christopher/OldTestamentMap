
import { GoogleGenAI, Type } from "@google/genai";
import { ChapterContext } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Simple in-memory cache to store results for the current session
const contextCache: Map<string, ChapterContext> = new Map();

export async function fetchChapterContext(book: string, chapter: number): Promise<ChapterContext> {
  const cacheKey = `${book}-${chapter}`;
  
  // Check if we already have this context cached
  if (contextCache.has(cacheKey)) {
    return contextCache.get(cacheKey)!;
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
    
    // Save to cache before returning
    contextCache.set(cacheKey, data);
    
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
