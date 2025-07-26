import React from "react";
import Logo from "../imdb.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex space-x-8 items-center pl-3 py-4">
      <img className="w-[50px]" src={Logo} alt="logo" />
      <Link to="/" className="text-blue-400 text-xl font-bold">
        Movies
      </Link>
      <Link to="/watchlist" className="text-blue-400 text-xl font-bold">
        WatchList
      </Link>
    </div>
  );
}

export default Navbar;
