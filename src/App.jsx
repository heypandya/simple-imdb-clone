import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  let [watchlist, setWatchlist] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    // console.log("Adding:", movieObj.original_title);
    const newWatchlist = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
    console.table(newWatchlist);
  };

  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchlist = watchlist.filter(
      (movie) => movie.id !== movieObj.id
    );
    setWatchlist(filteredWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist));
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchlist(JSON.parse(moviesFromLocalStorage));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />{" "}
                <Movies
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                  watchlist={watchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
