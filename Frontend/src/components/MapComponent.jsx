import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// Default location: New Delhi, India
const DEFAULT_CENTER = [28.6139, 77.2090];
const DEFAULT_ZOOM = 6;

// ✅ Your API keys
const METEOBLUE_API_KEY = "FLu6eSrHTs8nd3vD";
const WINDY_API_KEY = "yYWwZlZElTmbYq3GBIYFzWvUUnWLsu6B";
const OPEN_WEATHER_API_KEY = "c292a76aa27bd280ab4b44db7e5559ba";

// ✅ Base Map Layers
const BASE_LAYERS = {
  "OpenStreetMap (Normal)": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "Esri Satellite": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  "MeteoBlue Weather": `https://maps.meteoblue.com/1.0/signlayer/{z}/{x}/{y}.png?apikey=${METEOBLUE_API_KEY}`,
  "Windy Temperature": `https://tiles.windy.com/temp_new/{z}/{x}/{y}.png?token=${WINDY_API_KEY}`,
  "Windy Wind Speed": `https://tiles.windy.com/wind_new/{z}/{x}/{y}.png?token=${WINDY_API_KEY}`,
  "Windy Rainfall": `https://tiles.windy.com/rain_new/{z}/{x}/{y}.png?token=${WINDY_API_KEY}`,
  "Windy Humidity": `https://tiles.windy.com/humidity_new/{z}/{x}/{y}.png?token=${WINDY_API_KEY}`,
};

// ✅ Map Updater: Updates the map center on location change
function MapUpdater({ mapCenter }) {
  const map = useMap();
  useEffect(() => {
    if (mapCenter) {
      map.setView(mapCenter, DEFAULT_ZOOM, { animate: true });
    }
  }, [mapCenter, map]);
  return null;
}

// ✅ Main Map Component
export default function MapComponent({ weatherData, mapCenter }) {
  const [mapType, setMapType] = useState("OpenStreetMap (Normal)");

  // ✅ Debugging: Check if map layers are loading
  useEffect(() => {
    console.log("Selected Map Type:", mapType);
    console.log("Tile URL:", BASE_LAYERS[mapType]);
  }, [mapType]);

  return (
    <div className="relative w-full h-screen">
      {/* 🔹 Map Type Selector */}
      <div className="absolute top-3 left-20 z-1000 bg-white p-3 rounded-md shadow-lg border border-gray-300">
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Select Map Type:
        </label>
        <select
          value={mapType}
          onChange={(e) => setMapType(e.target.value)}
          className="border border-gray-400 rounded-md p-2 w-full text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100"
        >
          {Object.keys(BASE_LAYERS).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Map Container */}
      <MapContainer
        center={mapCenter || DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="absolute top-0 left-0 w-full h-full"
      >
        <TileLayer url={BASE_LAYERS[mapType]} />
        <MapUpdater mapCenter={mapCenter || DEFAULT_CENTER} />

        {/* 🔹 Weather Data Marker */}
        {weatherData && weatherData.coordinates && (
          <Marker position={weatherData.coordinates}>
            <Popup>
              <strong>{weatherData.location}</strong> <br />
              🌡️ Temp: {weatherData.temperature}°C <br />
              💨 Wind: {weatherData.windSpeed} m/s <br />
              💦 Humidity: {weatherData.humidity}%
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
