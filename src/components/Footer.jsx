import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center align-bottom bg-[#121312] text-white pb-5 ">
      <div className="h-20"></div>
      <Link to='/Privacy-policy'>
        <div className="flex justify-center text-gray-500">Privacy policy</div>
      </Link>

      <div className="flex justify-center pt-5">
        Devoloped by Team Mark-10 ⚡
      </div>
    </div>
  );
};

export default Footer;
