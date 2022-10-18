import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";
require("dotenv").config();
console.log(process.env.REACT_APP_NEW_SECRET);
export default function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}
