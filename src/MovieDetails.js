import { useEffect, useState, useRef } from "react";
import StarRating from "./utils/StarRating";
import { Loader } from "./utils/Loader";
import { KEY } from "./App";
import {useKey} from './useKey'

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

const countRef = useRef(0)

useEffect(function(){
if(userRating)countRef.current++
}, [userRating])

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;



  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre,
  } = movie;
  

// if(imdbRating > 8) [isTop, setIsTop] = useState(true)
// if(imdbRating > 8) return <p>Greatest ever</p>

// const [isTop, setIsTop] = useState(imdbRating > 8)

// console.log(isTop)

// useEffect(function (){
//   setIsTop(imdbRating > 8)
// }, [imdbRating])


const isTop = imdbRating > 8
console.log(isTop)

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

useKey('Escape', onCloseMovie)

  

useEffect(function(){
  if(!title) return;
document.title = `Movie | ${title}`

return function(){
  document.title = "usePopcorn"
  // console.log(`Clean-up effect for movie ${title}`)
}
}, [title])


// const [averageRating, setAverageRating] =useState(0)

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current
    };
    onAddWatched(newWatchedMovie);
    // onCloseMovie();
    // setAverageRating(Number(imdbRating))
    // setAverageRating((averageRating)=>(averageRating + userRating)/2)
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>
                {title}: {year}
              </h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐{imdbRating}</p>
            </div>
          </header>

{/* <p>{averageRating}</p> */}

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You Rated This Movie {watchedUserRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
