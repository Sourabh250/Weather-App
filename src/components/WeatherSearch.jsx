import React, { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import { WeatherContext } from '../context/WeatherContext';

function useSuggestions(data) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = debounce((data) => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${data}`)
        .then((response) => response.json())
        .then((data) => {
          const addresses = data.map((item) => ({
            address: item.display_name,
            coordinates: [item.lat, item.lon],
          }));
          setSuggestions(addresses);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, 500);

    if (data.length > 3) {
      fetchSuggestions(data);
    } else {
      setSuggestions([]);
    }
    return () => {
      fetchSuggestions.cancel();
    };
  }, [data]);

  return suggestions;
}

function WeatherSearch() {
  const [val, setVal] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const suggestions = useSuggestions(val);
  const { location, updateLocation } = useContext(WeatherContext);

  useEffect(() => {
    if (!location.address) {
      setVal("");
      setShowSuggestions(false);
    }
  }, [location])

  const handleChange = (e) => {
    setVal(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestions = (suggestion) => {
    setVal(suggestion.address);
    setShowSuggestions(false);
    updateLocation({
      address: suggestion.address,
      coordinates: suggestion.coordinates
    });
  };

  return (
    <div className="text-center  mt-16 md:mt-32 flex flex-col items-center">
      <div className="relative  w-full  inline-block">
        <input
          placeholder="Search..."
          className="text-black rounded-lg shadow-sm border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out w-full py-1  pr-8 pl-4"
          type="text"
          onChange={handleChange}
          value={val}
        />
        <button className="text-gray-800 hover:text-gray-500 p-2 rounded-lg absolute right-0 top-1/2 transform -translate-y-1/2">
          <FaSearch />
        </button>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white mt-2 w-full shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestions(suggestion)}
                key={index}
              >
                {suggestion.address}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WeatherSearch;
