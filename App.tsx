import { useEffect, useState } from "react";
import axios from "axios";
import { WeatherData } from "./types";

const App = () => {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<WeatherData>(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${import.meta.env.VITE_WEATHER_API_KEY}&units=metric\`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🌤️ Weather App</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>☁️ {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;