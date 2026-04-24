// ── Watchlist Context ─────────────────────────────────────────
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../services/api';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext(null);

export const WatchlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWatchlist = useCallback(async () => {
    if (!user) { setWatchlist([]); return; }
    setLoading(true);
    try {
      const { data } = await getWatchlist();
      setWatchlist(data.movies || []);
    } catch {
      setWatchlist([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchWatchlist(); }, [fetchWatchlist]);

  const addMovie = useCallback(async (movie) => {
    try {
      const { data } = await addToWatchlist({
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
        genre_ids: movie.genre_ids || movie.genres?.map(g => g.id) || [],
      });
      setWatchlist(data.movies);
      return true;
    } catch (err) {
      if (err.response?.status === 409) return false; // Already added
      throw err;
    }
  }, []);

  const removeMovie = useCallback(async (movieId) => {
    try {
      const { data } = await removeFromWatchlist(movieId);
      setWatchlist(data.movies);
    } catch (err) {
      throw err;
    }
  }, []);

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some(m => m.movieId === Number(movieId)),
    [watchlist]
  );

  return (
    <WatchlistContext.Provider value={{ watchlist, loading, addMovie, removeMovie, isInWatchlist, fetchWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
};
