import "../index.css";
import Summary from "./Summary";
import WatchedList from "./WatchedList";
import SelectedMovie from "./SelectedMovie";

export default function WatchedBox({
  watched,
  selectedId,
  onClose,
  onAddWatched,
  onDeleteWatched,
}) {
  return (
    <div className='box'>
      {selectedId ? (
        <SelectedMovie
          selectedId={selectedId}
          onClose={onClose}
          onAddWatched={onAddWatched}
          watched={watched}
        />
      ) : (
        <>
          <Summary watched={watched} />
          <WatchedList watched={watched} onDeleteWatched={onDeleteWatched} />
        </>
      )}
    </div>
  );
}
