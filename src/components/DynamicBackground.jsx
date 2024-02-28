import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

function DynamicBackground() {
  const { weather } = useContext(WeatherContext);
  const defaultBg = "linear-gradient( #89B6E5 0%, #EBC0FD 100%)";
  const [background, setBackground] = useState(defaultBg);

  useEffect(() => {
    const updateBackground = () => {
      const weatherCondition = weather.weather[0].main.toLowerCase();
      console.log(weatherCondition);

      switch(weatherCondition) {
        case "haze" :
          setBackground("linear-gradient( #F3EFE0 0%, #EBC0FD 100%)");
          break;
        case "clouds" :
          setBackground("#BEC3C9");
          break;
        case "clear" :
          setBackground("linear-gradient( #00BFFF 0%, #EBC0FD 100%)");
          break;
        case "smoke" :
          setBackground("#A9A9A9");
          break;
        case "snow" :
          setBackground("#ADD8E6");
          break;
        case "rain" :
          setBackground("#4682B4");
          break;
        default :
          setBackground(defaultBg);
          break;
      }
    };

    if (weather) {
      updateBackground();
    }

    if (!weather) {
      setBackground(defaultBg);
    }

  }, [weather]);

  return (
    <div className="h-full w-full fixed -z-10 top-0" style={{ background: background }} ></div>
  )
}

export default DynamicBackground;
