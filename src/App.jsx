import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
require("dotenv").config();

export default function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer/>
    </div>
  );
}
