import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import Appointments from "./Pages/Appointments";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctor-admin/login" element={<Login />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </div>
  );
};

export default App;
