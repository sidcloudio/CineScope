// ── SignupPage ────────────────────────────────────────────────
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await signup(form.username, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-noir-800 border border-white/10 text-white placeholder-gray-600 font-body text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-gold-500/50 focus:bg-noir-700/50 transition-all";

  const strengthLevel = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) s++;
    return s;
  };
  const strength = strengthLevel();
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];
  const strengthColors = ['', 'bg-crimson-500', 'bg-gold-400', 'bg-emerald-400'];

  return (
    <div className="min-h-screen bg-noir-950 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-md flex items-center justify-center">
              <span className="text-noir-900 font-display font-bold text-lg">C</span>
            </div>
            <span className="font-display text-2xl font-bold text-white">CineScope</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mb-1">Create account</h1>
          <p className="text-gray-500 font-body text-sm">Join CineScope and start tracking movies</p>
        </div>

        <div className="bg-noir-800/80 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40">
          {error && (
            <div className="mb-4 px-4 py-3 bg-crimson-500/10 border border-crimson-500/30 rounded-lg flex items-center gap-2 animate-fade-in">
              <svg className="w-4 h-4 text-crimson-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p className="text-crimson-400 text-sm font-body">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-body font-semibold uppercase tracking-wider mb-1.5">Username</label>
              <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="cinefan42" required minLength={3} className={inputClass} />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-body font-semibold uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className={inputClass} />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-body font-semibold uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className={`${inputClass} pr-10`}
                />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              {/* Password strength */}
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-body ${strength === 3 ? 'text-emerald-400' : strength === 2 ? 'text-gold-400' : 'text-crimson-400'}`}>
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-body font-semibold uppercase tracking-wider mb-1.5">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat password"
                required
                className={`${inputClass} ${form.confirm && form.confirm !== form.password ? 'border-crimson-500/50' : ''}`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-noir-900 font-body font-bold py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] mt-2"
            >
              {loading && <div className="w-4 h-4 border-2 border-noir-900 border-t-transparent rounded-full animate-spin" />}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 font-body text-sm mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
