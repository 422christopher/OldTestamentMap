
export interface BibleBook {
  name: string;
  chapters: number;
  baseYearBC: number;
  mapType: 'creation' | 'ancient-near-east' | 'egypt-sinai' | 'canaan' | 'israel-judah';
}

export interface ChapterRange {
  start: number;
  end: number;
  label: string;
}

export interface MapFeature {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'city' | 'region' | 'water' | 'mountain';
  description?: string;
}

export interface ChapterContext {
  year: number;
  summary: string;
  locations: MapFeature[];
}
