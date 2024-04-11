import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedMovie
          key={index}
          movie={movie}
          onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
}
