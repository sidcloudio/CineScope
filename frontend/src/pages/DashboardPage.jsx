// ── DashboardPage ─────────────────────────────────────────────
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { getPosterUrl } from '../services/tmdb';

const DashboardPage = () => {
  const { user } = useAuth();
  const { watchlist, loading, removeMovie } = useWatchlist();
  const [removing, setRemoving] = useState(null);
  const [sortBy, setSortBy] = useState('added');

  const handleRemove = async (movieId) => {
    setRemoving(movieId);
    try { await removeMovie(movieId); } catch {/* ignore */} finally { setRemoving(null); }
  };

  const sorted = [...watchlist].sort((a, b) => {
    if (sortBy === 'added') return new Date(b.addedAt) - new Date(a.addedAt);
    if (sortBy === 'rating') return b.vote_average - a.vote_average;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'year') return (b.release_date || '').localeCompare(a.release_date || '');
    return 0;
  });

  // Because you watched... recommendations based on genres
  const topGenres = watchlist
    .flatMap(m => m.genre_ids || [])
    .reduce((acc, g) => { acc[g] = (acc[g] || 0) + 1; return acc; }, {});
  const favoriteGenreId = Object.keys(topGenres).sort((a, b) => topGenres[b] - topGenres[a])[0];

  return (
    <div className="min-h-screen bg-noir-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-noir-900 font-display font-bold text-lg">{user?.username?.[0]?.toUpperCase()}</span>
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">{user?.username}'s Watchlist</h1>
                <p className="text-gray-500 text-sm font-body">{watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved</p>
              </div>
            </div>
          </div>

          {/* Sort */}
          {watchlist.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs font-body uppercase tracking-wider">Sort:</span>
              {[['added', 'Recently Added'], ['rating', 'Rating'], ['title', 'Title'], ['year', 'Year']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setSortBy(val)}
                  className={`px-3 py-1.5 rounded-md text-xs font-body font-medium transition-all ${
                    sortBy === val ? 'bg-gold-500 text-noir-900' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-lg bg-noir-800 animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-noir-800 rounded-full flex items-center justify-center mb-4 border border-white/5">
              <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
            </div>
            <h2 className="font-display text-xl font-bold text-white mb-2">Your watchlist is empty</h2>
            <p className="text-gray-500 font-body text-sm mb-6">Start adding movies to keep track of what you want to watch</p>
            <Link to="/movies" className="bg-gold-500 hover:bg-gold-400 text-noir-900 font-body font-bold px-6 py-3 rounded-lg transition-all hover:scale-105">
              Browse Movies
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sorted.map(movie => (
                <div key={movie.movieId} className="group relative">
                  <Link to={`/movie/${movie.movieId}`}>
                    <div className="rounded-lg overflow-hidden bg-noir-800 border border-white/5 hover:border-gold-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
                      <div className="aspect-[2/3] relative overflow-hidden">
                        <img
                          src={getPosterUrl(movie.poster_path)}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-noir-900/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-2.5">
                        <h3 className="text-white text-xs font-body font-semibold truncate group-hover:text-gold-400 transition-colors">{movie.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-gray-600 text-xs font-body">{movie.release_date?.split('-')[0]}</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span className="text-gold-400 text-xs font-mono">{movie.vote_average?.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemove(movie.movieId)}
                    disabled={removing === movie.movieId}
                    className="absolute top-2 right-2 w-7 h-7 bg-noir-900/90 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-crimson-500 hover:border-crimson-500/30 opacity-0 group-hover:opacity-100 transition-all"
                    title="Remove from watchlist"
                  >
                    {removing === movie.movieId ? (
                      <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Recommendation hint */}
            {favoriteGenreId && (
              <div className="mt-10 p-4 bg-noir-800/50 border border-white/5 rounded-xl flex items-center gap-3">
                <svg className="w-5 h-5 text-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                <div>
                  <p className="text-white font-body text-sm font-medium">Based on your watchlist...</p>
                  <p className="text-gray-500 text-xs font-body mt-0.5">
                    You seem to love certain genres.{' '}
                    <Link to={`/movies?category=popular`} className="text-gold-400 hover:text-gold-300 transition-colors">
                      Discover more movies →
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
