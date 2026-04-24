// ── SectionHeader Component ───────────────────────────────────
import React from 'react';
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, subtitle, linkTo, linkLabel = 'See all' }) => (
  <div className="flex items-end justify-between mb-5">
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">{title}</h2>
      {subtitle && <p className="text-gray-500 text-sm font-body mt-0.5">{subtitle}</p>}
    </div>
    {linkTo && (
      <Link
        to={linkTo}
        className="flex items-center gap-1 text-gold-400 hover:text-gold-300 text-sm font-body font-medium transition-colors group"
      >
        {linkLabel}
        <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    )}
  </div>
);

export default SectionHeader;
