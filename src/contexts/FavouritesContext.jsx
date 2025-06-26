import { useEffect, useState, createContext, useContext } from "react";

const FavsContext = createContext();

export const FavsProvider = ({ children }) => {
  const [favs, setFavs] = useState(() => {
    const tmp = localStorage.getItem("favs");
    return tmp ? JSON.parse(tmp) : [];
  });

  useEffect(() => {
    const tmp = localStorage.getItem("favs");
    if (tmp) {
      setFavs(JSON.parse(tmp));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs]);

  const handleFavs = (movie) => {
    setFavs((prev) => {
      const flag = prev.find((curr) => curr.id === movie.id);
      return flag
        ? prev.filter((curr) => curr.id !== movie.id)
        : [...prev, movie];
    });
  };

  const isFav = (movieId) => {
    return favs.some((curr) => curr.id === movieId);
  };
  return (
    <FavsContext.Provider value={{ favs, handleFavs, isFav }}>
      {children}
    </FavsContext.Provider>
  );
};

export const useFavs = () => useContext(FavsContext);
