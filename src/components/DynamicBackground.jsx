import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

function DynamicBackground() {
  const { weather } = useContext(WeatherContext);
  const [background, setBackground] = useState({
    type: "image",
    source: "/images/kenrick-mills-unsplash.webp"
  });

  useEffect(() => {
    const updateBackground = () => {
      const weatherCondition = weather.weather[0].main.toLowerCase();

      if (["clouds", "rain"].includes(weatherCondition) && background.type !== 'video') {
        setBackground({
          type: "video",
          source: "/videos/m2-res_720p.mp4"
        });
      } else if (!["clouds", "rain"].includes(weatherCondition) && background.type !== "image") {
        setBackground({
          type: "image",
          source: "/images/kenrick-mills-unsplash.webp"
        });
      }
    };

    if (weather) {
      updateBackground();
    }
  }, [weather, background.type]);

  return (
    <>
      {background.type === 'video' ? (
        <video autoPlay loop muted playsInline className="object-cover h-full w-full fixed -z-10 top-0">
          <source src={background.source} type="video/mp4" />
        </video>
      ) : (
        <div className="bg-cover bg-center h-full w-full fixed -z-10 top-0" style={{ backgroundImage: `url(${background.source})` }} ></div>
      )}
    </>
  )
}

export default DynamicBackground;