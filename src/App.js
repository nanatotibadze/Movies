import {useState} from "react";
import {useMovies} from "./components/Custom Hooks/useMovies";
import {useLocalStortage} from "./components/Custom Hooks/useLocalStorage";

import Navbar from "./components/Navbar";
import Main from "./components/Main";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStortage([], "watched");

  const [selectedId, setSelectedId] = useState(null);
  const {movies, error} = useMovies(query);

  function handleSelectedMovie(id) {
    setSelectedId((selected) => (selected === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => id !== movie.imdbID));
  }

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />

      <Main
        movies={movies}
        watched={watched}
        error={error}
        selectedId={selectedId}
        onSelect={handleSelectedMovie}
        onClose={handleCloseMovie}
        onAddWatched={handleAddWatchMovie}
        onDeleteWatched={handleDeleteMovie}
      />
    </>
  );
}
