import {useEffect, useState} from "react";

export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);

  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=db10e284&s=${query}`,
            {signal: controller.signal}
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching data");
          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return {movies, error};
}
