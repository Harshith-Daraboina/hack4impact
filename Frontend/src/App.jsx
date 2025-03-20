import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MapComponent from "./components/MapComponent";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: India

  return (
    <div className="flex h-screen">
      <Sidebar weatherData={weatherData} />
      <div className="flex-1">
        <div className="bg-blue-600 p-4 text-white text-center font-bold">
          India Weather & Energy Insights
        </div>
        <SearchBar setWeatherData={setWeatherData} setMapCenter={setMapCenter} />
        <MapComponent weatherData={weatherData} mapCenter={mapCenter} />
      </div>
    </div>
  );
}
