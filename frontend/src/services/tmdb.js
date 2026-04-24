// ── TMDB API Service ──────────────────────────────────────────
import axios from 'axios';

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const IMG_BASE = process.env.REACT_APP_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p';

const tmdb = axios.create({
  baseURL: TMDB_BASE,
  params: { api_key: TMDB_KEY, language: 'en-US' },
});

// ── Movie endpoints ───────────────────────────────────────────
export const getTrending = (timeWindow = 'week', page = 1) =>
  tmdb.get(`/trending/movie/${timeWindow}`, { params: { page } });

export const getPopular = (page = 1) =>
  tmdb.get('/movie/popular', { params: { page } });

export const getTopRated = (page = 1) =>
  tmdb.get('/movie/top_rated', { params: { page } });

export const getNowPlaying = (page = 1) =>
  tmdb.get('/movie/now_playing', { params: { page } });

export const getUpcoming = (page = 1) =>
  tmdb.get('/movie/upcoming', { params: { page } });

export const getMovieDetails = (movieId) =>
  tmdb.get(`/movie/${movieId}`, {
    params: { append_to_response: 'credits,videos,similar,recommendations' },
  });

export const searchMovies = (query, page = 1) =>
  tmdb.get('/search/movie', { params: { query, page } });

export const discoverMovies = (params = {}) =>
  tmdb.get('/discover/movie', { params });

export const getGenres = () =>
  tmdb.get('/genre/movie/list');

export const getMoviesByGenre = (genreId, page = 1) =>
  tmdb.get('/discover/movie', { params: { with_genres: genreId, page } });

// ── Image helpers ─────────────────────────────────────────────
export const getPosterUrl = (path, size = 'w500') =>
  path ? `${IMG_BASE}/${size}${path}` : '/placeholder-poster.jpg';

export const getBackdropUrl = (path, size = 'w1280') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const getProfileUrl = (path, size = 'w185') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export default tmdb;
