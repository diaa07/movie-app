import MovieCard from "../components/MovieCard";
import "../styles/Home.css";
import { useMovies } from "../contexts/MoviesContext";

function Home() {
  const { search, setSearch, movies, error, loading, searchMovies } =
    useMovies();

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(search);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} id="top">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for movies"
          value={search}
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="movies-grid">
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : error ? null : (
          <p style={{ color: "#666", textAlign: "center" }}>
            {loading ? "Loading..." : "No movies found."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
