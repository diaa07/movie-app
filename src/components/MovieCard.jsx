import "../styles/MovieCard.css";
import { useFavs } from "../contexts/FavouritesContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFav, handleFavs } = useFavs();
  const fav = isFav(movie.id);
  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`}>
        <div className="image-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.backgroundColor = "#a0a0a0";
            }}
          />
        </div>
        <div className="info-container">
          <div className="left-sec">
            <div className="movie-name" title={movie.title}>
              {movie.title}
            </div>
            <div className="movie-year">
              {movie.release_date?.split("-")[0]}
            </div>
          </div>
          <div className="right-sec">
            <button
              className={`favourites ${fav ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleFavs(movie);
              }}
              title={fav ? "Remove from favourites" : "Add to favourites"}
            >
              {fav ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
