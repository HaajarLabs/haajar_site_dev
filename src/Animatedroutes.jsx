import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Landingpage from "./pages/Landingpage";
import Loginpage from "./pages/Loginpage";

const Animatedroutes = () => {
    const location=useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landingpage />} />
        <Route path="/Login" element={<Loginpage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Animatedroutes;
