import React, { useState} from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

function Analyse() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    if (!selectedLocation || !selectedDate) return;
    const { lat, lon } = selectedLocation;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,humidity_2m,solar_radiation&start=${selectedDate}&end=${selectedDate}&timezone=auto`
    );
    const data = await response.json();
    setWeatherData(data.hourly);
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold">Analyse Weather Data</h2>

      <select 
        className="p-2 border rounded bg-white text-black" 
        onChange={(e) => setSelectedLocation(locations.find(loc => loc.city === e.target.value))}
      >
        <option value="">Select Location</option>
        {locations.map((loc) => (
          <option key={loc.city} value={loc.city}>{loc.city}, {loc.state}</option>
        ))}
      </select>

      {selectedLocation && (
        <input 
          type="date" 
          className="p-2 border rounded bg-white text-black" 
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      )}

      {selectedLocation && selectedDate && (
        <button 
          className="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600" 
          onClick={fetchWeatherData}
        >
          Analyse
        </button>
      )}

      {weatherData && (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 z-1000">
          <div className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">Temperature (°C)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weatherData.temperature_2m}>
                <XAxis dataKey="time" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF5733" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">Humidity (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weatherData.humidity_2m}>
                <XAxis dataKey="time" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3498DB" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">Solar Radiation (W/m²)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weatherData.solar_radiation}>
                <XAxis dataKey="time" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#F1C40F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {weatherData && (
        <div className="p-4 border rounded shadow w-full mt-6 z-1000">
          <h3 className="text-lg font-semibold mb-2">Hourly Data</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Time</th>
                <th className="border p-2">Temperature (°C)</th>
                <th className="border p-2">Humidity (%)</th>
                <th className="border p-2">Solar Radiation (W/m²)</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.time.map((time, index) => (
                <tr key={time} className="border">
                  <td className="border p-2">{time}</td>
                  <td className="border p-2">{weatherData.temperature_2m[index]}</td>
                  <td className="border p-2">{weatherData.humidity_2m[index]}</td>
                  <td className="border p-2">{weatherData.solar_radiation[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Analyse;