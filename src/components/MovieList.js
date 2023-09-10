import "../index.css";
import Movie from "./Movie";

export default function MovieList({movies, onSelect}) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imbdID} onSelect={onSelect} />
      ))}
    </ul>
  );
}
