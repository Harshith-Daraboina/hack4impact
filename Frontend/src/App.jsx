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
        <div className="flex flex-1 overflow-auto"> {/* Allow content to scroll if needed */}
          <Routes>
            <Route
              path="/"
              element={
                <Home/>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/trends" element={<Trends  weatherData={weatherData}
                  mapCenter={mapCenter}
                  setWeatherData={setWeatherData}
                  setMapCenter={setMapCenter}/>} />
            <Route path="/download" element={<Download />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}




