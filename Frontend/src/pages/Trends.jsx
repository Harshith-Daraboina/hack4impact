import React from "react";
import PowerPlantMap from "../components/PowerPlantMap";

export default function Trends() {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center p-4 text-xl font-bold shadow-md">
        🌍 Renewable Energy Trends
      </header>

      {/* Map Section */}
      <div className="flex-grow">
        <PowerPlantMap />
      </div>
    </div>
  );
}
