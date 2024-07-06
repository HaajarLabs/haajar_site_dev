import React from "react";
import mascot from "../assets/mascot_haajar.png";

const Callout = () => {
  return (
    <div className="relative h-screen flex  mx-auto bg-[#F43F5E]  pt-6 pl-6 pb-6 justify-around overflow-hidden ">
      <div className="absolute top-0 left-0 right-0 h-52 bg-gradient-to-b from-black/50 to-transparent pointer-events-none "></div>
      <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black/50 to-transparent pointer-events-none "></div>
      <div className="mt-40 w-3/6 flex flex-col items-start ">
        <h1 className="text-6xl  font-vilane_Semi_bold mb-6  leading-normal text-white">
          Cut the wait, boost efficiency—book smarter with Haajar today!
        </h1>
        <button className=" font-vilane_Semi_bold bg-white p-4 rounded hover:bg-rose-600 hover:text-white">
          <a href="https://api.whatsapp.com/send?phone=919400244505&text=Hi,can we talk about Haajar? I would like to learn more about its key features, pricing, and any available demos.">
            {" "}
            Click here to chat with us 🤝
          </a>
        </button>
      </div>
      <img src={mascot} alt="image" />
    </div>
  );
};

export default Callout;
