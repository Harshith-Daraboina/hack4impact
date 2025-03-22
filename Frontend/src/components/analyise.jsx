import React, { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import moment from "moment-timezone";

const Analyse = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const locations = [
        { city: "Kamuthi", state: "Tamil Nadu", lat: 9.3915, lon: 78.1195 },
        { city: "Hattigudur", state: "Karnataka", lat: 16.2320, lon: 76.3930 },
        { city: "Holenarsipura", state: "Karnataka", lat: 12.7875, lon: 76.2426 },
        { city: "Khavda", state: "Gujarat", lat: 23.7986, lon: 69.6356 },
        { city: "KR Pet", state: "Karnataka", lat: 12.7676, lon: 76.4876 },
        { city: "Maskal", state: "Karnataka", lat: 16.2997, lon: 76.4259 },
        { city: "Pavagada", state: "Karnataka", lat: 14.1000, lon: 77.2833 },
        { city: "Periyapatna", state: "Karnataka", lat: 12.3360, lon: 76.0980 },
        { city: "Durg", state: "Chhattisgarh", lat: 21.1915, lon: 81.2849 },
        { city: "Madhuvanahally", state: "Karnataka", lat: 12.2167, lon: 76.6833 },
        { city: "Budhlada", state: "Punjab", lat: 29.9272, lon: 75.5626 },
        { city: "Kalpi", state: "Uttar Pradesh", lat: 26.1167, lon: 79.7333 },
        { city: "Kekkireni", state: "Telangana", lat: 17.1500, lon: 79.6167 },
        { city: "Nabarangpur", state: "Odisha", lat: 19.2333, lon: 82.5500 },
        { city: "Nalagonda", state: "Telangana", lat: 17.0500, lon: 79.2667 },
        { city: "Siddipet", state: "Telangana", lat: 18.1000, lon: 78.8500 },
        { city: "Sindagi", state: "Karnataka", lat: 16.9180, lon: 76.2330 },
        { city: "Basavana Bagewadi", state: "Karnataka", lat: 16.5728, lon: 75.9725 },
        { city: "Byadgi", state: "Karnataka", lat: 14.6733, lon: 75.4865 },
        { city: "Channapatna", state: "Karnataka", lat: 12.6548, lon: 77.2060 },
        { city: "Anantapur", state: "Andhra Pradesh", lat: 14.6833, lon: 77.6000 },
        { city: "Gani", state: "Andhra Pradesh", lat: 15.0833, lon: 78.2333 },
        { city: "Gubbi", state: "Karnataka", lat: 13.3126, lon: 76.9410 },
        { city: "Khilora", state: "Chhattisgarh", lat: 21.2000, lon: 81.3500 },
        { city: "Jhansi", state: "Uttar Pradesh", lat: 25.4486, lon: 78.5696 },
        { city: "Chitrakoot", state: "Uttar Pradesh", lat: 25.2000, lon: 80.9000 },
        { city: "Jalalabad", state: "Uttar Pradesh", lat: 29.6186, lon: 77.4391 },
        { city: "Mahoba", state: "Uttar Pradesh", lat: 25.2926, lon: 79.8723 },
        { city: "Metalk", state: "Telangana", lat: 18.2676, lon: 78.8667 },
        { city: "Pokhran and Phalodi", state: "Rajasthan", lat: 27.1310, lon: 71.7550 },
        { city: "Sahaswan", state: "Uttar Pradesh", lat: 28.0722, lon: 78.7500 },
        { city: "Jevargi", state: "Karnataka", lat: 17.0139, lon: 76.7739 },
        { city: "Bagalkot", state: "Karnataka", lat: 16.1810, lon: 75.6950 },
        { city: "Bijapur", state: "Karnataka", lat: 16.8240, lon: 75.7154 },
        { city: "Gulbarga", state: "Karnataka", lat: 17.3297, lon: 76.8343 },
        { city: "Indri", state: "Haryana", lat: 29.8797, lon: 77.0586 },
        { city: "Musaddehalli", state: "Karnataka", lat: 15.4667, lon: 75.0333 },
        { city: "Kallur", state: "Karnataka", lat: 15.1833, lon: 77.2833 },
        { city: "Karekar", state: "Karnataka", lat: 14.8000, lon: 74.1333 },
        { city: "Killari", state: "Maharashtra", lat: 18.0500, lon: 76.5000 },
        { city: "Mataluru", state: "Karnataka", lat: 15.2500, lon: 76.9500 },
        { city: "Sardargarh", state: "Rajasthan", lat: 25.8500, lon: 73.4167 },
        { city: "Magadi", state: "Karnataka", lat: 12.9570, lon: 77.2230 },
        { city: "Raichur", state: "Karnataka", lat: 16.2047, lon: 77.3550 },
        { city: "Ramanagara", state: "Karnataka", lat: 12.7214, lon: 77.2816 },
        { city: "Rawra", state: "Rajasthan", lat: 27.5333, lon: 72.6333 },
        { city: "Shorapur", state: "Karnataka", lat: 16.5210, lon: 76.7570 },
        { city: "T Narasipura", state: "Karnataka", lat: 12.2134, lon: 76.8973 },
        { city: "Tilopeuru", state: "Karnataka", lat: 14.7500, lon: 75.4000 },
        { city: "Bhadiya", state: "Rajasthan", lat: 26.9260, lon: 71.8330 },
        { city: "Jodhpur", state: "Rajasthan", lat: 26.2389, lon: 73.0243 },
        { city: "Bikaner", state: "Rajasthan", lat: 28.0229, lon: 73.3119 },
        { city: "Jaisalmer", state: "Rajasthan", lat: 26.9150, lon: 70.9080 }
      ];
      

    const fetchWeatherData = async () => {
        if (!selectedLocation || !selectedDate) {
            console.warn("Missing location or date");
            return;
        }

        const { lat, lon } = selectedLocation;
        const startDate = `${selectedDate}T00:00:00Z`;
        const endDate = `${selectedDate}T23:59:59Z`;

        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,diffuse_radiation,direct_radiation&timezone=auto&start=${startDate}&end=${endDate}`;

        try {
            console.log("Fetching weather data from:", apiUrl);
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log("Raw API Response:", data);

            if (data.hourly) {
                const formattedData = data.hourly.time.slice(0, 24).map((t, index) => ({
                    time: moment.utc(t).tz("Asia/Kolkata").format("HH:mm"),
                    temperature: data.hourly.temperature_2m[index],
                    humidity: data.hourly.relative_humidity_2m[index],
                    diffuseRadiation: data.hourly.diffuse_radiation[index],
                    directRadiation: data.hourly.direct_radiation[index],
                }));

                setWeatherData(formattedData);
            } else {
                console.error("Unexpected API response structure:", data);
                setWeatherData(null);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeatherData(null);
        }
    };

    // Function to export CSV
    const downloadCSV = () => {
        if (!weatherData) return;

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Time,Temperature (°C),Humidity (%),Diffuse Radiation (W/m²),Direct Radiation (W/m²)\n";
        weatherData.forEach(row => {
            csvContent += `${row.time},${row.temperature},${row.humidity},${row.diffuseRadiation},${row.directRadiation}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `WeatherData_${selectedLocation.city}_${selectedDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                    <option key={loc.city} value={loc.city}>
                        {loc.city}, {loc.state}
                    </option>
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
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    
                    {/* Temperature Graph */}
                    <div className="p-4 border rounded shadow">
                        <h3 className="text-lg font-semibold">Temperature (°C)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weatherData}>
                                <XAxis dataKey="time" angle={-45} textAnchor="end" />
                                <YAxis label={{ value: "°C", angle: -90, position: "insideLeft" }} />
                                <Tooltip />
                                <Bar dataKey="temperature" fill="#FF5733" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Humidity Graph */}
                    <div className="p-4 border rounded shadow">
                        <h3 className="text-lg font-semibold">Humidity (%)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weatherData}>
                                <XAxis dataKey="time" angle={-45} textAnchor="end" />
                                <YAxis label={{ value: "%", angle: -90, position: "insideLeft" }} />
                                <Tooltip />
                                <Bar dataKey="humidity" fill="#3498DB" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Diffuse Radiation Graph */}
                    <div className="p-4 border rounded shadow">
                        <h3 className="text-lg font-semibold">Diffuse Radiation (W/m²)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weatherData}>
                                <XAxis dataKey="time" angle={-45} textAnchor="end" />
                                <YAxis label={{ value: "W/m²", angle: -90, position: "insideLeft" }} />
                                <Tooltip />
                                <Bar dataKey="diffuseRadiation" fill="#F1C40F" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Direct Radiation Graph */}
                    <div className="p-4 border rounded shadow">
                        <h3 className="text-lg font-semibold">Direct Radiation (W/m²)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weatherData}>
                                <XAxis dataKey="time" angle={-45} textAnchor="end" />
                                <YAxis label={{ value: "W/m²", angle: -90, position: "insideLeft" }} />
                                <Tooltip />
                                <Bar dataKey="directRadiation" fill="#2ECC71" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {weatherData && (
                <div className="w-full">
                    
                    {/* Data Table */}
                    <table className="w-full border-collapse border border-gray-300 mt-6">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Time</th>
                                <th className="border p-2">Temperature (°C)</th>
                                <th className="border p-2">Humidity (%)</th>
                                <th className="border p-2">Diffuse Radiation (W/m²)</th>
                                <th className="border p-2">Direct Radiation (W/m²)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weatherData.map((row, index) => (
                                <tr key={index} className="border">
                                    <td className="border p-2">{row.time}</td>
                                    <td className="border p-2">{row.temperature}</td>
                                    <td className="border p-2">{row.humidity}</td>
                                    <td className="border p-2">{row.diffuseRadiation}</td>
                                    <td className="border p-2">{row.directRadiation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Download CSV Button */}
                    <button
                        className="mt-4 p-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
                        onClick={downloadCSV}
                    >
                        Download CSV
                    </button>
                </div>
            )}
        </div>
    );
};

export default Analyse;
