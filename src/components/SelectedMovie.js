import "../index.css";
import {useState, useEffect, useRef} from "react";
import Stars from "./Stars";

export default function SelectedMovie({
  selectedId,
  onClose,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Year: year,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const [userRating, setUserRating] = useState("");

  const counterRef = useRef(0);

  useEffect(
    function () {
      if (userRating) counterRef.current = counterRef.current + 1;
    },
    [userRating]
  );

  useEffect(
    function () {
      function callBack(e) {
        if (e.code === "Escape") {
          onClose();
        }
      }
      document.addEventListener("keydown", callBack);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [onClose]
  );

  useEffect(
    function () {
      async function getMovie() {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=db10e284&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
      }
      getMovie();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "Movie List";
      };
    },
    [title]
  );

  function handleAddMovie() {
    const watchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      counterRatingDecision: counterRef.current,
    };
    onAddWatched(watchedMovie);
    onClose();
  }

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  return (
    <div className='details'>
      <header>
        <button className='btn-back' onClick={onClose}>
          &larr;
        </button>
        <img src={poster} alt={movie.title}></img>
        <div className='details-overview'>
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime} &bull;
          </p>
          <p>{genre}</p>
          <p>
            <span>🌟</span>
            {imdbRating} IMDB rating
          </p>
        </div>
      </header>
      <section>
        <div className='rating'>
          {!isWatched ? (
            <>
              <Stars
                maxRating={10}
                setRating={setUserRating}
                rating={userRating}
              />
              {userRating > 0 && (
                <button className='btn-add' onClick={handleAddMovie}>
                  + Add on list
                </button>
              )}
            </>
          ) : (
            <p> You rated this movie with {watchedUserRating} ⭐</p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        {actors ? <p>Starring {actors}</p> : ""}
        {director ? <p>Directed by {director}</p> : ""}
      </section>
    </div>
  );
}
