import React, { useState } from "react";
import axios from "axios";

export default function SearchBar({ setWeatherData, setMapCenter }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = "c292a76aa27bd280ab4b44db7e5559ba";

  // Fetch location suggestions
  const fetchSuggestions = async (query) => {
    if (!query) return;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
    const response = await axios.get(url);
    setSuggestions(response.data);
  };

  // Handle search
  const handleSearch = async (location) => {
    setQuery(location.name);
    setSuggestions([]);
    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(weatherUrl);
    
    setWeatherData(response.data);
    setMapCenter([location.lat, location.lon]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Enter Location"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        className="p-2 w-full border rounded"
      />
      <ul className="absolute bg-white w-full border mt-1">
        {suggestions.map((loc) => (
          <li
            key={loc.lat}
            onClick={() => handleSearch(loc)}
            className="p-2 cursor-pointer hover:bg-gray-200"
          >
            {loc.name}, {loc.country}
          </li>
        ))}
      </ul>
    </div>
  );
}
