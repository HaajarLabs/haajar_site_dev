import React, { useEffect } from "react";
import logo1 from "../assets/logofirst1.png";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  useEffect(() => {
    Aos.init({
      offset: 50,
    });
  }, []);

  return (
    <nav className=" font-vilane_Extra_light w-full flex py-6 justify-between items-center ">
      <Link data-aos="zoom-in-down" data-aos-duration="1000" to="/">
        <img
          src={logo1}
          className="w-32 ease-linear transition-opacity duration-1000"
          alt="logo"
        />
      </Link>
      <Link to="/Login">
        <div
          data-aos="zoom-in-down"
          data-aos-delay="200"
          data-aos-duration="1000"
          className=" cursor-pointer  border-black border-[1.5px] text-[#292f36] hover:border-green-400 z-50  hover:bg-green-400 hover:ease-in-out transition duration-300 px-4 py-2 rounded-3xl hover:text-white text-gray-00 "
        >
          Log In
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
