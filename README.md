# 🎬 Movies App

A React-based movie browsing app that allows users to:

- 🔍 Search for movies
- ❤️ Mark favourites
- 🌗 Toggle between dark and light themes
- 🎞️ View detailed movie info including trailers and cast

TMDB API 👉 https://www.themoviedb.org/

---

## ✨ Features

- 🔄 **Browse Popular Movies** (from TMDB API)
- 🧠 **Search Functionality**
- 📌 **Add/Remove Favourites** (stored in localStorage)
- 🌙 **Dark/Light Theme Toggle**
- 🎬 **Detailed Movie Page** with:
  - Overview
  - Runtime, Rating, Release Date
  - Genres
  - YouTube Trailer
  - Top Cast

---

## 🛠️ Tech Stack

| Tool / Library     | Purpose                      |
| ------------------ | ---------------------------- |
| `React`            | Frontend framework           |
| `Vite`             | Fast build tool & dev server |
| `React Router DOM` | Routing between pages        |
| `TMDB API`         | Movie data source            |
| `localStorage`     | Persisting favourite movies  |
| `Context API`      | Global state management      |
| `CSS`              | Styling and themes           |

---

## 📂 Project Structure

src/
├── components/ # Reusable components like MovieCard, NavBar
├── pages/ # Home, MovieDetails, Favourites
├── contexts/ # ThemeContext, MovieContext, FavouritesContext
├── styles/ # CSS files
├── reqs/api.js # API calls to TMDB
└── App.jsx # Main App with routes
