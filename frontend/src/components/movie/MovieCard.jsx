// ── MovieCard Component ───────────────────────────────────────
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosterUrl } from '../../services/tmdb';
import { useAuth } from '../../context/AuthContext';
import { useWatchlist } from '../../context/WatchlistContext';

const MovieCard = ({ movie, rank }) => {
  const { user } = useAuth();
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();
  const [imgError, setImgError] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const inWatchlist = isInWatchlist(movie.id);
  const rating = movie.vote_average?.toFixed(1);
  const year = movie.release_date?.split('-')[0];

  const getRatingColor = (r) => {
    const n = parseFloat(r);
    if (n >= 7.5) return 'text-emerald-400';
    if (n >= 6) return 'text-gold-400';
    return 'text-gray-400';
  };

  const handleWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      setNotification('Sign in to save movies');
      setTimeout(() => setNotification(null), 2000);
      return;
    }
    setActionLoading(true);
    try {
      if (inWatchlist) {
        await removeMovie(movie.id);
        setNotification('Removed');
      } else {
        await addMovie(movie);
        setNotification('Added!');
      }
      setTimeout(() => setNotification(null), 1500);
    } catch {
      setNotification('Error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-noir-800 border border-white/5 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60">

        {/* Rank badge */}
        {rank && (
          <div className="absolute top-2 left-2 z-10 w-7 h-7 bg-noir-900/90 backdrop-blur rounded-full flex items-center justify-center border border-gold-500/30">
            <span className="text-gold-400 text-xs font-display font-bold">{rank}</span>
          </div>
        )}

        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-noir-700">
          {!imgError ? (
            <img
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-noir-700 to-noir-800">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <span className="text-gray-500 text-xs font-body px-2 text-center leading-tight">{movie.title}</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20">
              <span className="text-white text-xs font-body font-medium">View Details</span>
            </div>
          </div>

          {/* Watchlist Button */}
          <button
            onClick={handleWatchlist}
            disabled={actionLoading}
            className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              inWatchlist
                ? 'bg-gold-500 text-noir-900 opacity-100'
                : 'bg-noir-900/80 backdrop-blur text-white opacity-0 group-hover:opacity-100 hover:bg-gold-500 hover:text-noir-900'
            } border border-white/10`}
            aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {actionLoading ? (
              <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill={inWatchlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>

          {/* Notification */}
          {notification && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-noir-900/90 backdrop-blur text-white text-xs px-2 py-1 rounded-full border border-white/10 whitespace-nowrap animate-fade-in font-body">
              {notification}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-white text-sm font-body font-semibold truncate group-hover:text-gold-400 transition-colors leading-tight mb-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs font-body">{year || '—'}</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className={`text-xs font-mono font-medium ${getRatingColor(rating)}`}>{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
