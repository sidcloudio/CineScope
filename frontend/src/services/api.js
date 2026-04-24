// ── Backend API Service ───────────────────────────────────────
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cinescope_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('cinescope_token');
      localStorage.removeItem('cinescope_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth endpoints ────────────────────────────────────────────
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// ── Watchlist endpoints ───────────────────────────────────────
export const getWatchlist = () => api.get('/watchlist');
export const addToWatchlist = (movie) => api.post('/watchlist', movie);
export const removeFromWatchlist = (movieId) => api.delete(`/watchlist/${movieId}`);
export const checkWatchlist = (movieId) => api.get(`/watchlist/check/${movieId}`);

export default api;
