import { ChapterContext } from "../types";

export const GENESIS_CHAPTERS: Record<number, ChapterContext> = {
  1: {
    year: 4004,
    summary: "The creation of the heavens, the earth, and all living things.",
    locations: [],
    layoutType: "universe"
  },
  2: {
    year: 4000,
    summary: "The Garden of Eden, the creation of man and woman, and the two trees.",
    locations: [],
    layoutType: "garden-eden-creation"
  },
  3: {
    year: 4000,
    summary: "The temptation, the fall of mankind, and expulsion from the Garden of Eden.",
    locations: [],
    layoutType: "garden-eden-expulsion"
  },
  4: {
    year: 3800,
    summary: "Cain and Abel, the first murder, and the establishment of the land of Nod.",
    locations: [],
    layoutType: "garden-eden-expulsion"
  },
  5: {
    year: 3500,
    summary: "The genealogy from Adam to Noah, tracking the long-lived early generations.",
    locations: [],
    layoutType: "garden-eden-expulsion"
  },
  6: {
    year: 3000,
    summary: "The corruption of the earth and God's instruction to Noah to build the Ark.",
    locations: [],
    layoutType: "garden-eden-expulsion"
  },
  7: {
    year: 3000,
    summary: "The great Flood waters cover the entire earth; Noah and the Ark are preserved.",
    locations: [],
    layoutType: "flood"
  },
  8: {
    year: 3000,
    summary: "The floodwaters recede and the Ark rests on the mountains of Ararat.",
    locations: [],
    layoutType: "ararat"
  },
  9: {
    year: 3000,
    summary: "God's covenant with Noah, symbolized by the rainbow, and the scattering of his sons.",
    locations: [],
    layoutType: "nations"
  },
  10: {
    year: 3000,
    summary: "The Table of Nations, outlining the descendants of Shem, Ham, and Japheth across the ancient lands.",
    locations: [
      { id: "gomorrah", name: 'Gomorrah', x: 100, y: 80, type: "city" },
      { id: "sodom", name: 'Sodom', x: 130, y: 170, type: "city" },
      { id: "gaza", name: 'Gaza', x: 120, y: 290, type: "city" },
      { id: "admah", name: 'Admah', x: 105, y: 410, type: "city" },
      { id: "lasha", name: 'Lasha', x: 105, y: 530, type: "city" },
      { id: "gerar", name: 'Gerar', x: 230, y: 330, type: "city" },
      { id: "zeboim", name: 'Zeboim', x: 220, y: 450, type: "city" },
      { id: "sidon", name: 'Sidon', x: 380, y: 320, type: "city" },
      { id: "rehoboth", name: 'Rehoboth', x: 500, y: 150, type: "city" },
      { id: "nineveh", name: 'Nineveh', x: 530, y: 260, type: "city" },
      { id: "resen", name: 'Resen', x: 500, y: 380, type: "city" },
      { id: "calah", name: 'Calah', x: 530, y: 500, type: "city" },
      { id: "shinar", name: 'Shinar', x: 680, y: 410, type: "city" },
    ],
    layoutType: "genesis10",
    mapImageUrl: "/Gen10_out.png"
  },
  11: {
    year: 2200,
    summary: "The building and confusion of the Tower of Babel, and the genealogy of Shem to Abram.",
    locations: [
      { id: "gomorrah", name: 'Gomorrah', x: 100, y: 80, type: "city" },
      { id: "sodom", name: 'Sodom', x: 130, y: 170, type: "city" },
      { id: "gaza", name: 'Gaza', x: 120, y: 290, type: "city" },
      { id: "admah", name: 'Admah', x: 105, y: 410, type: "city" },
      { id: "lasha", name: 'Lasha', x: 105, y: 530, type: "city" },
      { id: "gerar", name: 'Gerar', x: 230, y: 330, type: "city" },
      { id: "zeboim", name: 'Zeboim', x: 220, y: 450, type: "city" },
      { id: "sidon", name: 'Sidon', x: 380, y: 320, type: "city" },
      { id: "rehoboth", name: 'Rehoboth', x: 500, y: 150, type: "city" },
      { id: "nineveh", name: 'Nineveh', x: 530, y: 260, type: "city" },
      { id: "resen", name: 'Resen', x: 500, y: 380, type: "city" },
      { id: "calah", name: 'Calah', x: 530, y: 500, type: "city" },
      { id: "shinar", name: 'Shinar', x: 680, y: 410, type: "city" },
    ],
    layoutType: "genesis11",
    mapImageUrl: "/genesis11.png"
  }
};
