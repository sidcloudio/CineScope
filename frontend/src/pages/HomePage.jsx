// ── HomePage ──────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { getTrending, getPopular, getTopRated, getNowPlaying } from '../services/tmdb';
import HeroSection from '../components/movie/HeroSection';
import MovieRow from '../components/movie/MovieRow';
import SectionHeader from '../components/common/SectionHeader';

const Section = ({ title, subtitle, linkTo, fetchFn, showRank = false }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFn(1).then(({ data }) => setMovies(data.results.slice(0, 20))).catch(() => {}).finally(() => setLoading(false));
  }, [fetchFn]);

  return (
    <section className="mb-12">
      <SectionHeader title={title} subtitle={subtitle} linkTo={linkTo} />
      <MovieRow movies={movies} loading={loading} showRank={showRank} />
    </section>
  );
};

const HomePage = () => (
  <div className="min-h-screen bg-noir-950 dark:bg-noir-950">
    <HeroSection />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Section
        title="Trending This Week"
        subtitle="What everyone's watching right now"
        linkTo="/movies?category=trending"
        fetchFn={(p) => getTrending('week', p)}
      />
      <Section
        title="Now Playing"
        subtitle="Currently in theaters"
        linkTo="/movies?category=now_playing"
        fetchFn={getNowPlaying}
      />
      <Section
        title="Top Rated"
        subtitle="Timeless classics and hidden gems"
        linkTo="/movies?category=top_rated"
        fetchFn={getTopRated}
        showRank
      />
      <Section
        title="Popular Movies"
        subtitle="Fan favorites around the globe"
        linkTo="/movies?category=popular"
        fetchFn={getPopular}
      />
    </div>
  </div>
);

export default HomePage;
