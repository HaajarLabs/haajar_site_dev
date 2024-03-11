import React, { useState, useEffect } from "react";
import logo1 from "../assets/logofirst1.png";
import { Link } from "react-router-dom";
import logo2 from "../assets/logosecond1.png";
import logoicon from "../assets/logoicon.png";

const Navbar = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prevState) => !prevState);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className=" font-poppins w-full flex py-6 justify-between items-center ">
       <Link to='/'>
    <div className="flex items-center gap-2 ">
        <img
          src={logoicon}
          className="w-9 animate-flipbottom transition-opacity duration-1000"
          alt="logo"
        />
        <img
          src={isFlipped ? logo1 : logo2}
          className="w-28 ease-linear transition-opacity duration-1000"
          alt="logo"
        />
      </div>
    </Link>
      <div className=" cursor-pointer bg-gray-300 z-50  hover:bg-[#25D366] ease-in duration-300 px-4 py-2 rounded-3xl hover:text-white text-gray-00 font-semibold">
        <Link to="/Login">Log</Link>
      </div>

    </nav>
 
  );
};

export default Navbar;
