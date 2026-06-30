import React, { useState, useEffect } from 'react';
import { MapFeature } from '../types';

interface OldTestamentMapProps {
  mapType: string;
  locations: MapFeature[];
  book: string;
  chapter: number;
  layoutType?: string;
  mapImageUrl?: string;
}

const OldTestamentMap: React.FC<OldTestamentMapProps> = ({ locations, book, chapter, layoutType, mapImageUrl }) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    setImageLoadError(false);
  }, [book, chapter, mapImageUrl]);
  
  const isGenesis10 = layoutType === 'genesis10';
  const isGenesis11 = layoutType === 'genesis11';
  const isUniverse = layoutType === 'universe';
  const isFlood = layoutType === 'flood';
  const isArarat = layoutType === 'ararat';
  const isNations = layoutType === 'nations';
  const isGarden = layoutType === 'garden-eden-creation' || layoutType === 'garden-eden-expulsion';
  const isGenesis2 = layoutType === 'garden-eden-creation';
  const isExpulsionMap = layoutType === 'garden-eden-expulsion';

  // Render "Table of Nations" view for Genesis 10 & 11
  const renderGenesis10Map = () => {
    const places = [
      { name: 'Sidon', x: 326, y: 101, labelAlign: 'left', dx: -55 },
      { name: 'Gaza', x: 313, y: 138, labelAlign: 'left', dx: -50 },
      { name: 'Gerar', x: 329, y: 143, labelAlign: 'left', dx: -52 },
      { name: 'Sodom', x: 346, y: 121, labelAlign: 'right', dx: 12 },
      { name: 'Gomorrah', x: 347, y: 143, labelAlign: 'right', dx: 12 },
      { name: 'Admah', x: 347, y: 166, labelAlign: 'right', dx: 12 },
      { name: 'Zeboim', x: 347, y: 196, labelAlign: 'right', dx: 12 },
      { name: 'Lasha', x: 339, y: 221, labelAlign: 'right', dx: 12 },
      { name: 'Rehoboth', x: 476, y: 35, labelAlign: 'left', dx: -75 },
      { name: 'Nineveh', x: 492, y: 65, labelAlign: 'right', dx: 12 },
      { name: 'Resen', x: 492, y: 80, labelAlign: 'left', dx: -52 },
      { name: 'Calah', x: 499, y: 90, labelAlign: 'right', dx: 12 },
      { name: 'Babel, in land of Shinar', x: 521, y: 135, labelAlign: 'right', dx: 12 },
      { name: 'Mesha', x: 498, y: 670, labelAlign: 'right', dx: 12 }
    ];

    const sepharX = 670;
    const sepharY = 510;
    const sepharBoxWidth = 200;
    const sepharBoxHeight = 85;
    const sepharBoxX = sepharX - sepharBoxWidth / 2;
    const sepharBoxY = sepharY + 25;

    return (
      <div className="relative w-full h-full bg-[#0b1329] overflow-hidden">
        <svg viewBox="0 0 1000 750" className="w-full h-full relative z-10">
          {/* Base Satellite Image Map */}
          <image 
            href="https://upload.wikimedia.org/wikipedia/commons/e/e0/Arabian_Peninsula_satellite_orthographic.jpg"
            x="0" 
            y="-120" 
            width="1000" 
            height="1000"
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Locations */}
          {places.map((place, i) => {
            const textWidth = place.name.length * 7.5 + 10;
            const boxX = place.labelAlign === 'left' ? place.x + place.dx - 2 : place.x + place.dx;
            const boxY = place.y - 10;

            return (
              <g key={i}>
                {/* Red circle with black border */}
                <circle 
                  cx={place.x} 
                  cy={place.y} 
                  r="6" 
                  fill="#ff0000" 
                  stroke="#000000" 
                  strokeWidth="1.5" 
                />
                {/* White label background */}
                <rect 
                  x={boxX} 
                  y={boxY} 
                  width={textWidth} 
                  height={18} 
                  fill="#ffffff" 
                  stroke="#000000" 
                  strokeWidth="0.5" 
                  rx="1"
                />
                {/* Label text */}
                <text 
                  x={boxX + 5} 
                  y={place.y + 3} 
                  fill="#000000" 
                  className="font-sans text-[11px] font-bold select-none"
                >
                  {place.name}
                </text>
              </g>
            );
          })}

          {/* Mount Sephar - Stylized Mountain Silhouette and description */}
          <g>
            {/* Red Triangle */}
            <polygon 
              points={`${sepharX},${sepharY - 35} ${sepharX - 30},${sepharY + 15} ${sepharX + 30},${sepharY + 15}`} 
              fill="#ff0000" 
              stroke="#000000"
              strokeWidth="0.5"
            />
            {/* White box with black border */}
            <rect 
              x={sepharBoxX} 
              y={sepharBoxY} 
              width={sepharBoxWidth} 
              height={sepharBoxHeight} 
              fill="#ffffff" 
              stroke="#000000" 
              strokeWidth="0.5" 
              rx="2"
            />
            {/* Multi-line Text */}
            <text x={sepharX} y={sepharBoxY + 18} textAnchor="middle" fill="#000000" className="font-sans text-[14px] font-bold select-none">
              Mount Sephar
            </text>
            <text x={sepharX} y={sepharBoxY + 36} textAnchor="middle" fill="#000000" className="font-sans text-[11px] font-semibold select-none">
              Probably the same mountain
            </text>
            <text x={sepharX} y={sepharBoxY + 52} textAnchor="middle" fill="#000000" className="font-sans text-[11px] font-semibold select-none">
              Nephi climbed before
            </text>
            <text x={sepharX} y={sepharBoxY + 68} textAnchor="middle" fill="#000000" className="font-sans text-[11px] font-semibold select-none">
              building a boat
            </text>
          </g>
        </svg>
        
        {/* Semi-transparent Overlay for Title */}
        <div className="absolute top-4 left-4 z-20 bg-stone-900/80 backdrop-blur-sm px-4 py-2 rounded-md border border-stone-700">
          <h1 className="text-amber-100 font-serif font-black text-lg uppercase tracking-wider">
            {chapter === 11 ? "Genesis 11: Tower of Babel" : "Genesis 10: Table of Nations"}
          </h1>
        </div>
      </div>
    );
  };

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

  // Render "The Flood" view for Genesis 7
  const renderFloodMap = () => (
    <div className="relative w-full h-full bg-[#1e3a8a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_100%)] animate-pulse" />
      <svg viewBox="0 0 1500 1000" className="w-full h-full relative z-10">
        <g transform="translate(750, 500)">
          <circle cx="0" cy="0" r="8" fill="#fff" className="shadow-lg" />
          <text x="0" y="40" textAnchor="middle" className="fill-blue-50 font-serif font-black text-xl uppercase tracking-widest drop-shadow-md">
            Noah and the Ark
          </text>
          <g transform="translate(0, -75)">
             <path d="M-60,0 L60,0 L50,35 L-50,35 Z" fill="#4a3728" />
             <rect x="-35" y="-20" width="70" height="20" fill="#5d4037" />
             <rect x="-20" y="-35" width="40" height="15" fill="#795548" />
          </g>
        </g>
        <g opacity="0.1">
          <path d="M0,200 Q375,150 750,200 T1500,200" fill="none" stroke="#fff" strokeWidth="2" className="animate-[pulse_4s_infinite]" />
          <path d="M0,500 Q375,550 750,500 T1500,500" fill="none" stroke="#fff" strokeWidth="2" className="animate-[pulse_6s_infinite]" />
          <path d="M0,800 Q375,750 750,800 T1500,800" fill="none" stroke="#fff" strokeWidth="2" className="animate-[pulse_5s_infinite]" />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-blue-200/20 font-serif font-black text-[200px] uppercase tracking-[0.2em] select-none">
          THE FLOOD
        </h1>
      </div>
    </div>
  );

  // Render "The Ararat" view for Genesis 8
  const renderAraratMap = () => (
    <div className="relative w-full h-full bg-[#fef3c7] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.1)_0%,transparent_100%)]" />
      <svg viewBox="0 0 1500 1000" className="w-full h-full relative z-10">
        <g transform="translate(750, 500)">
          {/* Mountain Silhouette */}
          <path d="M -200 150 L 0 -150 L 200 150 Z" fill="#d1d5db" opacity="0.8" />
          <path d="M -150 150 L 50 -100 L 250 150 Z" fill="#9ca3af" opacity="0.6" />
          
          <circle cx="0" cy="0" r="8" fill="#000" />
          <text x="0" y="55" textAnchor="middle" className="fill-stone-800 font-serif font-black text-xl uppercase tracking-widest drop-shadow-sm">
            Noah and the Ark
          </text>
          <text x="0" y="85" textAnchor="middle" className="fill-stone-500 font-serif italic text-sm uppercase tracking-widest">
            Mount Ararat
          </text>
          
          <g transform="translate(0, -75)">
             {/* Stylized Ark Icon */}
             <path d="M-60,0 L60,0 L50,35 L-50,35 Z" fill="#4a3728" />
             <rect x="-35" y="-20" width="70" height="20" fill="#5d4037" />
             <rect x="-20" y="-35" width="40" height="15" fill="#795548" />
          </g>
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-stone-800/5 font-serif font-black text-[160px] uppercase tracking-[0.2em] select-none">
          NEW WORLD
        </h1>
      </div>
    </div>
  );

  // Render "The Nations" view for Genesis 9
  const renderNationsMap = () => (
    <div className="relative w-full h-full bg-[#dcfce7] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05)_0%,transparent_100%)]" />
      <svg viewBox="0 0 1500 1000" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#ef4444" />
             <stop offset="16.6%" stopColor="#f97316" />
             <stop offset="33.3%" stopColor="#facc15" />
             <stop offset="50%" stopColor="#22c55e" />
             <stop offset="66.6%" stopColor="#3b82f6" />
             <stop offset="83.3%" stopColor="#6366f1" />
             <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Rainbow - The Covenant Arc */}
        <path d="M 100 800 Q 750 -300 1400 800" fill="none" stroke="url(#rainbowGrad)" strokeWidth="40" strokeOpacity="0.3" strokeLinecap="round" />

        <g transform="translate(750, 500)">
          {/* Noah and his Descendants - Centered */}
          <g className="animate-[pulse_10s_infinite]">
            <circle cx="0" cy="0" r="10" fill="#000" />
            <circle cx="-15" cy="15" r="5" fill="#000" opacity="0.6" />
            <circle cx="15" cy="15" r="5" fill="#000" opacity="0.6" />
          </g>
          
          <text x="0" y="60" textAnchor="middle" className="fill-stone-900 font-serif font-black text-2xl uppercase tracking-[0.2em] drop-shadow-sm">
            Noah and his Descendants
          </text>
          <text x="0" y="90" textAnchor="middle" className="fill-stone-500 font-serif italic text-sm uppercase tracking-widest">
            The Covenant Rainbow
          </text>
          
          <g transform="translate(0, -90)">
             {/* Stylized Home/Settlement Icon */}
             <path d="M -30 40 L 0 0 L 30 40 Z" fill="#92400e" />
             <rect x="-20" y="40" width="40" height="30" fill="#b45309" />
             <rect x="-5" y="55" width="10" height="15" fill="#451a03" />
          </g>
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-stone-800/5 font-serif font-black text-[140px] uppercase tracking-[0.3em] select-none">
          COVENANT
        </h1>
      </div>
    </div>
  );

  // Render stylized "Garden of Eden" map for Genesis 2-6
  const renderCreationMap = () => (
    <div className="relative w-full h-full bg-[#ecfccb] overflow-hidden">
      <svg viewBox="0 0 1500 1000" className="w-full h-full">
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
          <radialGradient id="landRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d9f99d" />
            <stop offset="100%" stopColor="#ecfccb" />
          </radialGradient>
        </defs>
        
        <rect x="-1000" y="-1000" width="5000" height="3000" fill="#ecfccb" />
        <circle cx="650" cy="500" r="1200" fill="url(#landRadial)" />

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
            {/* Nod Label - Genesis 4, 5, 6 */}
            {(chapter >= 4 && chapter <= 6) && (
              <g transform="translate(1200, 450)">
                <text x="0" y="0" textAnchor="middle" className="fill-emerald-900/40 font-serif font-black text-7xl uppercase tracking-[0.3em] pointer-events-none">Nod</text>
                <text x="0" y="60" textAnchor="middle" className="fill-stone-500 font-serif italic text-2xl tracking-widest pointer-events-none opacity-60">City of Enoch</text>
              </g>
            )}

            {/* The Cherubim */}
            <g transform="translate(800, 430)" className="animate-pulse">
              <text x="0" y="0" textAnchor="middle" style={{ fontSize: '48px' }} className="select-none text-4xl">👼</text>
              <text x="0" y="40" textAnchor="middle" className="fill-amber-900 font-serif font-black text-[10px] uppercase tracking-[0.2em]">Cherubim</text>
            </g>

            {/* The Flaming Sword */}
            <g transform="translate(800, 560)">
              <path d="M -5 -40 L 5 -40 L 3 10 L -3 10 Z" fill="#fff" filter="url(#flameGlow)" className="animate-[pulse_1.5s_infinite]" />
              <path d="M -10 10 L 10 10" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
              <path d="M 0 10 L 0 25" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
              <text x="0" y="45" textAnchor="middle" className="fill-orange-700 font-serif font-bold text-[10px] uppercase tracking-widest">Flaming Sword</text>
            </g>

            {/* Inhabitants - West */}
            <g transform="translate(180, 500)">
              <circle cx="0" cy="0" r="6" fill="#000" />
              <text x="0" y="30" textAnchor="middle" className="fill-stone-950 font-serif font-black text-sm uppercase tracking-wider">
                {chapter === 6 ? "Noah and the Ark" : chapter === 5 ? "Descendants of Adam and Eve" : "Adam and Eve"}
              </text>
              {chapter === 6 && (
                <g transform="translate(0, -65)">
                   {/* Stylized Ark Icon */}
                   <path d="M-45,0 L45,0 L35,25 L-35,25 Z" fill="#5d4037" />
                   <rect x="-25" y="-15" width="50" height="15" fill="#795548" />
                   <rect x="-15" y="-25" width="30" height="10" fill="#a1887f" />
                </g>
              )}
            </g>

            {/* Inhabitants - East (Nod Area) */}
            {(chapter >= 4 && chapter <= 6) && (
              <g transform="translate(1200, 550)">
                <circle cx="0" cy="0" r="6" fill="#000" />
                <text x="0" y="30" textAnchor="middle" className="fill-stone-950 font-serif font-black text-sm uppercase tracking-wider">
                  {chapter >= 5 ? "Descendants of Cain" : "Cain"}
                </text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );

  const renderCustomImageMap = () => {
    const isGen10or11 = isGenesis10 || isGenesis11;
    return (
      <div className="relative w-full h-full bg-[#0b1329] overflow-hidden flex items-center justify-center">
        <img 
          src={mapImageUrl} 
          alt={`${book} ${chapter} Map`}
          className={isGen10or11
            ? "absolute top-0 left-1/2 -translate-x-1/2 h-[140%] w-auto max-w-none select-none"
            : "h-full w-auto max-w-none select-none"}
          onError={() => setImageLoadError(true)}
        />
        {/* Semi-transparent Overlay for Title */}
        {!isGen10or11 && (
          <div className="absolute top-4 left-4 z-20 bg-stone-900/80 backdrop-blur-sm px-4 py-2 rounded-md border border-stone-700">
            <h1 className="text-amber-100 font-serif font-black text-lg uppercase tracking-wider">
              {book} {chapter} Map
            </h1>
          </div>
        )}
      </div>
    );
  };

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
        {(mapImageUrl && !imageLoadError) ? renderCustomImageMap() : (isUniverse ? renderUniverse() : isFlood ? renderFloodMap() : isArarat ? renderAraratMap() : isNations ? renderNationsMap() : (isGenesis10 || isGenesis11) ? renderGenesis10Map() : isGarden ? renderCreationMap() : renderHistoricalMap())}
      </div>
    </div>
  );
};

export default OldTestamentMap;