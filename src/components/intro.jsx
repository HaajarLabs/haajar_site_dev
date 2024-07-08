import React from "react";
import mockup from "../assets/Group 13.svg";
const Features = () => {
  return (
    <div className="px-10 py-16 flex flex-col  items-center w-full ">
      <h1
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="1000"
        className="pt-3 lg:text-4xl  ss:text-2xl xs:text-xl font-vilane_Semi_bold "
      >
        Introducing
      </h1>
      <p
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-delay="400"
        data-aos-duration="1000"
        className="lg:text-[400px] xs:text-8xl  tracking-widest font-vilane_bold lg:-mt-16  xs:-mt-0 text-[#F43F5E] drop-shadow-neumorphism"
      >
        Haajar
      </p>
      <div className="md:h-80 xs:h-24"></div>
      <img
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-delay="800"
        data-aos-duration="1000"
        className=" absolute  lg:mt-60 xs:mt-28  xs:w-5/6 ss:w-4/6"
        src={mockup}
        alt="mockup"
      />
    </div>
  );
};

export default Features;
