
import React, { useState, useRef, useEffect } from 'react';
import { ChapterRange } from '../types';
import { OLD_TESTAMENT_BOOKS } from '../constants';

interface ChapterTrayProps {
  selectedBook: string;
  selectedChapter: number;
  onSelectBook: (book: string) => void;
  onSelectChapter: (chapter: number) => void;
}

const ChapterTray: React.FC<ChapterTrayProps> = ({ 
  selectedBook, 
  selectedChapter, 
  onSelectBook, 
  onSelectChapter 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentBook = OLD_TESTAMENT_BOOKS.find(b => b.name === selectedBook);
  if (!currentBook) return null;

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getClumps = (): ChapterRange[] => {
    const clumps: ChapterRange[] = [];
    let start = 1;

    if (selectedBook === 'Genesis') {
      clumps.push({ start: 1, end: 1, label: '1' });
      clumps.push({ start: 2, end: 2, label: '2' });
      clumps.push({ start: 3, end: 3, label: '3' });
      start = 4;
    }

    for (let i = start; i <= currentBook.chapters; i++) {
      clumps.push({ start: i, end: i, label: `${i}` });
    }

    return clumps;
  };

  const clumps = getClumps();

  return (
    <div className="w-full bg-white/60 backdrop-blur-md border-t border-stone-200">
      <div className="flex items-center gap-2 p-4 max-w-full">
        
        {/* Book Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-black uppercase tracking-widest shadow-lg hover:bg-stone-700 transition-colors"
          >
            <span>{selectedBook}</span>
            <svg 
              className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {/* Upward Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-4 w-56 max-h-[60vh] overflow-y-auto bg-white rounded-xl shadow-2xl border border-stone-200 z-50 py-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="px-4 py-2 text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-stone-100 mb-1">
                Select Book
              </div>
              {OLD_TESTAMENT_BOOKS.map((book) => (
                <button
                  key={book.name}
                  onClick={() => {
                    onSelectBook(book.name);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                    selectedBook === book.name
                      ? 'bg-amber-50 text-amber-900 border-l-4 border-amber-600'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  {book.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-[1px] h-6 bg-stone-200 mx-2" />

        {/* Chapters Scrolling Area */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max pb-1">
            {clumps.map((clump) => {
              const isActive = selectedChapter >= clump.start && selectedChapter <= clump.end;
              return (
                <button
                  key={clump.label}
                  onClick={() => onSelectChapter(clump.start)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md scale-105'
                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  {clump.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterTray;
