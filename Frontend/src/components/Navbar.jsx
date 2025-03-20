import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-blue-600 p-4 text-white flex justify-center gap-6">
      <NavLink to="/" className="hover:underline" activeClassName="font-bold">Home</NavLink>
      <NavLink to="/about" className="hover:underline" activeClassName="font-bold">About</NavLink>
      <NavLink to="/trends" className="hover:underline" activeClassName="font-bold">Trends</NavLink>
      <NavLink to="/download" className="hover:underline" activeClassName="font-bold">Download</NavLink>
    </div>
  );
}
