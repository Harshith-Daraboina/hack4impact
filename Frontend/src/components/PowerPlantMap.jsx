import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

const powerPlants = [
  { name: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  { name: "Delhi", lat: 28.7041, lon: 77.1025 },
  { name: "Haryana", lat: 29.0588, lon: 76.0856 },
  { name: "Himachal Pradesh", lat: 31.1048, lon: 77.1734 },
  { name: "Jammu and Kashmir", lat: 33.7782, lon: 76.5762 },
  { name: "Ladakh", lat: 34.1526, lon: 77.5771 },
  { name: "Punjab", lat: 31.1471, lon: 75.3412 },
  { name: "Rajasthan", lat: 27.0238, lon: 74.2179 },
  { name: "Uttar Pradesh", lat: 26.8467, lon: 80.9462 },
];

export default function PowerPlantMap() {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      let newWeatherData = {};
      for (let plant of powerPlants) {
        try {
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${plant.lat}&longitude=${plant.lon}&current=temperature_2m,wind_speed_10m&timezone=auto`
          );
          const data = response.data.current;
          
          // Simple power prediction formula
          const powerOutput = (data.temperature_2m * 5) + (data.wind_speed_10m * 10);

          newWeatherData[plant.name] = {
            temperature: data.temperature_2m,
            windSpeed: data.wind_speed_10m,
            powerOutput: powerOutput.toFixed(2),
          };
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
      setWeatherData(newWeatherData);
    };

    fetchWeatherData();
  }, []);

  return (
    <MapContainer center={[28.6139, 77.209]} zoom={5} className="h-screen w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {powerPlants.map((plant) => (
        <Marker key={plant.name} position={[plant.lat, plant.lon]}>
          <Popup>
            <strong>{plant.name}</strong> <br />
            🌡️ Temp: {weatherData[plant.name]?.temperature}°C <br />
            💨 Wind: {weatherData[plant.name]?.windSpeed} m/s <br />
            ⚡ Power Output: {weatherData[plant.name]?.powerOutput} MW
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
