const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch popular movies");
  const data = await response.json();
  return data.results;
};

export const getSearchQuery = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Failed to search movies");
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch movie details");
  return await response.json();
};

export const getMovieVideos = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch movie videos");
  const data = await response.json();
  return data.results;
};

export const getMovieCredits = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch movie credits");
  return await response.json();
};