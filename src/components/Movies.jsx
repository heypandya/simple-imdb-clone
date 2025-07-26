import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({
  handleAddtoWatchlist,
  handleRemoveFromWatchList,
  watchlist,
}) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const handlePrev = () => {
    if (page === 0) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  // console.log(movies);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=b24140c83ba03046498a532f48c697f9&language=en-US&page=${page}`
      )
      .then(function (response) {
        setMovies(response.data.results);
      });
  }, [page]);

  return (
    <div>
      <div className="text-xl font-bold text-center m-5">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-8 m-5">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.title}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchlist={watchlist}
            />
          );
        })}
      </div>

      <Pagination handlePrev={handlePrev} handleNext={handleNext} page={page} />
    </div>
  );
}

export default Movies;

// https://api.themoviedb.org/3/movie/popular?api_key=b24140c83ba03046498a532f48c697f9&language=en-US&page=1
