import "./App.css";
import MyNav from "./components/MyNav";
import WeatherSearch from "./components/WeatherSearch";
import CurrentWeather from "./components/CurrentWeather";
import DynamicBackground from "./components/DynamicBackground";
import { WeatherContextProvider } from "./context/WeatherContext";

function App() {
  return (  
    <div>
      <WeatherContextProvider>
        <MyNav />
        <DynamicBackground />
        <main className="w-full px-4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto rounded-lg mb-16">
          <WeatherSearch />
          <CurrentWeather />
        </main>
      </WeatherContextProvider>
    </div>
  );
}

export default App;
