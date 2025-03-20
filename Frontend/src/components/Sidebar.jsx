import React from "react";

export default function Sidebar({ weatherData }) {
  return (
    <div className="p-4 bg-gray-200 w-1/4 h-full">
      {weatherData ? (
        <div>
          <h2 className="text-xl font-bold">{weatherData.name}</h2>
          <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>💨 Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>📍 Coordinates: {weatherData.coord.lat}, {weatherData.coord.lon}</p>
          <p>⚡ Pressure: {weatherData.main.pressure} hPa</p>
        </div>
      ) : (
        <p>Enter a location to see weather data.</p>
      )}
    </div>
  );
}
