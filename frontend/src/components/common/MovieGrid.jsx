// ── MovieGrid Component ───────────────────────────────────────
import React from 'react';
import MovieCard from '../movie/MovieCard';
import { SkeletonGrid } from './SkeletonCard';

const MovieGrid = ({ movies, loading, showRank = false, emptyMessage = 'No movies found.' }) => {
  if (loading && movies.length === 0) return <SkeletonGrid />;

  if (!loading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <svg className="w-16 h-16 text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <p className="text-gray-500 font-body text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie, i) => (
        <MovieCard key={`${movie.id}-${i}`} movie={movie} rank={showRank ? i + 1 : null} />
      ))}
    </div>
  );
};

export default MovieGrid;
