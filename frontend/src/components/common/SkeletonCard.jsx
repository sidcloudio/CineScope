// ── SkeletonCard Component ────────────────────────────────────
import React from 'react';

const SkeletonCard = () => (
  <div className="rounded-lg overflow-hidden bg-noir-800 border border-white/5 animate-pulse">
    <div className="aspect-[2/3] bg-gradient-to-br from-noir-700 to-noir-800 shimmer-bg" />
    <div className="p-3 space-y-2">
      <div className="h-3.5 bg-noir-700 rounded w-4/5" />
      <div className="flex justify-between">
        <div className="h-3 bg-noir-700 rounded w-1/4" />
        <div className="h-3 bg-noir-700 rounded w-1/5" />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 12 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
