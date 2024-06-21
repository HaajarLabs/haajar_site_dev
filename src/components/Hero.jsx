import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Getstarted from "./Getstarted";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
const Hero = () => {
  return (
    <div
      id="home"
      className="h-screen px-7 md:px-32 md:py-7 "
    >
      {/* <div className="flex flex-rowjustify-between  w-full ">
        <div className="">
          <h1 className="flex-1 font-semibold ss:text-[72px] text-[50px]">
            Effortless Appointments <br className="sm:block hidden" />{" "}
            <span className="text-gray-700">Simplify, Update,</span> <br />
            <span className="text-gray-500">Excel!</span> <br />
          </h1>
          <Getstarted />
        </div>
        <DotLottiePlayer
          speed={0.4}
          autoplay
          className=" sm:relative  hover:scale-90  top-[-140px]  sm:top-0   sm:w-[420px]  left-52 absolute  ease-in-out duration-300"
          loop
          src="https://lottie.host/b7f5aa87-af57-4d69-bcaf-5ee11ccf1b9b/CRVZemj3UF.json"
        ></DotLottiePlayer>
      </div> */}
        <DotLottiePlayer
          speed={0.1}
          autoplay
          className=" absolute opacity-20 ss:left-[-600px] md:scale-100 scale-150 left-[-250px] top-[-10px] md:top-[100px] -z-50"
          loop
          src="https://lottie.host/1628171c-8c70-4038-a4d9-fbefbbe3c62a/kV416BwwZG.json"
        ></DotLottiePlayer>
      <div className="flex z-50 h-auto justify-end md:pt-48 pt-60">
        <div className=" text-center flex-col  md:text-left leading-8 ">
          <h1 className="md:text-3xl text-4xl font-vilane_Regular pb-5">
            Managing <span className=" text-[#ff6b6b] md:text-4xl text-5xl">Appointments</span> made easy!
          </h1>{" "}
          
          <span className="font-vilane_Light text-lg md:text-base ">
            Simplifying customer bookings so that you can focus on delivering
            quality.
          </span>
        </div>
      </div>

     <div className=" md:hidden text-gray-500 flex justify-center">
      <IoIosArrowDown size={50} className="mt-52" />
    
     </div>
    </div>
  );
};

export default Hero;
