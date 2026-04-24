 🎬 CineScope — Movie Discovery App

A full-stack, Netflix-inspired movie discovery web app built with React, Node.js, Express, MongoDB, and the TMDB API.

---

 ✨ Features

- **Home Page** — Trending, Now Playing, Top Rated, and Popular movie rows with hero banner
- **Movie Details** — Poster, cast, trailer (YouTube embed), genres, rating
- **Search** — Real-time search with paginated results
- **Genres** — Browse all genres with visual genre cards
- **Filters** — Filter by genre, year, rating, and sort order
- **Infinite Scroll** — Auto-load more movies as you scroll
- **Authentication** — JWT-based signup/login with protected routes
- **Watchlist** — Add/remove movies, view saved list in dashboard
- **Dark Mode** — Toggle between dark and light themes
- **Recommendations** — "Because you watched…" hints based on your genres

---

 🗂 Project Structure

```
cinescope/
├── backend/                    # Node.js + Express API
│   ├── middleware/
│   │   └── auth.js             # JWT auth middleware
│   ├── models/
│   │   ├── User.js             # Mongoose User model
│   │   └── Watchlist.js        # Mongoose Watchlist model
│   ├── routes/
│   │   ├── auth.js             # /api/auth routes
│   │   └── watchlist.js        # /api/watchlist routes
│   ├── server.js               # Express entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/                   # React app
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   └── ProtectedRoute.jsx
    │   │   ├── common/
    │   │   │   ├── FilterBar.jsx
    │   │   │   ├── MovieGrid.jsx
    │   │   │   ├── SectionHeader.jsx
    │   │   │   └── SkeletonCard.jsx
    │   │   ├── layout/
    │   │   │   ├── Footer.jsx
    │   │   │   └── Navbar.jsx
    │   │   └── movie/
    │   │       ├── HeroSection.jsx
    │   │       ├── MovieCard.jsx
    │   │       └── MovieRow.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   ├── ThemeContext.jsx
    │   │   └── WatchlistContext.jsx
    │   ├── hooks/
    │   │   └── useInfiniteScroll.js
    │   ├── pages/
    │   │   ├── DashboardPage.jsx
    │   │   ├── GenresPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── MovieDetailsPage.jsx
    │   │   ├── MoviesPage.jsx
    │   │   ├── NotFoundPage.jsx
    │   │   ├── SearchPage.jsx
    │   │   └── SignupPage.jsx
    │   ├── services/
    │   │   ├── api.js          # Backend API calls (Axios)
    │   │   └── tmdb.js         # TMDB API calls (Axios)
    │   ├── App.jsx
    │   ├── index.css
    │   └── index.js
    ├── tailwind.config.js
    ├── .env.example
    └── package.json
```

---

 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [TMDB API Key](https://www.themoviedb.org/settings/api) (free)

---

 1. Clone & Install

```bash
# Install backend deps
cd cinescope/backend
npm install

 Install frontend deps
cd ../frontend
npm install
 🎬 CineScope — Movie Discovery App

> A modern, full-stack movie discovery platform inspired by Netflix, IMDb, and Letterboxd.
> Built with performance, scalability, and clean UI/UX in mind.

---
 🌐 Live Demo 

    Coming soon 🚀

---

 ✨ Key Highlights

* ⚡ **Fast & Responsive UI** — Optimized React + Tailwind experience
* 🔐 **Secure Authentication** — JWT-based auth with protected routes
* 🎯 **Personalized Experience** — Watchlist + smart recommendations
* ♾️ **Infinite Scrolling** — Smooth, modern browsing experience
* 🌙 **Dark Mode Ready** — Clean theme switching
* 📱 **Fully Responsive** — Mobile-first design

---

 🎥 Features Breakdown

 🏠 Home Experience

* Trending, Now Playing, Top Rated, Popular sections
* Netflix-style horizontal movie rows
* Dynamic hero banner with featured movie

 🔍 Search & Discovery

* Real-time movie search
* Pagination support
* Genre-based browsing

 🎬 Movie Details

* Poster, overview, rating, genres
* Cast information
* Embedded YouTube trailer
* “Add to Watchlist” functionality

 ❤️ User Features

* Secure signup/login
* Persistent watchlist
* Personalized dashboard

 🎯 Smart Recommendations

* “Because you watched…” logic based on genre similarity

---

 🗂 Project Architecture

```bash
cinescope/
├── backend/        # REST API (Node.js + Express)
└── frontend/       # React App (UI Layer)
```

 🔧 Backend Architecture

* MVC pattern (Routes → Controllers → Models)
* JWT authentication middleware
* RESTful API design

 🎨 Frontend Architecture

* Component-driven design
* Context API for global state
* Custom hooks (e.g., infinite scroll)

---

⚙️ Quick Start Guide

 📌 Prerequisites

* Node.js (v18+)
* MongoDB (local or Atlas)
* TMDB API Key (free)

---

 📥 Installation

```bash
git clone https://github.com/yourusername/cinescope.git
cd cinescope
```

---

 🔧 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

 `.env` configuration:

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

Run backend:

```bash
npm run dev
```

---

 🎨 Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

 `.env` configuration:

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

 Get a free TMDB API key:**
> 1. Go to https://www.themoviedb.org/
> 2. Create a free account
> 3. Go to Settings → API → Create API Key (Developer)
> 4. Copy your API key (v3 auth)

---

 3. Run

Open two terminals:

Terminal 1 — Backend:**
```bash
cd cinescope/backend
npm run dev
# API running at http://localhost:5000
```

Terminal 2 — Frontend:**
```bash
cd cinescope/frontend
npm start
# App running at http://localhost:3000
=======
Run frontend:

```bash
npm start
>>>>>>> d3e2f362f0c51134e35bb5f4c71480c7bea5cbe2
```

---


 🔌 API Endpoints

 Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

 Watchlist
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/watchlist` | Get user's watchlist | ✅ |
| POST | `/api/watchlist` | Add movie | ✅ |
| DELETE | `/api/watchlist/:movieId` | Remove movie | ✅ |
| GET | `/api/watchlist/check/:movieId` | Check if saved | ✅ |

---

 ☁️ Deployment

 Frontend → Vercel
1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Set root to `frontend/`
4. Add environment variables (REACT_APP_*)
5. Deploy

 Backend → Render
1. Create new Web Service at [render.com](https://render.com)
2. Set root to `backend/`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables
6. Deploy

 MongoDB → Atlas
1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get connection string
3. Set as `MONGODB_URI` in backend env

---

 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6, Axios |
| Styling | Tailwind CSS, Google Fonts |
| State | Context API + Hooks |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Movie Data | TMDB API |
| Deployment | Vercel (FE) + Render (BE) |

---

 📝 Notes

- The TMDB API key is required — the app won't load movies without it
- MongoDB can be local (`mongod`) or Atlas cloud
- JWT secret should be a long random string in production
- CORS is configured for `localhost:3000` by default — update `FRONTEND_URL` for production


🔌 API Overview

 🔐 Authentication

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | `/api/auth/signup` | Register user    |
| POST   | `/api/auth/login`  | Login user       |
| GET    | `/api/auth/me`     | Get current user |

---

 ❤️ Watchlist

| Method | Endpoint                        | Description           |
| ------ | ------------------------------- | --------------------- |
| GET    | `/api/watchlist`                | Get all saved movies  |
| POST   | `/api/watchlist`                | Add movie             |
| DELETE | `/api/watchlist/:movieId`       | Remove movie          |
| GET    | `/api/watchlist/check/:movieId` | Check if movie exists |

---

 ☁️ Deployment Guide

 🚀 Frontend — Vercel

* Import GitHub repo
* Set root directory → `frontend`
* Add environment variables
* Deploy

 ⚙️ Backend — Render / Railway

* Create Web Service
* Root → `backend`
* Add environment variables
* Deploy

 🗄 Database — MongoDB Atlas

* Create free cluster
* Use connection string in backend `.env`

---

 🛠 Tech Stack

| Layer      | Technology                |
| ---------- | ------------------------- |
| Frontend   | React 18, React Router v6 |
| Styling    | Tailwind CSS              |
| State      | Context API + Hooks       |
| Backend    | Node.js, Express          |
| Database   | MongoDB + Mongoose        |
| Auth       | JWT + bcryptjs            |
| API        | TMDB                      |
| Deployment | Vercel, Render            |

---

 📸 Screenshots (Add Here)

* Home Pagex
* Movie Details
* Dashboard
  

---

 🔮 Future Enhancements

* ⭐ User ratings & reviews system
* 👥 Social features (follow users, activity feed)
* 🤖 AI-based recommendations
* 📱 PWA (installable app)
* 🎞️ Video streaming integration (optional)

---

 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Open a pull request

---

 🔒 Environment & Security Notes

* Never commit `.env` files
* Use strong JWT secrets in production
* Restrict CORS to your frontend domain
* Store API keys securely

---

 👨‍💻 Author

Built with ❤️ by **Siddhant-Tiwari**

---

 ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

