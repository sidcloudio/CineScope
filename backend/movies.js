const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const [hollywood, bollywood, south] = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=en&sort_by=popularity.desc`),
      
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc`),
      
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=popularity.desc`)
    ]);

    res.json({ hollywood: hollywood.data, bollywood: bollywood.data, south: south.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

module.exports = router;