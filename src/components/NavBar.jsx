import { useNavigate, Link } from "react-router-dom";
import { useMovies } from "../contexts/MoviesContext";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const { setSearch, loadPopular } = useMovies();
  const { theme, toggleTheme } = useTheme();

  const handleGoHome = () => {
    setSearch("");
    loadPopular();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav>
      <div className="logo">
        <span
          className="name"
          onClick={handleGoHome}
          style={{ cursor: "pointer" }}
        >
          Movies App
        </span>
      </div>
      <div className="pages-links">
        <span
          className="btn"
          onClick={handleGoHome}
          style={{ cursor: "pointer" }}
        >
          Home
        </span>
        <Link to="/favs" className="btn">
          Favs
        </Link>
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "1px solid #ccc",
            color: "inherit",
            padding: "5px 10px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
          title="Toggle Dark/Light Mode"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
