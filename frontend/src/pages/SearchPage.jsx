// ── SearchPage ────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdb';
import MovieGrid from '../components/common/MovieGrid';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const doSearch = useCallback(async (q, p = 1) => {
    if (!q.trim()) { setMovies([]); return; }
    setLoading(true);
    try {
      const { data } = await searchMovies(q, p);
      setMovies(prev => p === 1 ? data.results : [...prev, ...data.results]);
      setTotalPages(data.total_pages);
      setTotalResults(data.total_results);
    } catch {/* ignore */} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    setInputValue(q);
    setPage(1);
    doSearch(q, 1);
  }, [searchParams, doSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    doSearch(query, next);
  };

  return (
    <div className="min-h-screen bg-noir-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Search for a movie..."
                className="w-full bg-noir-800 border border-white/10 text-white placeholder-gray-500 font-body text-base rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-gold-500 hover:bg-gold-400 text-noir-900 font-body font-bold px-6 rounded-xl transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Header */}
        {query && !loading && (
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-white">
              {totalResults > 0
                ? <>Results for <span className="text-gold-400">"{query}"</span></>
                : <>No results for <span className="text-gold-400">"{query}"</span></>
              }
            </h1>
            {totalResults > 0 && (
              <p className="text-gray-500 text-sm font-body mt-1">
                {totalResults.toLocaleString()} movies found
              </p>
            )}
          </div>
        )}

        {!query && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg className="w-16 h-16 text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <p className="text-gray-500 font-body text-lg">Search for your favourite movies</p>
          </div>
        )}

        {/* Grid */}
        <MovieGrid movies={movies} loading={loading} emptyMessage={`No movies found for "${query}".`} />

        {/* Load More */}
        {movies.length > 0 && page < totalPages && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMore}
              disabled={loading}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-body font-medium px-8 py-3 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
              ) : null}
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
