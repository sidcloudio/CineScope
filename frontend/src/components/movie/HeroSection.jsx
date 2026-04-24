// ── HeroSection Component ─────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrending, getBackdropUrl } from '../../services/tmdb';
import { useWatchlist } from '../../context/WatchlistContext';
import { useAuth } from '../../context/AuthContext';

const HeroSection = () => {
  const [featured, setFeatured] = useState(null);
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addMovie, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getTrending('week');
        const top = data.results.slice(0, 5).filter(m => m.backdrop_path);
        setMovies(top);
        setFeatured(top[0]);
      } catch {/* ignore */} finally { setLoading(false); }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (movies.length < 2) return;
    const t = setInterval(() => {
      setIndex(i => {
        const next = (i + 1) % movies.length;
        setFeatured(movies[next]);
        return next;
      });
    }, 8000);
    return () => clearInterval(t);
  }, [movies]);

  if (loading || !featured) {
    return (
      <div className="h-[85vh] bg-gradient-to-b from-noir-900 to-noir-950 animate-pulse flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inWatchlist = isInWatchlist(featured.id);
  const year = featured.release_date?.split('-')[0];

  const handleAdd = async () => {
    if (!user) return;
    if (!inWatchlist) await addMovie(featured);
  };

  return (
    <div className="relative h-[88vh] min-h-[500px] overflow-hidden">
      {/* Backdrop */}
      <div
        key={featured.id}
        className="absolute inset-0 animate-fade-in"
        style={{
          backgroundImage: `url(${getBackdropUrl(featured.backdrop_path)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-noir-950 via-noir-950/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-noir-950/30" />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse-slow" />
              <span className="text-gold-400 text-xs font-body font-semibold tracking-widest uppercase">Trending Now</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
              {featured.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-gold-400 font-mono font-bold">{featured.vote_average?.toFixed(1)}</span>
              </div>
              {year && <span className="text-gray-400 text-sm font-body">{year}</span>}
              <span className="text-gray-400 text-sm font-body">
                {featured.original_language?.toUpperCase()}
              </span>
            </div>

            {/* Overview */}
            <p className="text-gray-300 font-body text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
              {featured.overview}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link
                to={`/movie/${featured.id}`}
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-noir-900 font-body font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-gold-500/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                View Details
              </Link>
              {user && (
                <button
                  onClick={handleAdd}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-body font-medium text-sm border transition-all duration-200 ${
                    inWatchlist
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill={inWatchlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                  {inWatchlist ? 'In Watchlist' : 'Watchlist'}
                </button>
              )}
            </div>
          </div>

          {/* Dot indicators */}
          {movies.length > 1 && (
            <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 flex gap-2">
              {movies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIndex(i); setFeatured(movies[i]); }}
                  className={`transition-all duration-300 rounded-full ${
                    i === index ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
