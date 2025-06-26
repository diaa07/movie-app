import "../styles/favourites.css";
import { Link } from "react-router-dom";
import { useFavs } from "../contexts/FavouritesContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
  const { favs } = useFavs();

  return (
    <div className="home">
      {favs.length === 0 ? (
        <div className="favourites-empty">
          <div className="text">There are no favourite movies yet</div>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      ) : (
        <div className="movies-grid">
          {favs.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
