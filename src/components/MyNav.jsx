import React from "react";
import logo from "../logo.svg";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

function MyNav() {
  return (
    <nav className="h-16  text-white bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-12 mr-3" />
          <h1 className="text-xl font-bold">WeatherApp</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-gray-300 hidden sm:block">
            <FaBell className="text-xl" />
          </button>
          <button className="text-white hover:text-gray-300 hidden sm:block">
            <FaSearch className="text-xl" />
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-40 text-sm py-2 px-4 rounded-full transition duration-300 ease-in-out">
            Search
          </button>
          <button className="bg-purple-500 hover:bg-purple-700 px-4  py-2 rounded-full transition duration-300 ease-in-out">
            S
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MyNav;
