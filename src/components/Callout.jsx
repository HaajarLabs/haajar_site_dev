import React from "react";
import mascot from "../assets/mascot_haajar.png";
import mascot_small from "../assets/mascot.jpeg";
const Callout = () => {
  return (
    <div className="relative h-screen flex xs:flex-col md:flex-row  mx-auto bg-[#F43F5E]  xs:pt-6 lg:pl-6 pb-6 justify-around overflow-hidden ">
      <div
        data-aos="fade-down"
        data-aos-once="true"
        data-aos-delay="800"
        data-aos-duration="1000"
        className="absolute top-0 left-0 right-0 h-52 bg-gradient-to-b from-black/50 to-transparent pointer-events-none "
      ></div>
      <div
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-delay="800"
        data-aos-duration="1000"
        className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black/50 to-transparent pointer-events-none "
      ></div>
      <div className="lg:mt-40 lg:w-3/6  xs:px-6 md:px-0  flex flex-col items-start xm:justify-center md:justify-normal  ">
        <h1
          data-aos="fade-down"
          data-aos-once="true"
          data-aos-duration="600"
          className="lg:text-6xl text-5xl  font-vilane_Semi_bold mb-6  lg:leading-normal xs:leading-normal  text-white"
        >
          Cut the wait, boost efficiency—book smarter with Haajar today!
        </h1>
        <button
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-delay="200"
          data-aos-duration="600"
          className=" font-vilane_Semi_bold bg-white lg:p-4 p-3 rounded hover:bg-rose-600 hover:text-white"
        >
          <a href="https://api.whatsapp.com/send?phone=919400244505&text=Hi,can we talk about Haajar? I would like to learn more about its key features, pricing, and any available demos.">
            {" "}
            Click here to chat with us 🤝
          </a>
        </button>
      </div>

      <img
        data-aos="flip-left"
        data-aos-once="true"
        data-aos-delay="400"
        data-aos-duration="600"
        src={mascot}
        alt="image"
        className="hidden lg:flex"
      />
      <div className="lg:hidden mx-5  ">
        <img
          data-aos="flip-left"
          data-aos-once="true"
          data-aos-delay="400"
          data-aos-duration="600"
          src={mascot_small}
          alt="image"
          className=" rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Callout;
