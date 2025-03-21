import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Title */}
        <h1 className="text-lg md:text-xl font-semibold tracking-wide">
          India Weather & Energy Insights
        </h1>
        
        {/* Navigation Links */}
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-300 transition duration-300 ${isActive ? "font-bold border-b-2 border-white" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/trends"
            className={({ isActive }) =>
              `hover:text-gray-300 transition duration-300 ${isActive ? "font-bold border-b-2 border-white" : ""}`
            }
          >
            Trends
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-gray-300 transition duration-300 ${isActive ? "font-bold border-b-2 border-white" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/download"
            className={({ isActive }) =>
              `hover:text-gray-300 transition duration-300 ${isActive ? "font-bold border-b-2 border-white" : ""}`
            }
          >
            Download
          </NavLink>
        </div>
      </div>
    </nav>
  );
}