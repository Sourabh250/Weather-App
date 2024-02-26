import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

function DynamicBackground() {
  const { weather } = useContext(WeatherContext);
  const [background, setBackground] = useState({
    type: "image",
    source: "/images/kenrick-mills-unsplash.webp"
  });

  useEffect(() => {
    let video;
    const updateBackground = () => {
      const weatherCondition = weather.weather[0].main.toLowerCase();

      if (["clouds", "rain"].includes(weatherCondition)) {
        const videoSrc = "/videos/m2-res_720p.mp4";
        if (background.type !== 'video') {
          video = document.createElement('video');
          video.src = videoSrc;
          const handleLoadedData = () => {
            setBackground({
              type: "video",
              source: videoSrc
            });
          }
          video.addEventListener('loadeddata', handleLoadedData);
          video.load();
        }
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

    return () => {
      if(video) {
        video.removeEventListener('loadeddata', () => {})
      }
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
