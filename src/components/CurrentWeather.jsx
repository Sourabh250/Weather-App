import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { FaSun, FaSnowflake, FaTint, FaWind, FaCloud, FaSpinner } from "react-icons/fa";


function CurrentWeather() {
  const { location, weather, updateWeather } = useContext(WeatherContext);
  const [isLoading, setIsLoading] = useState(false);

  const WeatherIcon = () => {
    if (!weather) return null;
    const weatherCondition = weather.weather[0].main.toLowerCase();

    if(["clouds", "rain"].includes(weatherCondition)) {
      return <FaCloud color="#BEC3C9" className="drift drop-shadow-lg" />;
    }
    
    if (weather.main.temp > 10) {
      return <FaSun className="rotate drop-shadow-lg" color="#FFD700" />;
    } else {
      return <FaSnowflake color="#00BFFF" className="shake drop-shadow-lg"  />;
    }
  }


  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      const apiKey = "fea0527750fd6589d37265142ebea344";
      const coords = [...location.coordinates];
      if (coords.length > 0) {
        const weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${apiKey}&units=metric`;
        try {
          const response = await fetch(weatherLink);
          const data = await response.json();
          console.log("Weather Api");
          updateWeather(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if(location && location.coordinates.length) {
      fetchWeather();
    }

  }, [location, updateWeather]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-32">
      <FaSpinner className="spin text-3xl" />
    </div>
    )
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="text-center pt-8 mt-4 pb-4  bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg text-white">
      <div className="text-7xl flex justify-center mb-2">
        <WeatherIcon />
      </div>

      <h1 className="text-3xl font-bold  mb-2 ">
        {weather.main.temp}&deg; C
      </h1>

      <h2 className="text-xl font-medium mb-2">
        Feels Like: {weather.main.feels_like}C
      </h2>

      <h3 className="text-2xl font-semibold mb-2 px-4">
        {location.address.split(",")[0]}
      </h3>

      <div className="flex justify-around items-center text-sm my-4">
        <div className="font-medium flex flex-col justify-center items-center">
          <FaTint color="#87CEEB" size={24} />
          <p>
            {weather.main.humidity}%<br/> <small>Humidity</small>
          </p>
        </div>
        <div className="font-medium flex flex-col justify-center items-center">
          <FaWind color="#F0E68C"  size={24} />
          <p>
            {weather.wind.speed} km/h<br/> <small>Wind Speed</small>
          </p>
        </div>
      </div>

      <p className="text-md font-medium">
        Condition: <span className="font-light">{weather.weather[0].main}</span>
      </p>
    </div>
  );
}

export default CurrentWeather;
