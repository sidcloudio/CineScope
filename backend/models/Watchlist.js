// ── Watchlist Model ───────────────────────────────────────────
const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movies: [
    {
      movieId: { type: Number, required: true },
      title: { type: String, required: true },
      poster_path: { type: String, default: '' },
      vote_average: { type: Number, default: 0 },
      release_date: { type: String, default: '' },
      overview: { type: String, default: '' },
      genre_ids: [{ type: Number }],
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

// Ensure one watchlist per user
watchlistSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
