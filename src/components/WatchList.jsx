import React, { useState } from "react";
import genreIds from "../utility/genre";

function WatchList({ watchlist, setWatchlist, handleRemoveFromWatchList }) {
  const [search, setSearch] = useState("");
  const [currGenre, setCurrGenre] = useState("All Genres");

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortIncreasing = () => {
    let sorted = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sorted]);
  };

  let sortDecreasing = () => {
    let sorted = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sorted]);
  };

  let handleFilter = (genre) => {
    setCurrGenre(genre);
    console.log(genre);
  };

  const genreCountMap = watchlist.reduce((acc, movie) => {
    const genreId = movie.genre_ids[0];
    const genreName = genreIds[genreId];

    if (genreName) {
      acc[genreName] = (acc[genreName] || 0) + 1;
    }
    return acc;
  }, {});

  const genreListwithCounts = [
    ["All Genres", 0],
    ...Object.entries(genreCountMap),
  ];

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreListwithCounts.map(([genre, count]) => {
          return (
            <div
              key={genre}
              onClick={() => handleFilter(genre)}
              // flex justify-center items-center text-white text-center font-bold rounded-lg  h-[3rem] w-[9rem] mr-4 gap-2 mb-2 sm:mb-4 md:mb-6 lg:mb-8
              className={` cursor-pointer px-2 py-1 ${
                currGenre === genre
                  ? "text-blue-600 underline font-semibold"
                  : "text-gray-600 hover:text-blue-400"
              }`}
            >
              {genre} {genre !== "All Genres" && count > 1 ? `(${count})` : ""}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Search a movie..."
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4 rounded-lg"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th>
                <div className="flex justify-center">
                  <div className="p-2" onClick={sortDecreasing}>
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <span className="p-2">Rating</span>
                  <div className="p-2" onClick={sortIncreasing}>
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currGenre === "All Genres") {
                  return true;
                } else {
                  return genreIds[movieObj.genre_ids[0]] === currGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr key={movieObj.id} className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[18rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                        alt=""
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreIds[movieObj.genre_ids[0]]}</td>
                    <td
                      onClick={() => handleRemoveFromWatchList(movieObj)}
                      className="text-red-600"
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
