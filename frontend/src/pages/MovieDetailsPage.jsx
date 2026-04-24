// ── MovieDetailsPage ──────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getPosterUrl, getBackdropUrl, getProfileUrl } from '../services/tmdb';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/movie/MovieCard';
import SectionHeader from '../components/common/SectionHeader';

const Badge = ({ children }) => (
  <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-body rounded-full">{children}</span>
);

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);
    getMovieDetails(id)
      .then(({ data }) => {
        setMovie(data);
        const trailer = data.videos?.results?.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailerKey(trailer?.key || null);
      })
      .catch(() => setError('Failed to load movie details.'))
      .finally(() => setLoading(false));
  }, [id]);

  const inWatchlist = isInWatchlist(id);

  const handleWatchlist = async () => {
    if (!user || !movie) return;
    setActionLoading(true);
    try {
      if (inWatchlist) {
        await removeMovie(movie.id);
      } else {
        await addMovie(movie);
      }
    } catch {/* ignore */} finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-noir-950 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-noir-950 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 font-body text-lg">{error || 'Movie not found.'}</p>
        <Link to="/" className="text-gold-400 hover:text-gold-300 font-body text-sm">← Back to Home</Link>
      </div>
    );
  }

  const year = movie.release_date?.split('-')[0];
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
  const cast = movie.credits?.cast?.slice(0, 12) || [];
  const similar = movie.recommendations?.results?.slice(0, 12) || movie.similar?.results?.slice(0, 12) || [];
  const director = movie.credits?.crew?.find(c => c.job === 'Director');

  return (
    <div className="min-h-screen bg-noir-950">
      {/* Hero Backdrop */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        {movie.backdrop_path && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-noir-950 via-noir-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/20 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-48 z-10 flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-44 md:w-56 rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">
              <img
                src={getPosterUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full h-auto"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 pt-4 md:pt-16 animate-slide-up">
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres?.map(g => <Badge key={g.id}>{g.name}</Badge>)}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-gold-400 font-body italic text-base mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-gold-400 font-mono font-bold text-lg">{movie.vote_average?.toFixed(1)}</span>
                <span className="text-gray-600 text-sm font-body">({movie.vote_count?.toLocaleString()} votes)</span>
              </div>
              {year && <span className="text-gray-400 font-body text-sm">{year}</span>}
              {runtime && <span className="text-gray-400 font-body text-sm">{runtime}</span>}
              {director && <span className="text-gray-400 font-body text-sm">Dir. <span className="text-white">{director.name}</span></span>}
            </div>

            {/* Overview */}
            <p className="text-gray-300 font-body text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              {trailerKey && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 bg-crimson-500 hover:bg-crimson-600 text-white font-body font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-lg shadow-crimson-500/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Watch Trailer
                </button>
              )}
              {user && (
                <button
                  onClick={handleWatchlist}
                  disabled={actionLoading}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-body font-bold text-sm border transition-all duration-200 ${
                    inWatchlist
                      ? 'bg-gold-500 text-noir-900 border-gold-500 hover:bg-gold-400'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {actionLoading ? (
                    <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" fill={inWatchlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                    </svg>
                  )}
                  {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                </button>
              )}
              {!user && (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-body font-medium text-sm bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  Sign in to save
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-14">
            <SectionHeader title="Cast" />
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {cast.map(person => (
                <div key={person.cast_id || person.id} className="flex-shrink-0 w-24 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-noir-800 border border-white/10 mb-2">
                    {person.profile_path ? (
                      <img
                        src={getProfileUrl(person.profile_path)}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-white text-xs font-body font-semibold leading-tight">{person.name}</p>
                  <p className="text-gray-600 text-xs font-body leading-tight mt-0.5 truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommendations */}
        {similar.length > 0 && (
          <section className="mt-12 mb-16">
            <SectionHeader title="You Might Also Like" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similar.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          </section>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerKey && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white font-body text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Close
            </button>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
