import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Landingpage from "./pages/Landingpage";
import Loginpage from "./pages/Loginpage";
import Dashboard from "./pages/Dashboard";
import Privacypage from "./pages/Privacypage";
import Aboutpage from "./pages/Aboutpage";

const Animatedroutes = () => {
    const location=useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landingpage />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Privacy-policy" element={<Privacypage/>} />
        <Route path="/About-us" element={<Aboutpage/>} />
      </Routes>
    </AnimatePresence>
  );
};

export default Animatedroutes;
