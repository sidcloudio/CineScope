// ── MovieRow - Horizontal Scrollable Row ─────────────────────
import React, { useRef } from 'react';
import MovieCard from './MovieCard';

const MovieRow = ({ movies, loading }) => {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    const el = rowRef.current;
    if (el) el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-36 sm:w-44">
            <div className="aspect-[2/3] rounded-lg bg-noir-800 animate-pulse" />
            <div className="mt-2 space-y-1.5">
              <div className="h-3 bg-noir-800 rounded w-4/5 animate-pulse" />
              <div className="h-3 bg-noir-800 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative group/row">
      {/* Left Arrow */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/3 z-10 -translate-x-3 w-9 h-9 bg-noir-900/90 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 hover:bg-noir-700 transition-all shadow-lg"
        aria-label="Scroll left"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scrollable Row */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie, i) => (
          <div key={`${movie.id}-${i}`} className="flex-shrink-0 w-36 sm:w-44">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/3 z-10 translate-x-3 w-9 h-9 bg-noir-900/90 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 hover:bg-noir-700 transition-all shadow-lg"
        aria-label="Scroll right"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default MovieRow;
