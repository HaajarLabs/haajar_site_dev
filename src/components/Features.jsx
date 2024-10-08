import React from "react";
import booking from "../assets/booking.png";
import appoint from "../assets/appoint.png";
import token from "../assets/token.png";
const Features = () => {
  return (
    <div className="lg:px-16   py-8 flex flex-col justify-center lg:h-screen ">
      <h1
        data-aos="fade-left"
        data-aos-once="true"
        data-aos-delay="800"
        className="flex justify-center font-vilane_Semi_bold px-3 text-center text-[#F43F5E] ss:text-4xl xs:text-3xl lg:mb-16 mb-10  "
      >
        Power Up Your Bookings with Haajar
      </h1>
      <div className="flex px-5 md:justify-around md:flex-row md:gap-0 xs:flex-col xs:justify-around xs:items-center xs:gap-3   ">
        <div className="flex flex-col items-center ss:w-80 md:w-96 xs:w-full">
          <img
            data-aos="zoom-out"
            data-aos-once="true"
            data-aos-duration="600"
            src={booking}
            width={400}
            alt="Haajar"
            className="mb-4"
          />
          <div
            data-aos="zoom-in"
            data-aos-once="true"
            data-aos-delay="1000"
            data-aos-duration="600"
            className="pl-3 text-center"
          >
            <h1 className="font-vilane_Semi_bold xs:text-lg md:text-xl mb-4">
              WhatsApp Booking Management
            </h1>
            <p className="text-[#6E6E6E]  font-vilane_Regular text-sm ">
              Experience easy and intuitive booking through WhatsApp, ensuring
              streamlined communication between service providers and clients.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center ss:w-80 md:w-96 xs:w-full">
          <img
            data-aos="zoom-out"
            data-aos-once="true"
            data-aos-delay="400"
            data-aos-duration="600"
            src={appoint}
            width={400}
            alt="Haajar"
            className="mb-4"
          />
          <div
            data-aos="zoom-in"
            data-aos-once="true"
            data-aos-delay="1200"
            data-aos-duration="600"
            className="pl-3 text-center"
          >
            <h1 className="font-vilane_Semi_bold xs:text-lg md:text-xl mb-4">
              Appointment Analytics
            </h1>
            <p className="text-[#6E6E6E]  font-vilane_Regular text-sm ">
              Gain detailed insights into booking patterns and client behavior,
              with reports designed to optimize appointment schedules.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center ss:w-80 md:w-96 xs:w-full">
          <img
            data-aos="zoom-out"
            data-aos-once="true"
            data-aos-delay="600"
            data-aos-duration="600"
            src={token}
            width={400}
            alt="Haajar"
            className="mb-4"
          />
          <div
            data-aos="zoom-in"
            data-aos-once="true"
            data-aos-delay="1200"
            data-aos-duration="600"
            className="pl-3 text-center"
          >
            <h1 className="font-vilane_Semi_bold xs:text-lg md:text-xl mb-4">
              Live Token System via WhatsApp
            </h1>
            <p className="text-[#6E6E6E]  font-vilane_Regular text-sm ">
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
