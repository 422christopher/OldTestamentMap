
import { GoogleGenAI, Type } from "@google/genai";
import { ChapterContext } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Simple localStorage-backed cache to store results across sessions
const HARDCODED_CHAPTERS: Record<string, ChapterContext> = {
  "Genesis-1": {
    year: 4004,
    summary: "The creation of the heavens, the earth, and all living things.",
    locations: []
  },
  "Genesis-2": {
    year: 4000,
    summary: "The Garden of Eden, the creation of man and woman, and the two trees.",
    locations: []
  },
  "Genesis-3": {
    year: 4000,
    summary: "The temptation, the fall of mankind, and expulsion from the Garden of Eden.",
    locations: []
  },
  "Genesis-4": {
    year: 3800,
    summary: "Cain and Abel, the first murder, and the establishment of the land of Nod.",
    locations: []
  },
  "Genesis-5": {
    year: 3500,
    summary: "The genealogy from Adam to Noah, tracking the long-lived early generations.",
    locations: []
  },
  "Genesis-6": {
    year: 3000,
    summary: "The corruption of the earth and God's instruction to Noah to build the Ark.",
    locations: []
  },
  "Genesis-7": {
    year: 3000,
    summary: "The great Flood waters cover the entire earth; Noah and the Ark are preserved.",
    locations: []
  },
  "Genesis-8": {
    year: 3000,
    summary: "The floodwaters recede and the Ark rests on the mountains of Ararat.",
    locations: []
  },
  "Genesis-9": {
    year: 3000,
    summary: "God's covenant with Noah, symbolized by the rainbow, and the scattering of his sons.",
    locations: []
  },
  "Genesis-10": {
    year: 3000,
    summary: "The Table of Nations, outlining the descendants of Shem, Ham, and Japheth across the ancient lands.",
    locations: []
  },
  "Genesis-11": {
    year: 2200,
    summary: "The building and confusion of the Tower of Babel, and the genealogy of Shem to Abram.",
    locations: []
  }
};

export async function fetchChapterContext(book: string, chapter: number): Promise<ChapterContext> {
  const cacheKey = `scripture-atlas-cache-${book}-${chapter}`;
  const hardcodedKey = `${book}-${chapter}`;

  // Immediate fast-path for customized maps to load with zero delay
  if (HARDCODED_CHAPTERS[hardcodedKey]) {
    return HARDCODED_CHAPTERS[hardcodedKey];
  }
  
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
