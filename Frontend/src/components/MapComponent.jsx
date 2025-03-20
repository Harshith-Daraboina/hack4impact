import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapComponent({ weatherData, mapCenter }) {
  return (
    <MapContainer center={mapCenter} zoom={5} className="h-96 w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {weatherData && (
        <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
          <Popup>
            <strong>{weatherData.name}</strong> <br />
            Temp: {weatherData.main.temp}°C <br />
            Wind: {weatherData.wind.speed} m/s
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
