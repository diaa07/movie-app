import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieVideos, getMovieCredits } from "../reqs/api";
import { useFavs } from "../contexts/FavouritesContext";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFav, handleFavs } = useFavs();

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const dataMovie = await getMovieDetails(id);
        setMovie(dataMovie);

        const videos = await getMovieVideos(id);
        const trailer = videos.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        if (trailer) setTrailerKey(trailer.key);
        else setTrailerKey(null);

        const credits = await getMovieCredits(id);
        setCast(credits.cast);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) return <div className="details-container">Loading...</div>;
  if (error) return <div className="details-container error">{error}</div>;
  if (!movie) return null;

  return (
    <div className="details-container">
      <div className="poster-section">
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="info-section">
        <h1>{movie.title}</h1>
        <p className="tagline">{movie.tagline}</p>
        <p className="genres">{movie.genres?.map((g) => g.name).join(", ")}</p>
        <p>🕒 {movie.runtime} minutes</p>
        <p>⭐ {movie.vote_average} / 10</p>
        <p>📅 Released: {movie.release_date}</p>
        <p className="overview">{movie.overview}</p>

        <div className="buttons">
          <button
            onClick={() => handleFavs(movie)}
            className={`fav-btn ${isFav(movie.id) ? "active" : ""}`}
          >
            {isFav(movie.id) ? "♥ Remove from Favs" : "♡ Add to Favs"}
          </button>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>

        {trailerKey && (
          <div className="trailer-section">
            <h2>Trailer</h2>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {cast.length > 0 && (
          <div className="cast-section">
            <h2>Top Cast</h2>
            <div className="cast-grid">
              {cast.slice(0, 15).map((actor) => (
                <div key={actor.id} className="cast-card">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={actor.original_name}
                  />
                  <p className="actor-name">{actor.original_name}</p>
                  <p className="character-name">as {actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
