// ── FilterBar Component ───────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { getGenres } from '../../services/tmdb';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 35 }, (_, i) => currentYear - i);
const ratingOptions = [
  { label: 'All', value: '' },
  { label: '9+', value: '9' },
  { label: '8+', value: '8' },
  { label: '7+', value: '7' },
  { label: '6+', value: '6' },
];
const sortOptions = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Rating', value: 'vote_average.desc' },
  { label: 'Release Date', value: 'release_date.desc' },
  { label: 'Revenue', value: 'revenue.desc' },
];

const FilterBar = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    sort: 'popularity.desc',
  });

  useEffect(() => {
    getGenres().then(({ data }) => setGenres(data.genres)).catch(() => {});
  }, []);

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const reset = () => {
    const def = { genre: '', year: '', rating: '', sort: 'popularity.desc' };
    setFilters(def);
    onFilterChange(def);
  };

  const hasActive = filters.genre || filters.year || filters.rating || filters.sort !== 'popularity.desc';

  const selectClass = "bg-noir-800 border border-white/10 text-gray-300 text-sm font-body rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-gold-500/50 hover:border-white/20 transition-colors appearance-none cursor-pointer";

  return (
    <div className="flex flex-wrap items-center gap-3 bg-noir-800/50 backdrop-blur border border-white/5 rounded-xl px-4 py-3">
      <span className="text-gray-500 text-xs font-body font-semibold uppercase tracking-wider mr-1 hidden sm:block">Filter</span>

      {/* Genre */}
      <div className="relative">
        <select
          value={filters.genre}
          onChange={e => handleChange('genre', e.target.value)}
          className={selectClass}
        >
          <option value="">All Genres</option>
          {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Year */}
      <div className="relative">
        <select
          value={filters.year}
          onChange={e => handleChange('year', e.target.value)}
          className={selectClass}
        >
          <option value="">All Years</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 bg-noir-800 border border-white/10 rounded-lg px-2 py-1.5">
        <svg className="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        {ratingOptions.map(r => (
          <button
            key={r.value}
            onClick={() => handleChange('rating', r.value)}
            className={`px-2 py-0.5 rounded text-xs font-body font-medium transition-colors ${
              filters.rating === r.value
                ? 'bg-gold-500 text-noir-900'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="relative">
        <select
          value={filters.sort}
          onChange={e => handleChange('sort', e.target.value)}
          className={selectClass}
        >
          {sortOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Reset */}
      {hasActive && (
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-crimson-500 font-body transition-colors ml-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reset
        </button>
      )}
    </div>
  );
};

export default FilterBar;
