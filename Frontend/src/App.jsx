// import React, { useState } from "react";
// import SearchBar from "./components/SearchBar";
// import MapComponent from "./components/MapComponent";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";

// export default function App() {
//   const [weatherData, setWeatherData] = useState(null);
//   const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: India

//   return (
//     <div className="h-screen flex flex-col">
//           {/* Static Navbar */}
//           <Navbar setWeatherData={setWeatherData} setMapCenter={setMapCenter} />

//           {/* Main Content */}
//           <div className="flex flex-1">
//             <Sidebar weatherData={weatherData} />
//             <MapComponent weatherData={weatherData} mapCenter={mapCenter} />
//           </div>
//         </div>

//     // <div className="flex h-screen">
//     //   <Sidebar weatherData={weatherData} />
//     //   <div className="flex-1">
//     //     <div className="bg-blue-600 p-4 text-white text-center font-bold">
//     //       India Weather & Energy Insights
//     //     </div>
//     //     <SearchBar setWeatherData={setWeatherData} setMapCenter={setMapCenter} />
//     //     <MapComponent weatherData={weatherData} mapCenter={mapCenter} />
//     //   </div>
//     // </div>
//   );
// }

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Trends from "./pages/Trends";
import Download from "./pages/Download";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: India

  return (
    <Router>
      <div className="h-screen flex flex-col">
        {/* Static Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <div className="flex flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home weatherData={weatherData} mapCenter={mapCenter} setWeatherData={setWeatherData} setMapCenter={setMapCenter} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/download" element={<Download />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
