import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import { CiMail } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="flex flex-col  justify-center align-bottom bg-[#121312] text-white  ">
      <div className=" md:flex md:justify-between md:flex-1 ">
        <div className="h-20 flex flex-col md:gap-3 xs:gap-5 ">
          <Link to="/" className="  w-fit">
            <img
              src={logo}
              className="md:w-96 xs:w-60 pt-10 md:pl-20 xs:pl-6  ease-linear transition-opacity duration-1000"
              alt="logo"
            />
          </Link>

          <p className="md:pl-20 xs:pl-6 tracking-wide  md:text-2xl font-vilane_Regular">
            {" "}
            Effortless Appointment Management.
          </p>
          <p className="md:pl-20 tracking-wider xs:pl-6 md:text-lg font-vilane_Regular flex gap-2 items-center">
            <CiMail size={30} /> <a href="mailto:haajar.team@gmail.com" >haajar.team@gmail.com</a>
          </p>
        </div>
        <div className="flex justify-between xs:pl-6 xs:pr-6 md:pl-0 xs:pt-16 md:pt-0">
          <ul className=" md:pr-20 flex flex-col gap-3  items-start   mt-24 font-vilane_Regular">
            <h1 className="md:text-lg">What's Inside ?</h1>

            <li>
              {" "}
              <Link to="/About-us">
                <div className="flex justify-center hover:text-gray-300 ease-in-out transition  text-gray-500">
                  About us
                </div>
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/Privacy-policy">
                <div className="flex justify-center hover:text-gray-300 ease-in-out transition  text-gray-500">
                  Privacy policy
                </div>
              </Link>
            </li>
          </ul>
          <ul className=" md:pr-20  flex flex-col gap-3  items-start  mt-24 font-vilane_Regular">
            <h1 className=" text-lg">Social links</h1>

            <li>
              {" "}
              <Link to="https://www.instagram.com/haajar.in/?hl=en">
                <p className="flex gap-1 justify-center items-center hover:text-gray-300 ease-in-out transition pt-2  text-gray-500 text-left">
                  <FaInstagramSquare size={20} />
                  Instagram
                </p>
              </Link>
            </li>
            <li>
              {" "}
              <Link to="https://x.com/haajar_in">
                <p className="flex gap-1 justify-center items-center hover:text-gray-300 ease-in-out transition  text-gray-500 text-left">
                  <FaSquareXTwitter size={20} /> X.com
                </p>
              </Link>
            </li>
            <li>
              {" "}
              <Link to="https://www.facebook.com/profile.php?id=61561222053552">
                <p className="flex gap-1 justify-center items-center hover:text-gray-300 ease-in-out transition text-gray-500 text-left">
                  <FaFacebookSquare size={20} /> Facebook
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center items-center mt-10 bg-[#2b2b2b] p-8 font-vilane_Semi_bold md:text-xl">Powered by Team Mark-10⚡</div>
    </div>
  );
};

export default Footer;
