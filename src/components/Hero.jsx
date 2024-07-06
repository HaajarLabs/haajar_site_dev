import React, { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const Hero = () => {
 
  return (
    <div
      id="home"
      className="h-screen sm:px-32 px-7  md:py-7 xs:flex xs:flex-col xs:justify-center xs:flex-1 xs:-mt-8 "
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
        className=" absolute sm:opacity-70 opacity-25 md:left-[-600px] md:scale-100 scale-150 left-[-250px] top-[-10px] md:top-[100px] -z-50"
        loop
        src="https://lottie.host/1628171c-8c70-4038-a4d9-fbefbbe3c62a/kV416BwwZG.json"
      ></DotLottiePlayer>
      <div className="flex z-50 h-auto md:justify-end">
        <div className=" flex  flex-col justify-center gap-5 items-center md:pl-44  md:text-left leading-8 ">
          <div className="md:text-6xl  xl:text-8xl text-3xl tracking-wide  text-center font-vilane_Regular pb-5">
            <h1 data-aos="zoom-in-up">Managing</h1>
            <div
              data-aos="zoom-in-up"
              data-aos-delay="200"
              className=" sm:underline  decoration-2 underline-offset-8  text-rose-500 md:text-7xl xl:text-8xl text-4xl"
            >
              L<span className="  text-xl xl:text-2xl">O</span>
              <span className=" text-2xl xl:text-3xl">O</span>
              <span className=" text-3xl xl:text-4xl">O</span>
              <span className=" text-4xl xl:text-5xl">O</span>
              <span className=" text-5xl xl:text-6xl">O</span>
              <span className=" text-6xl xl:text-7xl">O</span>NG
            </div>{" "}
            <div data-aos="zoom-in-up" data-aos-delay="400">
              {" "}
              Queue's made easy!
            </div>
          </div>{" "}
          <div
            data-aos="fade-left"
            data-aos-delay="900"
            className="sm:font-vilane_Light text-center  ss:text-lg font-vilane_Extra_light text-xs  md:text-xl  xl:text-3xl"
          >
            Simplifying customer bookings so that you can focus on delivering
            quality.
          </div>
          <div
            data-aos="zoom-out-up"
            data-aos-delay="700"
            className="md:pt-3 ss:pt-6 pt-5"
          >
            <button class="bg-rose-500 hover:bg-rose-700 hover:ease-in-out transition duration-400 text-white  font-vilane_bold py-1 px-4 rounded">
              <a href="https://api.whatsapp.com/send?phone=919400244505&text=Hi,can we talk about Haajar? I would like to learn more about its key features, pricing, and any available demos.">
                {" "}
                Book Demo
              </a>
            </button>
          </div>
        </div>
      </div>

      <div className=" md:hidden text-gray-500 flex justify-center">
        <IoIosArrowDown
          size={50}
          className=" absolute inline-block  bottom-2 "
        />
      </div>
    </div>
  );
};

export default Hero;
