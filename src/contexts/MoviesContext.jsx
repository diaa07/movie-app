import { createContext, useContext, useState, useEffect } from "react";
import { getPopularMovies, getSearchQuery } from "../reqs/api";
const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadPopular = async () => {
    setLoading(true);
    try {
      const res = await getPopularMovies();
      setMovies(res);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };
  const searchMovies = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await getSearchQuery(query);
      setMovies(results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadPopular();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        search,
        setSearch,
        movies,
        setMovies,
        error,
        loading,
        loadPopular,
        searchMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
