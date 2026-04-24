// ── GenresPage ────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGenres, getMoviesByGenre, getPosterUrl } from '../services/tmdb';

const GENRE_COLORS = {
  28: 'from-red-900/60 to-red-950', 12: 'from-emerald-900/60 to-emerald-950',
  16: 'from-pink-900/60 to-pink-950', 35: 'from-yellow-900/60 to-yellow-950',
  80: 'from-gray-800/60 to-gray-950', 99: 'from-blue-900/60 to-blue-950',
  18: 'from-purple-900/60 to-purple-950', 10751: 'from-orange-900/60 to-orange-950',
  14: 'from-violet-900/60 to-violet-950', 36: 'from-amber-900/60 to-amber-950',
  27: 'from-rose-900/60 to-rose-950', 10402: 'from-indigo-900/60 to-indigo-950',
  9648: 'from-slate-800/60 to-slate-950', 10749: 'from-fuchsia-900/60 to-fuchsia-950',
  878: 'from-cyan-900/60 to-cyan-950', 53: 'from-zinc-800/60 to-zinc-950',
  10752: 'from-stone-800/60 to-stone-950', 37: 'from-brown-900/60 to-neutral-950',
};

const GenreCard = ({ genre }) => {
  const navigate = useNavigate();
  const [bgPosters, setBgPosters] = useState([]);

  useEffect(() => {
    getMoviesByGenre(genre.id, 1)
      .then(({ data }) => {
        const posters = data.results.slice(0, 4).map(m => getPosterUrl(m.poster_path, 'w185'));
        setBgPosters(posters);
      })
      .catch(() => {});
  }, [genre.id]);

  const gradient = GENRE_COLORS[genre.id] || 'from-noir-700/60 to-noir-900';

  return (
    <button
      onClick={() => navigate(`/movies?category=popular`, { state: { genre: genre.id } })}
      className="group relative overflow-hidden rounded-xl aspect-[3/2] border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 text-left"
    >
      {/* Mini poster collage */}
      <div className="absolute inset-0 grid grid-cols-2 gap-0.5 opacity-30 group-hover:opacity-40 transition-opacity">
        {bgPosters.slice(0, 4).map((src, i) => (
          <img key={i} src={src} alt="" className="w-full h-full object-cover" />
        ))}
      </div>

      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end p-4">
        <h3 className="font-display text-white text-lg font-bold leading-tight">{genre.name}</h3>
        <p className="text-gray-400 text-xs font-body mt-0.5 group-hover:text-gold-400 transition-colors">
          Explore →
        </p>
      </div>
    </button>
  );
};

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGenres()
      .then(({ data }) => setGenres(data.genres))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-noir-950 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h1 className="font-display text-4xl font-bold text-white mb-2">Browse by Genre</h1>
        <p className="text-gray-500 font-body mb-8">Find movies by the genre you love</p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[3/2] rounded-xl bg-noir-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {genres.map(genre => <GenreCard key={genre.id} genre={genre} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenresPage;
