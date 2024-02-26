import "./App.css";
import MyNav from "./components/MyNav";
import WeatherSearch from "./components/WeatherSearch";
import CurrentWeather from './components/CurrentWeather';
import DynamicBackground from "./components/DynamicBackground";
import { WeatherContextProvider } from "./context/WeatherContext";

function App() {
  return (
    <div>
      <MyNav />
      <WeatherContextProvider>
        <DynamicBackground />
        <main className="w-full sm:w-48 md:w-96 mx-auto  rounded-lg shadow-lg">
          <WeatherSearch />
          <CurrentWeather />
        </main>
      </WeatherContextProvider>
    </div>
  );
}

export default App;
