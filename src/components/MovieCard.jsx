function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchlist,
  handleRemoveFromWatchList,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div
      className="relative h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchList(movieObj)}
          className="absolute top-2 right-2 h-8 w-8 flex justify-center items-center rounded-lg bg-gray-900/60 text-red-800 text-2xl font-bold"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="absolute top-2 right-2 h-8 w-8 flex justify-center items-center rounded-lg bg-gray-900/60"
        >
          &#128525;
        </div>
      )}
      <div className="absolute bottom-0 text-white text-xl w-full p-2 text-center bg-gray-900/60">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
