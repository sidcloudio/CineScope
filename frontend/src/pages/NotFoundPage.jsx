// ── NotFoundPage ──────────────────────────────────────────────
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="min-h-screen bg-noir-950 flex flex-col items-center justify-center text-center px-4">
    <div className="animate-float">
      <span className="font-display text-[8rem] md:text-[12rem] font-bold text-white/5 leading-none select-none">404</span>
    </div>
    <div className="-mt-8 relative z-10">
      <h1 className="font-display text-3xl font-bold text-white mb-2">Scene Not Found</h1>
      <p className="text-gray-500 font-body mb-6 max-w-sm">
        The page you're looking for seems to have been cut from the final edit.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-noir-900 font-body font-bold px-6 py-3 rounded-lg transition-all hover:scale-105"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
