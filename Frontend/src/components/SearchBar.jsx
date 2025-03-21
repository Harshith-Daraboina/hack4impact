import React, { useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function SearchBar({ setWeatherData, setMapCenter }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch location suggestions from Open-Meteo
  const fetchSuggestions = async (query) => {
    if (!query) return;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`;

    try {
      const response = await axios.get(url);
      if (response.data.results) {
        setSuggestions(response.data.results);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Handle search selection
  const handleSearch = async (location) => {
    setQuery(location.name);
    setSuggestions([]);
    setIsOpen(false);

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure&timezone=auto`;

    try {
      const response = await axios.get(weatherUrl);
      setWeatherData({
        location: `${location.name}, ${location.country}`,
        temperature: response.data.current.temperature_2m,
        humidity: response.data.current.relative_humidity_2m,
        windSpeed: response.data.current.wind_speed_10m,
        pressure: response.data.current.surface_pressure,
        coordinates: [location.latitude, location.longitude],
      });

      setMapCenter([location.latitude, location.longitude]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="fixed top-24 right-6 z-[1000]"> {/* Increased top spacing and z-index */}
      {/* Floating Search Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <FiSearch size={24} />
        </button>
      )}

      {/* Expanded Search Bar */}
      {isOpen && (
        <div className="absolute right-0 bg-white shadow-lg rounded-lg p-3 w-72 z-[1000]"> 
          {/* z-[1000] ensures it's above the map */}
          <div className="flex items-center border-b pb-2">
            <input
              type="text"
              placeholder="Search Location..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="flex-1 p-2 text-black bg-white border border-gray-300 rounded-md outline-none"
              autoComplete="on"
            />
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <IoClose size={24} />
            </button>
          </div>

          {/* Location Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 mt-2 shadow-lg rounded-md max-h-40 overflow-y-auto z-[1000]">
              {suggestions.map((loc) => (
                <li
                  key={loc.id}
                  onClick={() => handleSearch(loc)}
                  className="p-2 cursor-pointer hover:bg-gray-100 text-black"
                >
                  {loc.name}, {loc.country}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
