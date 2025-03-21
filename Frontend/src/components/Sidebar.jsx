import React from "react";

export default function Sidebar({ weatherData }) {
  return (
    <div className="p-4 bg-gray-200 text-black">
      {weatherData ? (
        <div>
          <h2 className="text-xl font-bold">{weatherData.location}</h2>
          <p>🌡️ Temperature: {weatherData.temperature}°C</p>
          <p>💧 Humidity: {weatherData.humidity}%</p>
          <p>💨 Wind Speed: {weatherData.windSpeed} m/s</p>
          <p>📍 Coordinates: {weatherData.coordinates.join(", ")}</p>
          <p>⚡ Pressure: {weatherData.pressure} hPa</p>
        </div>
      ) : (
        <p>Enter a location to see weather data.</p>
      )}
    </div>
  );
}
