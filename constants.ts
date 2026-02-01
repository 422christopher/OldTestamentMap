
import { BibleBook } from './types';

export const OLD_TESTAMENT_BOOKS: BibleBook[] = [
  { name: 'Genesis', chapters: 50, baseYearBC: 4004, mapType: 'creation' },
  { name: 'Exodus', chapters: 40, baseYearBC: 1446, mapType: 'egypt-sinai' },
  { name: 'Leviticus', chapters: 27, baseYearBC: 1445, mapType: 'egypt-sinai' },
  { name: 'Numbers', chapters: 36, baseYearBC: 1444, mapType: 'egypt-sinai' },
  { name: 'Deuteronomy', chapters: 34, baseYearBC: 1406, mapType: 'egypt-sinai' },
  { name: 'Joshua', chapters: 24, baseYearBC: 1400, mapType: 'canaan' },
  { name: 'Judges', chapters: 21, baseYearBC: 1380, mapType: 'canaan' },
  { name: 'Ruth', chapters: 4, baseYearBC: 1100, mapType: 'canaan' },
  { name: '1 Samuel', chapters: 31, baseYearBC: 1050, mapType: 'israel-judah' },
  { name: '2 Samuel', chapters: 24, baseYearBC: 1010, mapType: 'israel-judah' },
  { name: '1 Kings', chapters: 22, baseYearBC: 970, mapType: 'israel-judah' },
  { name: '2 Kings', chapters: 25, baseYearBC: 850, mapType: 'ancient-near-east' },
  { name: '1 Chronicles', chapters: 29, baseYearBC: 1010, mapType: 'israel-judah' },
  { name: '2 Chronicles', chapters: 36, baseYearBC: 970, mapType: 'ancient-near-east' },
  { name: 'Ezra', chapters: 10, baseYearBC: 538, mapType: 'ancient-near-east' },
  { name: 'Nehemiah', chapters: 13, baseYearBC: 445, mapType: 'ancient-near-east' },
  { name: 'Esther', chapters: 10, baseYearBC: 483, mapType: 'ancient-near-east' },
  { name: 'Psalms', chapters: 150, baseYearBC: 1000, mapType: 'israel-judah' },
  { name: 'Isaiah', chapters: 66, baseYearBC: 740, mapType: 'ancient-near-east' },
  { name: 'Jeremiah', chapters: 52, baseYearBC: 627, mapType: 'ancient-near-east' },
  { name: 'Daniel', chapters: 12, baseYearBC: 605, mapType: 'ancient-near-east' },
];

export const TIMELINE_MIN_YEAR = 4000;
export const TIMELINE_MAX_YEAR = 400;
