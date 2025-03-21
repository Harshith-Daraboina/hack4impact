import React from "react";
import Sidebar from "../components/Sidebar";
import MapComponent from "../components/MapComponent";
import SearchBar from "../components/SearchBar";

export default function trends({ weatherData, mapCenter, setWeatherData, setMapCenter }) {
  return (
    <div className="flex flex-col flex-1 relative">
      <div className="absolute top-4 right-4 z-[1000]">
        <SearchBar setWeatherData={setWeatherData} setMapCenter={setMapCenter} />
      </div>
   

      {/* Floating Search Bar */}

      {/* Main Content */}
      <div className="flex flex-1">
        <Sidebar weatherData={weatherData} />
        <MapComponent weatherData={weatherData} mapCenter={mapCenter} />
      </div>
    </div>
  );
}
