import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Favourites from "./pages/Favourites";
import MovieDetails from "./pages/MovieDetails";
import "./styles/Home.css";
import { FavsProvider } from "./contexts/FavouritesContext";
import { MovieProvider } from "./contexts/MoviesContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  useEffect(() => {
    document.body.classList.add("dark");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme != "dark") {
      document.body.classList.remove("dark", "light");
      document.body.classList.add(savedTheme);
    }
  }, []);

  return (
    <ThemeProvider>
      <MovieProvider>
        <FavsProvider>
          <div className="body">
            <div className="app">
              <NavBar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/favs" element={<Favourites />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
              </main>
            </div>
          </div>
        </FavsProvider>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
