import React from "react";
import styles from "../style";
import Getstarted from "./Getstarted";
import { DotLottiePlayer, Controls } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row px-14 py-12 flex-col `}
    >
      <div className="flex flex-row   justify-between  w-full ">
        <div>
          <h1 className="flex-1 font-semibold ss:text-[72px] text-[52px]">
            Effortless Attendance <br className="sm:block hidden" />{" "}
            <span className="text-gray-700">Simplify, Update,</span> <br />
            <span className="text-gray-500">Excel!</span> <br />
          </h1>
          <Getstarted />
        </div>
     
        <DotLottiePlayer  speed={0.25} autoplay className=" w-1/3 hover:scale-90 ease-in-out duration-300" loop src="https://lottie.host/b7f5aa87-af57-4d69-bcaf-5ee11ccf1b9b/CRVZemj3UF.json">

</DotLottiePlayer>
      </div>
   
    </section>
  );
};

export default Hero;
