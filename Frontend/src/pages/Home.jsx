import React from "react";
import Sidebar from "../components/Sidebar";
import MapComponent from "../components/MapComponent";
import SearchBar from "../components/SearchBar";

export default function Home({ weatherData, mapCenter, setWeatherData, setMapCenter }) {
  return (
    <div className="flex flex-col flex-1 relative">
    {/* // <div className="fixed top-20 right-6 bg-red-500 p-4"> */}

      {/* Floating Search Bar */}
      <SearchBar setWeatherData={setWeatherData} setMapCenter={setMapCenter} />

      {/* Main Content */}
      <div className="flex flex-1">
        <Sidebar weatherData={weatherData} />
        <MapComponent weatherData={weatherData} mapCenter={mapCenter} />
      </div>
    </div>
  );
}
