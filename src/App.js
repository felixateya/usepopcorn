import { useState } from "react";
import { Loader } from "./utils/Loader";
import { ErrorMessage } from "./utils/ErrorMessage";
import { NavBar } from "./Pages/NavBar";
import { NumResults } from "./Components/NumResults";
import { Search } from "./Search";
import { Main } from "./Pages/Main";
import { Box } from "./Components/Box";
import { MovieList } from "./utils/MovieList";
import { MovieDetails } from "./MovieDetails";
import { WatchedMovieList } from "./utils/WatchedMovieList";
import { WatchedSummarry } from "./utils/WatchedSummarry";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "4e8fee6";

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

const [watched, setWatched] = useLocalStorageState([], "watched")

  

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  

  return (
    <>
      <NavBar query={query}>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummarry watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        /> */}
        <Box>
          {/* {isLoading ? <Loader/> : <MovieList movies={movies}/>} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummarry watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
