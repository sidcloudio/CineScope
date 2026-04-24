// ── MoviesPage ────────────────────────────────────────────────
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTrending, getPopular, getTopRated, getNowPlaying, getUpcoming, discoverMovies } from '../services/tmdb';
import MovieGrid from '../components/common/MovieGrid';
import FilterBar from '../components/common/FilterBar';

const CATEGORIES = [
  { key: 'trending', label: 'Trending', fetchFn: (p) => getTrending('week', p) },
  { key: 'popular', label: 'Popular', fetchFn: getPopular },
  { key: 'top_rated', label: 'Top Rated', fetchFn: getTopRated },
  { key: 'now_playing', label: 'Now Playing', fetchFn: getNowPlaying },
  { key: 'upcoming', label: 'Upcoming', fetchFn: getUpcoming },
];

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'trending';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '', sort: 'popularity.desc' });
  const loaderRef = useRef(null);
  const isFiltering = filters.genre || filters.year || filters.rating || filters.sort !== 'popularity.desc';

  const fetchMovies = useCallback(async (pageNum, reset = false) => {
    setLoading(true);
    try {
      let res;
      if (isFiltering) {
        const params = {
          sort_by: filters.sort,
          page: pageNum,
          ...(filters.genre && { with_genres: filters.genre }),
          ...(filters.year && { primary_release_year: filters.year }),
          ...(filters.rating && { 'vote_average.gte': filters.rating }),
        };
        res = await discoverMovies(params);
      } else {
        const cat = CATEGORIES.find(c => c.key === activeCategory) || CATEGORIES[0];
        res = await cat.fetchFn(pageNum);
      }
      const results = res.data.results;
      setMovies(prev => reset ? results : [...prev, ...results]);
      setHasMore(pageNum < res.data.total_pages);
    } catch {/* ignore */} finally {
      setLoading(false);
    }
  }, [activeCategory, filters, isFiltering]);

  // Reset and fetch when category or filters change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1, true);
  }, [activeCategory, filters]);  // eslint-disable-line

  // Infinite scroll observer
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        const next = page + 1;
        setPage(next);
        fetchMovies(next);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, page, fetchMovies]);

  const handleFilterChange = (f) => setFilters(f);

  const title = isFiltering ? 'Filtered Movies' : (CATEGORIES.find(c => c.key === activeCategory)?.label || 'Movies');

  return (
    <div className="min-h-screen bg-noir-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Category Tabs */}
        <div className="flex gap-1 overflow-x-auto mb-6 pb-1" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setSearchParams({ category: cat.key }); setFilters({ genre: '', year: '', rating: '', sort: 'popularity.desc' }); }}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-body text-sm font-medium transition-all ${
                activeCategory === cat.key && !isFiltering
                  ? 'bg-gold-500 text-noir-900'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl font-bold text-white mb-6">{title}</h1>

        {/* Grid */}
        <MovieGrid movies={movies} loading={loading && movies.length === 0} />

        {/* Infinite scroll loader */}
        <div ref={loaderRef} className="flex justify-center py-8">
          {loading && movies.length > 0 && (
            <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          )}
          {!hasMore && movies.length > 0 && (
            <p className="text-gray-600 text-sm font-body">You've reached the end</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
