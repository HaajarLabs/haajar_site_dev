import React, { useState, useEffect } from "react";
import logo1 from "../assets/logofirst1.png";
import { Link } from "react-router-dom";
import logoicon from "../assets/logoicon.png";

const Navbar = () => {
  

 

  return (
    <nav className=" font-vilane_Extra_light w-full flex py-6 justify-between items-center ">
       <Link to='/'>
    <div className="flex items-center gap-2 ">
        <img
          src={logo1 }
          className="w-32 ease-linear transition-opacity duration-1000"
          alt="logo"
        />
      </div>
    </Link>
      <div className=" cursor-pointer  border-black border-[1.5px] text-[#292f36] hover:border-[#4ecdc4] z-50  hover:bg-[#4ecdc4] ease-in duration-300 px-4 py-2 rounded-3xl hover:text-white text-gray-00 ">
        <Link to="/Login">Try it</Link>
      </div>

    </nav>
 
  );
};

export default Navbar;
