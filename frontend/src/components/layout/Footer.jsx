// ── Footer Component ──────────────────────────────────────────
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-noir-900 border-t border-white/5 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm flex items-center justify-center">
              <span className="text-noir-900 font-display font-bold text-xs">C</span>
            </div>
            <span className="font-display text-lg font-bold text-white">CineScope</span>
          </div>
          <p className="text-gray-600 text-xs font-body max-w-xs">
            Discover, track, and explore the world of cinema. Powered by TMDB.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-12">
          <div>
            <h4 className="text-gray-400 text-xs font-body font-semibold uppercase tracking-widest mb-3">Explore</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/movies', 'Movies'], ['/genres', 'Genres'], ['/search', 'Search']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-gray-600 hover:text-gray-300 text-sm font-body transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 text-xs font-body font-semibold uppercase tracking-widest mb-3">Account</h4>
            <ul className="space-y-2">
              {[['/login', 'Sign In'], ['/signup', 'Sign Up'], ['/dashboard', 'Watchlist']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-gray-600 hover:text-gray-300 text-sm font-body transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-gray-700 text-xs font-body">
          © {new Date().getFullYear()} CineScope. Movie data provided by{' '}
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">TMDB</a>.
        </p>
        <p className="text-gray-700 text-xs font-body">Built with React · Express · MongoDB</p>
      </div>
    </div>
  </footer>
);

export default Footer;
