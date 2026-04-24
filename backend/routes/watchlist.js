// ── Watchlist Routes ──────────────────────────────────────────
const express = require('express');
const Watchlist = require('../models/Watchlist');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// GET /api/watchlist — Get user's watchlist
router.get('/', async (req, res) => {
  try {
    const watchlist = await Watchlist.findOne({ user: req.user._id });
    res.json({ movies: watchlist ? watchlist.movies : [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch watchlist.' });
  }
});

// POST /api/watchlist — Add movie to watchlist
router.post('/', async (req, res) => {
  try {
    const { movieId, title, poster_path, vote_average, release_date, overview, genre_ids } = req.body;

    if (!movieId || !title) {
      return res.status(400).json({ error: 'movieId and title are required.' });
    }

    let watchlist = await Watchlist.findOne({ user: req.user._id });

    if (!watchlist) {
      // Create new watchlist for user
      watchlist = await Watchlist.create({
        user: req.user._id,
        movies: [{ movieId, title, poster_path, vote_average, release_date, overview, genre_ids }],
      });
    } else {
      // Check if movie already in watchlist
      const alreadyAdded = watchlist.movies.some(m => m.movieId === Number(movieId));
      if (alreadyAdded) {
        return res.status(409).json({ error: 'Movie already in watchlist.' });
      }
      watchlist.movies.push({ movieId, title, poster_path, vote_average, release_date, overview, genre_ids });
      await watchlist.save();
    }

    res.status(201).json({ message: 'Movie added to watchlist.', movies: watchlist.movies });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to watchlist.' });
  }
});

// DELETE /api/watchlist/:movieId — Remove movie from watchlist
router.delete('/:movieId', async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);
    const watchlist = await Watchlist.findOne({ user: req.user._id });

    if (!watchlist) {
      return res.status(404).json({ error: 'Watchlist not found.' });
    }

    watchlist.movies = watchlist.movies.filter(m => m.movieId !== movieId);
    await watchlist.save();

    res.json({ message: 'Movie removed from watchlist.', movies: watchlist.movies });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from watchlist.' });
  }
});

// GET /api/watchlist/check/:movieId — Check if movie is in watchlist
router.get('/check/:movieId', async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);
    const watchlist = await Watchlist.findOne({ user: req.user._id });
    const inWatchlist = watchlist ? watchlist.movies.some(m => m.movieId === movieId) : false;
    res.json({ inWatchlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check watchlist.' });
  }
});

module.exports = router;
