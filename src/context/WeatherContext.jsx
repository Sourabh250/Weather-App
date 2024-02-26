import React,{ useState, createContext, useCallback } from "react";

const WeatherContext = createContext();

const WeatherContextProvider = ({children}) => {

    const [location, setLocation] = useState({address: "", coordinates: []});
    const [weather, setWeather] = useState(null);
    const updateLocation = (newLocation) => {
        setLocation(newLocation);
    }
    const updateWeather = useCallback((newWeather) => {
        setWeather(newWeather);
    },[])

    return (
        <WeatherContext.Provider value={{location, updateLocation, weather, updateWeather}}>
            {children}
        </WeatherContext.Provider>
    )
}

export {WeatherContext, WeatherContextProvider}