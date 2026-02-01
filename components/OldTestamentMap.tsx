
import React from 'react';
import { MapFeature } from '../types';

interface OldTestamentMapProps {
  mapType: string;
  locations: MapFeature[];
  book: string;
  chapter: number;
}

const OldTestamentMap: React.FC<OldTestamentMapProps> = ({ locations, book, chapter }) => {
  
  const isUniverse = book === 'Genesis' && chapter === 1;
  const isGarden = book === 'Genesis' && (chapter === 2 || chapter === 3 || chapter === 4);
  const isGenesis2 = book === 'Genesis' && chapter === 2;
  const isExpulsionMap = book === 'Genesis' && (chapter === 3 || chapter === 4);

  // Render high-quality "Universe" view for Genesis 1
  const renderUniverse = () => (
    <div className="relative w-full h-full bg-[#020617] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=2048" 
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        alt=""
      />
      <img 
        src="https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=2048" 
        alt="The Creation" 
        className="absolute inset-0 w-full h-full object-cover opacity-90 animate-[pulse_25s_infinite_alternate] scale-110"
      />
      <img 
        src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2048" 
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-color-dodge animate-[pulse_18s_infinite_alternate-reverse] scale-125"
        alt=""
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05)_0%,transparent_70%)] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)]" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1 className="text-[#fef3c7] font-serif font-medium text-7xl uppercase tracking-[0.25em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] opacity-95">
          The Creation
        </h1>
      </div>
      <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none z-10">
        <p className="text-amber-100/30 font-serif text-[10px] uppercase tracking-[0.8em] animate-pulse">
          In the Beginning
        </p>
      </div>
    </div>
  );

  // Render stylized "Garden of Eden" map for Genesis 2-4
  const renderCreationMap = () => (
    <div className="relative w-full h-full bg-[#ecfccb] overflow-hidden">
      {/* Zoomed out by using default preserveAspectRatio (meet) to show the whole map */}
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feFlood floodColor="#f97316" result="color" />
            <feComposite in="color" in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Full frame background fill remains large to ensure edge coverage */}
        <rect x="-1000" y="-1000" width="3000" height="3000" fill="#ecfccb" />
        <circle cx="500" cy="500" r="1200" fill="url(#landRadial)" />
        <radialGradient id="landRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d9f99d" />
          <stop offset="100%" stopColor="#ecfccb" />
        </radialGradient>

        {/* Rivers */}
        <g fill="none" stroke="#60a5fa" strokeLinecap="round">
          <path d="M 520 450 Q 300 350, 0 0" strokeWidth="14" />
          <path d="M 520 550 Q 300 650, 0 1000" strokeWidth="14" />
          <path d="M 780 550 Q 900 650, 1000 850" strokeWidth="14" />
          <path d="M 780 450 Q 900 350, 1000 150" strokeWidth="14" />
        </g>

        {/* Region Labels */}
        <text x="180" y="220" textAnchor="middle" className="fill-emerald-900/40 font-serif font-black text-7xl uppercase tracking-[0.3em] pointer-events-none">Havilah</text>
        <text x="180" y="780" textAnchor="middle" className="fill-emerald-900/40 font-serif font-black text-7xl uppercase tracking-[0.3em] pointer-events-none">Ethiopia</text>
        <text x="650" y="880" textAnchor="middle" className="fill-emerald-900/40 font-serif font-black text-7xl uppercase tracking-[0.3em] pointer-events-none">Assyria</text>

        {/* River Labels */}
        <text x="420" y="360" transform="rotate(41, 420, 360)" className="fill-blue-600 font-serif italic text-4xl font-black tracking-[0.1em] pointer-events-none">Pison</text>
        <text x="420" y="680" transform="rotate(-41, 420, 680)" className="fill-blue-600 font-serif italic text-4xl font-black tracking-[0.1em] pointer-events-none">Gihon</text>
        <text x="840" y="580" transform="rotate(38, 840, 580)" className="fill-blue-600 font-serif italic text-4xl font-black tracking-[0.1em] pointer-events-none">Hiddekel</text>
        <text x="840" y="300" transform="rotate(-53, 840, 300)" className="fill-blue-600 font-serif italic text-4xl font-black tracking-[0.1em] pointer-events-none">Euphrates</text>

        {/* Garden Center */}
        <circle cx="650" cy="500" r="120" fill="#bef264" opacity="0.6" filter="url(#glow)" />
        <text x="650" y="470" textAnchor="middle" className="fill-stone-800 font-serif font-bold text-2xl tracking-widest pointer-events-none">
          <tspan x="650" dy="0">GARDEN OF</tspan>
          <tspan x="650" dy="45" className="text-4xl">EDEN</tspan>
          <tspan x="650" dy="35" className="text-2xl fill-stone-500 font-sans tracking-normal font-medium italic opacity-70">Modern Day Missouri</tspan>
        </text>

        {isGenesis2 && (
          <g transform="translate(650, 565)">
            <circle cx="0" cy="0" r="6" fill="#000" />
            <text x="0" y="25" textAnchor="middle" className="fill-stone-950 font-serif font-black text-sm uppercase tracking-wider">Adam and Eve</text>
          </g>
        )}

        {isExpulsionMap && (
          <g>
            {/* Nod Label - Restored for Genesis 3 and 4 as part of undo */}
            <text x="1300" y="350" textAnchor="middle" className="fill-emerald-900/40 font-serif font-black text-7xl uppercase tracking-[0.3em] pointer-events-none">Nod</text>

            {/* The Cherubim */}
            <g transform="translate(800, 430)" className="animate-pulse">
              <text x="0" y="0" textAnchor="middle" style={{ fontSize: '48px' }} className="select-none">👼</text>
              <text x="0" y="40" textAnchor="middle" className="fill-amber-900 font-serif font-black text-[10px] uppercase tracking-[0.2em]">Cherubim</text>
            </g>

            {/* The Flaming Sword */}
            <g transform="translate(800, 560)">
              <path d="M -5 -40 L 5 -40 L 3 10 L -3 10 Z" fill="#fff" filter="url(#flameGlow)" className="animate-[pulse_1.5s_infinite]" />
              <path d="M -10 10 L 10 10" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
              <path d="M 0 10 L 0 25" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
              <text x="0" y="45" textAnchor="middle" className="fill-orange-700 font-serif font-bold text-[10px] uppercase tracking-widest">Flaming Sword</text>
            </g>

            {/* Adam and Eve - West */}
            <g transform="translate(180, 500)">
              <circle cx="0" cy="0" r="6" fill="#000" />
              <text x="0" y="30" textAnchor="middle" className="fill-stone-950 font-serif font-black text-sm uppercase tracking-wider">Adam and Eve</text>
            </g>

            {/* Cain - East (Nod Area) - Only in Genesis 4 */}
            {chapter === 4 && (
              <g transform="translate(880, 550)">
                <circle cx="0" cy="0" r="6" fill="#000" />
                <text x="0" y="30" textAnchor="middle" className="fill-stone-950 font-serif font-black text-sm uppercase tracking-wider">Cain</text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );

  const renderHistoricalMap = () => (
    <svg viewBox="0 0 1000 600" className="w-full h-full bg-[#fdf6e3]">
      <path d="M0 200 Q 150 150, 200 0 L 0 0 Z" fill="#93c5fd" />
      <path d="M300 600 Q 320 500, 350 450 T 400 400" stroke="#93c5fd" strokeWidth="40" fill="none" />
      <path d="M800 600 Q 850 500, 950 450" stroke="#93c5fd" strokeWidth="40" fill="none" />
      <text x="50" y="80" className="fill-stone-400 font-bold text-xs uppercase tracking-widest">Great Sea</text>
      {locations.map((loc) => (
        <g key={loc.id} className="cursor-pointer group">
          <circle cx={loc.x * 10} cy={loc.y * 6} r="6" className="fill-amber-600 group-hover:fill-amber-400 transition-colors" />
          <text x={loc.x * 10 + 10} y={loc.y * 6 + 4} className="fill-stone-700 font-bold text-[12px]">{loc.name}</text>
        </g>
      ))}
    </svg>
  );

  return (
    <div className="relative w-full h-full overflow-hidden bg-stone-200">
      <div className="absolute inset-0 transition-opacity duration-1000">
        {isUniverse ? renderUniverse() : isGarden ? renderCreationMap() : renderHistoricalMap()}
      </div>
    </div>
  );
};

export default OldTestamentMap;
