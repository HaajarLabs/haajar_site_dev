import React, { useState, useEffect } from "react";
import logo1 from "../assets/logofirst1.png";
import { Link } from "react-router-dom";
import logo2 from "../assets/logosecond1.png";
import logoicon from "../assets/logoicon.png";
import { IoAddOutline } from "react-icons/io5";

const DashNav = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prevState) => !prevState);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className=" font-poppins z-50 bg-primary drop-shadow-md fixed left-0  w-screen px-14 flex py-6 justify-between items-center ">
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
     <div className="flex gap-2">
     <button className="cursor-pointer drop-shadow-lg hover:border-0  border border-slate-500 z-50 hover:bg-[#25D366] hover:text-white   px-4 py-2 rounded-3xl  text-gray-00 font-semibold">
        <Link to="/Login" className="flex items-center gap-2">
          Subscribe
        </Link>
      </button>
      <button className="cursor-pointer drop-shadow-lg hover:border-0 hover:bg-white border border-slate-500 z-50  px-4 py-2 rounded-3xl  text-gray-00 font-semibold">
        <Link to="/Login" className="flex items-center gap-2">
          Create New Class <IoAddOutline size={25} />
        </Link>
      </button>
     </div>
    </nav>
  );
};

export default DashNav;
