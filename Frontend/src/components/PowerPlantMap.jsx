import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const solarIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Solar_power_icon.svg",
  iconSize: [30, 30],
});

const windIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Wind_turbine_icon.svg",
  iconSize: [30, 30],
});

const solarPlants = [
  { name: "AURAIYA", state: "Uttar Pradesh", lat: 26.8756, lon: 79.5133, capacity: 40 },
  { name: "DADRI SOLAR", state: "Uttar Pradesh", lat: 28.5506, lon: 77.6074, capacity: 5 },
  { name: "DEVIKOT Solar", state: "Rajasthan", lat: 26.9124, lon: 70.9092, capacity: 240 },
  { name: "FATEHGARH SOLAR PV PROJECT", state: "Rajasthan", lat: 27.2500, lon: 74.9833, capacity: 296 },
  { name: "KOLAYAT SOLAR POWER", state: "Rajasthan", lat: 27.8320, lon: 73.2860, capacity: 400 },
  { name: "NOKHRA Solar", state: "Rajasthan", lat: 26.5000, lon: 73.0000, capacity: 300 },
  { name: "NTPC ANTA SOLAR PV STATION", state: "Rajasthan", lat: 25.0000, lon: 76.5000, capacity: 57 },
  { name: "SINGRAULI SOLAR", state: "Uttar Pradesh", lat: 24.2000, lon: 82.7000, capacity: 15 },
  { name: "UNCHAHAR SOLAR", state: "Uttar Pradesh", lat: 25.9000, lon: 81.5000, capacity: 10 }
];

const windPlants = [
  { name: "ADANI WIND ENERGY KUTCHH FOUR LTD", state: "Gujarat", lat: 23.7333, lon: 68.8333, capacity: 203.7 },
  { name: "ALFANAR WIND (NANAVALKA)", state: "Gujarat", lat: 23.6833, lon: 69.6000, capacity: 300 },
  { name: "APRAAVA ENERGY PRIVATE LIMITED (AEPL)", state: "Gujarat", lat: 23.5000, lon: 69.0000, capacity: 201.6 },
  { name: "ASIPL WIND (BARANDA)", state: "Gujarat", lat: 23.4000, lon: 68.9000, capacity: 166 },
  { name: "AWEK1L WIND (RATADIYA)", state: "Gujarat", lat: 23.6000, lon: 69.1000, capacity: 425 }
];

export default function PowerPlantMap() {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      let newWeatherData = {};
      for (let plant of [...solarPlants, ...windPlants]) {
        try {
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${plant.lat}&longitude=${plant.lon}&current=temperature_2m,wind_speed_10m&timezone=auto`
          );
          const data = response.data.current;
          
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
    <MapContainer center={[25.0, 78.0]} zoom={5} className="h-screen w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {solarPlants.map((plant) => (
        <Marker key={plant.name} position={[plant.lat, plant.lon]} icon={solarIcon}>
          <Popup>
            <strong>{plant.name}</strong> ({plant.state}) <br />
            ☀️ Type: Solar <br />
            ⚡ Capacity: {plant.capacity} MW <br />
            🌡️ Temp: {weatherData[plant.name]?.temperature}°C <br />
            💨 Wind: {weatherData[plant.name]?.windSpeed} m/s <br />
            ⚡ Estimated Output: {weatherData[plant.name]?.powerOutput} MW
          </Popup>
        </Marker>
      ))}

      {windPlants.map((plant) => (
        <Marker key={plant.name} position={[plant.lat, plant.lon]} icon={windIcon}>
          <Popup>
            <strong>{plant.name}</strong> ({plant.state}) <br />
            🌬️ Type: Wind <br />
            ⚡ Capacity: {plant.capacity} MW <br />
            🌡️ Temp: {weatherData[plant.name]?.temperature}°C <br />
            💨 Wind: {weatherData[plant.name]?.windSpeed} m/s <br />
            ⚡ Estimated Output: {weatherData[plant.name]?.powerOutput} MW
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}