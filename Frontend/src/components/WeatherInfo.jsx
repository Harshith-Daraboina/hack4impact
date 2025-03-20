import React from "react";

export default function WeatherInfo({ weatherData }) {
    if (!weatherData) return <div className="p-4">Enter a location to see weather data.</div>;

    return (
        <div className="p-4 w-1/3">
            <h2 className="text-xl font-bold">{weatherData.location}</h2>
            <p>🌡️ Temperature: {weatherData.temperature}°C</p>
            <p>💧 Humidity: {weatherData.humidity}%</p>
            <p>💨 Wind Speed: {weatherData.wind_speed} m/s</p>
            <p>☀️ Solar Radiation: {weatherData.solar_radiation} W/m²</p>
        </div>
    );
}
