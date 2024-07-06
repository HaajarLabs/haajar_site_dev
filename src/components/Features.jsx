import React from "react";
import booking from "../assets/booking.png";
import appoint from "../assets/appoint.png";
import token from "../assets/token.png";
const Features = () => {
  return (
    <div className=" px-16 flex flex-col justify-center h-screen">
      <h1 className="flex justify-center font-vilane_Semi_bold text-[#F43F5E] text-4xl mb-16  ">
        Power Up Your Bookings with Haajar
      </h1>
      <div className="flex justify-around">
        <div className="flex flex-col items-center w-96">
          <img src={booking} width={400} alt="Haajar" className="mb-4" />
          <div className="pl-3 text-center">
            <h1 className="font-vilane_Semi_bold text-xl mb-4">
              WhatsApp Booking Management
            </h1>
            <p className="text-[#6E6E6E]  font-vilane_Semi_bold text-sm ">
              Experience easy and intuitive booking through WhatsApp, ensuring
              streamlined communication between service providers and clients.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-96">
          <img src={appoint} width={400} alt="Haajar" className="mb-4" />
          <div className="pl-3 text-center">
            <h1 className="font-vilane_Semi_bold text-xl mb-4">
              Appointment Analytics
            </h1>
            <p className="text-[#6E6E6E]  font-vilane_Semi_bold text-sm ">
              Gain detailed insights into booking patterns and client behavior,
              with reports designed to optimize appointment schedules.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-96">
          <img src={token} width={400} alt="Haajar" className="mb-4" />
          <div className="pl-3 text-center">
            <h1 className="font-vilane_Semi_bold text-xl mb-4">
              Live Token System via WhatsApp
            </h1>
            <p className="text-[#6E6E6E]  font-vilane_Semi_bold text-sm ">
              Get real-time updates on appointment status, with automatic
              notifications and reminders for seamless scheduling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
