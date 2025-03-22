import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OPENWEATHER_API_KEY = "c292a76aa27bd280ab4b44db7e5559ba";

const locations = [
  { city: "Kamuthi", state: "Tamil Nadu", power: 648, lat: 9.3915, lon: 78.1195 },
  { city: "Hattigudur", state: "Karnataka", power: 50, lat: 16.2320, lon: 76.3930 },
  { city: "Holenarsipura", state: "Karnataka", power: 20, lat: 12.7875, lon: 76.2426 },
  { city: "Khavda", state: "Gujarat", power: 2000, lat: 23.7986, lon: 69.6356 },
  { city: "KR Pet", state: "Karnataka", power: 20, lat: 12.7676, lon: 76.4876 },
  { city: "Maskal", state: "Karnataka", power: 50, lat: 16.2997, lon: 76.4259 },
  { city: "Pavagada", state: "Karnataka", power: 350, lat: 14.1000, lon: 77.2833 },
  { city: "Periyapatna", state: "Karnataka", power: 20, lat: 12.3360, lon: 76.0980 },
  { city: "Durg", state: "Chhattisgarh", power: 100, lat: 21.1915, lon: 81.2849 },
  { city: "Madhuvanahally", state: "Karnataka", power: 100, lat: 12.2167, lon: 76.6833 },
  { city: "Budhlada", state: "Punjab", power: 30, lat: 29.9272, lon: 75.5626 },
  { city: "Kalpi", state: "Uttar Pradesh", power: 100, lat: 26.1167, lon: 79.7333 },
  { city: "Kekkireni", state: "Telangana", power: 100, lat: 17.1500, lon: 79.6167 },
  { city: "Nabarangpur", state: "Odisha", power: 40, lat: 19.2333, lon: 82.5500 },
  { city: "Nalagonda", state: "Telangana", power: 50, lat: 17.0500, lon: 79.2667 },
  { city: "Siddipet", state: "Telangana", power: 50, lat: 18.1000, lon: 78.8500 },
  { city: "Sindagi", state: "Karnataka", power: 50, lat: 16.9180, lon: 76.2330 },
  { city: "Basavana Bagewadi", state: "Karnataka", power: 80, lat: 16.5728, lon: 75.9725 },
  { city: "Byadgi", state: "Karnataka", power: 100, lat: 14.6733, lon: 75.4865 },
  { city: "Channapatna", state: "Karnataka", power: 50, lat: 12.6548, lon: 77.2060 },
  { city: "Anantapur", state: "Andhra Pradesh", power: 100, lat: 14.6833, lon: 77.6000 },
  { city: "Gani", state: "Andhra Pradesh", power: 600, lat: 15.0833, lon: 78.2333 },
  { city: "Gubbi", state: "Karnataka", power: 50, lat: 13.3126, lon: 76.9410 },
  { city: "Khilora", state: "Chhattisgarh", power: 75, lat: 21.2000, lon: 81.3500 },
  { city: "Jhansi", state: "Uttar Pradesh", power: 100, lat: 25.4486, lon: 78.5696 },
  { city: "Chitrakoot", state: "Uttar Pradesh", power: 75, lat: 25.2000, lon: 80.9000 },
  { city: "Jalalabad", state: "Uttar Pradesh", power: 50, lat: 29.6186, lon: 77.4391 },
  { city: "Mahoba", state: "Uttar Pradesh", power: 50, lat: 25.2926, lon: 79.8723 },
  { city: "Metalk", state: "Telangana", power: 50, lat: 18.2676, lon: 78.8667 },
  { city: "Pokhran and Phalodi", state: "Rajasthan", power: 50, lat: 27.1310, lon: 71.7550 },
  { city: "Sahaswan", state: "Uttar Pradesh", power: 80, lat: 28.0722, lon: 78.7500 },
  { city: "Jevargi", state: "Karnataka", power: 50, lat: 17.0139, lon: 76.7739 },
  { city: "Bagalkot", state: "Karnataka", power: 50, lat: 16.1810, lon: 75.6950 },
  { city: "Bijapur", state: "Karnataka", power: 50, lat: 16.8240, lon: 75.7154 },
  { city: "Gulbarga", state: "Karnataka", power: 50, lat: 17.3297, lon: 76.8343 },
  { city: "Indri", state: "Haryana", power: 50, lat: 29.8797, lon: 77.0586 },
  { city: "Musaddehalli", state: "Karnataka", power: 50, lat: 15.4667, lon: 75.0333 },
  { city: "Kallur", state: "Karnataka", power: 50, lat: 15.1833, lon: 77.2833 },
  { city: "Karekar", state: "Karnataka", power: 50, lat: 14.8000, lon: 74.1333 },
  { city: "Killari", state: "Maharashtra", power: 50, lat: 18.0500, lon: 76.5000 },
  { city: "Mataluru", state: "Karnataka", power: 100, lat: 15.2500, lon: 76.9500 },
  { city: "Sardargarh", state: "Rajasthan", power: 50, lat: 25.8500, lon: 73.4167 },
  { city: "Magadi", state: "Karnataka", power: 50, lat: 12.9570, lon: 77.2230 },
  { city: "Raichur", state: "Karnataka", power: 50, lat: 16.2047, lon: 77.3550 },
  { city: "Ramanagara", state: "Karnataka", power: 50, lat: 12.7214, lon: 77.2816 },
  { city: "Rawra", state: "Rajasthan", power: 10, lat: 27.5333, lon: 72.6333 },
  { city: "Shorapur", state: "Karnataka", power: 20, lat: 16.5210, lon: 76.7570 },
  { city: "T Narasipura", state: "Karnataka", power: 50, lat: 12.2134, lon: 76.8973 },
  { city: "Tilopeuru", state: "Karnataka", power: 600, lat: 14.7500, lon: 75.4000 },
  { city: "Bhadiya", state: "Rajasthan", power: 300, lat: 26.9260, lon: 71.8330 },
  { city: "Jodhpur", state: "Rajasthan", power: 250, lat: 26.2389, lon: 73.0243 },
  { city: "Bikaner", state: "Rajasthan", power: 200, lat: 28.0229, lon: 73.3119 },
  { city: "Jaisalmer", state: "Rajasthan", power: 150, lat: 26.9150, lon: 70.9080 }
];

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Fetch Weather Data
  useEffect(() => {
    if (selectedLocation) {
      const fetchWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        
        setWeatherData({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          solarIntensity: Math.floor(Math.random() * 300) + 600, // Simulated solar intensity (W/m²)
        });
      };
      fetchWeather();
    }
  }, [selectedLocation]);

  return (
    <div className="flex flex-col flex-1 relative">
      <h1 className="text-xl font-bold p-4">Adani Renewable Energy Locations</h1>
      <MapContainer center={[23.0, 78.0]} zoom={5} style={{ height: "80vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        
        {locations.map((location, index) => (
          <Marker 
            key={index} 
            position={[location.lat, location.lon]}
            eventHandlers={{ click: () => setSelectedLocation(location) }}
          />
        ))}
        
        {selectedLocation && weatherData && (
          <Popup position={[selectedLocation.lat, selectedLocation.lon]} onClose={() => setSelectedLocation(null)}>
          <div className="p-2">
            <h2 className="font-bold text-lg">{selectedLocation.city}, {selectedLocation.state}</h2>
            <p><strong>--Live Data--</strong></p>
            
            <p><strong>🌡 Temperature:</strong> {weatherData.temperature}°C</p>
            <p><strong>💧 Humidity:</strong> {weatherData.humidity}%</p>
            <p><strong>☀️ Solar Intensity:</strong> {weatherData.solarIntensity} W/m²</p>
            <p><strong>💨 Wind Speed:</strong> {weatherData.windSpeed} m/s</p>
            <p><strong>🌪 Wind Pressure:</strong> {weatherData.windPressure} hPa</p>
            <p><strong>🌧 Precipitation:</strong> {weatherData.precipitation} mm</p>
            <p><strong>☁️ Cloud Cover:</strong> {weatherData.cloudCover}%</p>
        
            <hr className="my-2" />
        
            <p><strong>⚡ Estimated Power Output:</strong> get from Analyse Page</p>
          </div>
        </Popup>
        
        )}
      </MapContainer>
    </div>
  );
}
