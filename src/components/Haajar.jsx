import React from "react";
import queue from "../assets/queue.svg";
const Haajar = () => {
  return (
    <div className="relative lg:h-screen h-fit flex  mx-auto bg-[#F43F5E] lg:pt-6 py-16 px-3 lg:pl-28 lg:pb-6 justify-between overflow-hidden ">
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
      <div className="lg:mt-40 lg:w-3/6 flex flex-col items-center">
        <h1
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-duration="1000"
          className="text-5xl font-bold mb-6 font-vilane_Regular text-white"
        >
          Why Haajar ?
        </h1>
        <p
          data-aos="flip-left"
          data-aos-once="true"
          data-aos-delay="400"
          data-aos-duration="1000"
          className=" bg-white text-center lg:text-2xl text-xl leading-loose tracking-wider text-[#6E6E6E] rounded-lg   font-vilane_Medium  shadow-2xl p-8 lg:p-12"
        >
          Struggling with long wait times and managing large crowds? Imagine
          effortlessly optimizing appointments and ensuring a smoother customer
          experience with{" "}
          <span className="text-3xl text-[#F43F5E]">Haajar</span>. Ready to
          transform your scheduling woes into seamless efficiency?
        </p>
      </div>
      <img
        data-aos="fade-left"
        data-aos-once="true"
        data-aos-delay="400"
        data-aos-duration="1000"
        src={queue}
        alt="image"
        className="scale-120 hidden lg:block"
      />
    </div>
  );
};

export default Haajar;
