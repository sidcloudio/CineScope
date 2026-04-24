// ── Auth Context ──────────────────────────────────────────────
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, signup as apiSignup, getMe } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('cinescope_token');
      if (token) {
        try {
          const { data } = await getMe();
          setUser(data.user);
        } catch {
          localStorage.removeItem('cinescope_token');
          localStorage.removeItem('cinescope_user');
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await apiLogin({ email, password });
    localStorage.setItem('cinescope_token', data.token);
    localStorage.setItem('cinescope_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  }, []);

  const signup = useCallback(async (username, email, password) => {
    const { data } = await apiSignup({ username, email, password });
    localStorage.setItem('cinescope_token', data.token);
    localStorage.setItem('cinescope_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('cinescope_token');
    localStorage.removeItem('cinescope_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
