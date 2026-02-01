
import React, { useState, useEffect, useCallback } from 'react';
import OldTestamentMap from './components/OldTestamentMap';
import TimelineControl from './components/TimelineControl';
import ChapterTray from './components/ChapterTray';
import { fetchChapterContext } from './services/geminiService';
import { ChapterContext } from './types';
import { OLD_TESTAMENT_BOOKS } from './constants';

const App: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string>('Genesis');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [context, setContext] = useState<ChapterContext | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSelectBook = useCallback((book: string) => {
    setSelectedBook(book);
    setSelectedChapter(1);
  }, []);

  const handleSelectChapter = useCallback((chapter: number) => {
    setSelectedChapter(chapter);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadContext = async () => {
      // Small delay to prevent flickering on ultra-fast cached responses
      setLoading(true);
      
      const data = await fetchChapterContext(selectedBook, selectedChapter);
      
      if (isMounted) {
        setContext(data);
        setLoading(false);
      }
    };

    loadContext();

    return () => {
      isMounted = false;
    };
  }, [selectedBook, selectedChapter]);

  const currentBookData = OLD_TESTAMENT_BOOKS.find(b => b.name === selectedBook);
  
  // Logic to lock the timeline at "Creation" for Genesis 1-4
  const displayYear = (selectedBook === 'Genesis' && selectedChapter <= 4) 
    ? 4004 
    : (context?.year || currentBookData?.baseYearBC || 4000);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-stone-50">
      <main className="relative flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-stone-50/50 backdrop-blur-sm transition-all duration-300">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-stone-600 font-serif italic">Consulting the chronicles...</p>
              </div>
            </div>
          )}

          <OldTestamentMap 
            book={selectedBook}
            chapter={selectedChapter}
            mapType={currentBookData?.mapType || 'ancient-near-east'} 
            locations={context?.locations || []} 
          />
        </div>

        {/* Bottom Control Section */}
        <div className="z-40">
          <TimelineControl 
            currentYear={displayYear} 
          />
          <ChapterTray 
            selectedBook={selectedBook} 
            selectedChapter={selectedChapter} 
            onSelectBook={handleSelectBook}
            onSelectChapter={handleSelectChapter} 
          />
        </div>
      </main>
    </div>
  );
};

export default App;
