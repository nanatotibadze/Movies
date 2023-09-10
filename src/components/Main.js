import "../index.css";
import Listbox from "./Listbox";
import WatchedBox from "./WatchedBox";

export default function Main({
  movies,
  watched,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  error,
  selectedId,
  onSelect,
  onClose,
  onAddWatched,
  onDeleteWatched,
}) {
  return (
    <main className='main'>
      <Listbox movies={movies} error={error} onSelect={onSelect}></Listbox>
      <WatchedBox
        onClose={onClose}
        watched={watched}
        avgImdbRating={avgImdbRating}
        avgUserRating={avgUserRating}
        avgRuntime={avgRuntime}
        selectedId={selectedId}
        onAddWatched={onAddWatched}
        onDeleteWatched={onDeleteWatched}
      />
    </main>
  );
}
