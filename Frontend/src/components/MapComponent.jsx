import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// Default location: New Delhi, India
const DEFAULT_CENTER = [28.6139, 77.2090];
const DEFAULT_ZOOM = 6;

// ✅ Generate today's date for NASA GIBS
const today = new Date().toISOString().split("T")[0];

// ✅ API Key
const OPENWEATHER_API_KEY = "c292a76aa27bd280ab4b44db7e5559ba";

// ✅ Base Map Layers
const BASE_LAYERS = {
  "OpenStreetMap": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "Esri Satellite": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  "OpenWeather Temperature": `https://tile.openweathermap.org/map/temp/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
  "OpenWeather Wind Speed": `https://tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
  "OpenWeather Clouds": `https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
  "OpenWeather Precipitation": `https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
  "NASA Temperature": `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_LST_Day/default/${today}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`,
  "NASA Humidity": `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/AIRS_Total_Precipitable_Water_A/default/${today}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`,
  "NASA Cloud Cover": `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Cloud_FR/default/${today}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`
};

// ✅ Map Updater
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
  const [mapType, setMapType] = useState("OpenStreetMap");

  // ✅ Debugging
  useEffect(() => {
    console.log("Selected Map Type:", mapType);
    console.log("Tile URL:", BASE_LAYERS[mapType] || "Not Found");
  }, [mapType]);

  return (
    <div className="relative w-full h-screen">
      {/* 🔹 Map Selector */}
      <div className="absolute top-3 left-20 z-1000 bg-white p-3 rounded-md shadow-lg border border-gray-300">
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Select Map Type:
        </label>
        <select
          value={mapType}
          onChange={(e) => setMapType(e.target.value)}
          className="border border-gray-400 rounded-md p-2 w-full text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(BASE_LAYERS).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* 🔹 Map Container */}
      <MapContainer center={mapCenter || DEFAULT_CENTER} zoom={DEFAULT_ZOOM} className="absolute top-0 left-0 w-full h-full">
        <TileLayer url={BASE_LAYERS[mapType]} errorTileUrl="https://via.placeholder.com/256/ff0000/ffffff?text=Error" />
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
