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

Run frontend:

```bash
npm start
```

---

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
