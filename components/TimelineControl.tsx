
import React from 'react';

interface TimelineControlProps {
  currentYear: number;
}

const TimelineControl: React.FC<TimelineControlProps> = ({ currentYear }) => {
  /**
   * Timeline Mapping:
   * 0% - 15%: Creation -> Gap (Dashed Zone)
   * 15%: Start of continuous history (2000 BC / Abraham)
   * 15% - 100%: 2000 BC -> 400 BC (Return from Exile)
   */
  
  let progress = 0;
  let isCreation = false;

  // If the current year is essentially "pre-history" or explicitly Genesis 1-11 territory
  if (currentYear >= 4000) {
    progress = 0; // Exactly at the start for Creation
    isCreation = true;
  } else if (currentYear > 2000) {
    // Somewhere in the dashed gap (Genesis 2-11)
    progress = 7.5;
  } else {
    // Linear scale for historical period: 2000 BC to 400 BC (1600 year span)
    const historicalProgress = (2000 - currentYear) / 1600;
    progress = 15 + (historicalProgress * 85);
  }

  return (
    <div className="w-full px-8 py-6 bg-white/80 backdrop-blur-md border-t border-stone-200">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Timeline Container */}
        <div className="w-full h-8 relative flex items-center mb-2">
          
          {/* THE TRACK */}
          <div className="absolute w-full h-1.5 flex items-center">
            {/* Dashed Section (0-15%) */}
            <div className="w-[15%] h-full relative overflow-hidden">
               <div className="absolute inset-0 border-b-4 border-dashed border-stone-300 -top-1"></div>
            </div>
            {/* Solid Section (15-100%) */}
            <div className="flex-1 h-full bg-stone-200 rounded-r-full"></div>
          </div>

          {/* PROGRESS FILL */}
          <div className="absolute h-1.5 flex items-center pointer-events-none z-10 overflow-hidden" style={{ width: `${progress}%` }}>
             <div className="w-full h-full bg-amber-600 rounded-full shadow-[0_0_10px_rgba(217,119,6,0.4)] transition-all duration-1000 ease-in-out"></div>
          </div>

          {/* GAP MARKER */}
          <div className="absolute left-[15%] h-4 w-0.5 bg-stone-400 z-20"></div>

          {/* INDICATOR DOT */}
          <div 
            className="absolute z-30 transition-all duration-1000 ease-in-out flex flex-col items-center"
            style={{ left: `${progress}%` }}
          >
            <div className="w-4 h-4 bg-amber-600 rounded-full border-2 border-white shadow-md"></div>
          </div>
        </div>

        {/* LABELS ROW - Structured to have static dates closer to the line and above the active highlight */}
        <div className="flex w-full text-[10px] font-black tracking-widest text-stone-400 uppercase relative h-14">
          
          {/* STATIC MARKERS - Closer to the line (top-0) */}
          <div className={`absolute left-0 top-0 transition-opacity duration-300 ${isCreation ? 'opacity-0' : 'opacity-100'}`}>
            Creation
          </div>
          
          <div className="absolute left-[15%] -translate-x-1/2 text-stone-500 top-0">
            2000 BC
          </div>
          
          <div className="absolute right-0 text-right top-0">
            400 BC
          </div>

          {/* HIGHLIGHTED CURRENT POSITION - Below the static markers (top-6) and larger */}
          <div 
            className="absolute text-amber-600 text-[18px] font-black transition-all duration-1000 ease-in-out whitespace-nowrap leading-none top-6"
            style={{ 
              left: `${progress}%`, 
              transform: progress === 0 ? 'translateX(0)' : progress === 100 ? 'translateX(-100%)' : 'translateX(-50%)' 
            }}
          >
            {isCreation ? 'Creation' : `${currentYear} BC`}
          </div>
        </div>

        {/* Explanation line */}
        <div className="mt-2 text-[9px] text-stone-400 font-serif italic uppercase tracking-wider opacity-60">
          All dates are approximate
        </div>
      </div>
    </div>
  );
};

export default TimelineControl;
