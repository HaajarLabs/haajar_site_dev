import React from "react";
import mockup from "../assets/Group 13.svg";
const Features = () => {
  return (
    <div className="px-10    lg:py-16 flex flex-col  items-center w-full ">
      <h1
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="1000"
        className="pt-3 text-4xl  font-vilane_Semi_bold "
      >
        Introducing
      </h1>
      <p
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-delay="400"
        data-aos-duration="1000"
        className="lg:text-[400px] text-8xl tracking-widest font-vilane_bold lg:-mt-36 text-[#F43F5E] drop-shadow-neumorphism"
      >
        Haajar
      </p>
      <div className="lg:h-60 h-32"></div>
      <img
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-delay="800"
        data-aos-duration="1000"
        className=" absolute  lg:mt-60 mt-28   w-4/6"
        src={mockup}
        alt="mockup"
      />
    </div>
  );
};

export default Features;
