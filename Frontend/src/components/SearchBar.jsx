// import React, { useState } from "react";
// import axios from "axios";

// export default function SearchBar({ setWeatherData, setMapCenter }) {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const API_KEY = "c292a76aa27bd280ab4b44db7e5559ba";

//   // Fetch location suggestions
//   const fetchSuggestions = async (query) => {
//     if (!query) return;
//     const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
//     const response = await axios.get(url);
//     setSuggestions(response.data);
//   };

//   // Handle search
//   const handleSearch = async (location) => {
//     setQuery(location.name);
//     setSuggestions([]);
    
//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`;
//     const response = await axios.get(weatherUrl);
    
//     setWeatherData(response.data);
//     setMapCenter([location.lat, location.lon]);
//   };

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         placeholder="Enter Location"
//         value={query}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           fetchSuggestions(e.target.value);
//         }}
//         className="p-2 w-full border rounded"
//       />
//       <ul className="absolute bg-white w-full border mt-1">
//         {suggestions.map((loc) => (
//           <li
//             key={loc.lat}
//             onClick={() => handleSearch(loc)}
//             className="p-2 cursor-pointer hover:bg-gray-200"
//           >
//             {loc.name}, {loc.country}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function SearchBar({ setWeatherData, setMapCenter }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Controls open/close state

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
    setIsOpen(false); // Close search box after selecting

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(weatherUrl);

    setWeatherData(response.data);
    setMapCenter([location.lat, location.lon]);
  };

  return (
    // <div className="fixed top-16 right-6">
    <div className="fixed top-20 right-6 bg-red-500 p-4">

      {/* Floating Button */}
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
        <div className="relative bg-white shadow-lg rounded-lg p-3 w-72">
          <div className="flex items-center border-b pb-2">
            <input
              type="text"
              placeholder="Search Location..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="flex-1 p-2 outline-none"
            />
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <IoClose size={24} />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white w-full border mt-2 shadow-lg rounded-md max-h-40 overflow-auto">
              {suggestions.map((loc) => (
                <li
                  key={loc.lat}
                  onClick={() => handleSearch(loc)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
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
