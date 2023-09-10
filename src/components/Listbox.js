import "../index.css";
import MovieList from "./MovieList";

export default function Listbox({movies, error, onSelect, onClose}) {
  return (
    <div className='box'>
      {!error && (
        <MovieList movies={movies} onSelect={onSelect} onClose={onClose} />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

function ErrorMessage({message}) {
  return <p className='error'>{message}</p>;
}
