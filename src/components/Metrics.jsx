import React from "react";
import bg2 from "../assets/bg1.svg";
import bg3 from "../assets/bg2.svg";
import bg4 from "../assets/bg3.svg";

const Metrics = ({ metrics }) => {
  return (
    <div className="flex px-4  font-poppins justify-between space-x-4 mb-6">
      
      <div className="relative flex-1 bg-white shadow-md hover:shadow-lg rounded-lg p-6 overflow-hidden">
    <h2 className="text-md font-semibold mb-4">Arrived Appointments</h2>
    <p className="text-4xl text-rose-400 font-bold">{metrics.past}</p>
    <img className="absolute bottom-0 right-[-80px] top-5  w-56  opacity-70" src={bg3} alt="queue" />
</div>
      <div className="relative flex-1 bg-white shadow-md hover:shadow-lg rounded-lg p-6 overflow-hidden">
    <h2 className="text-md font-semibold mb-4">Upcoming Appointments</h2>
    <p className="text-4xl text-rose-400 font-bold">{metrics.upcoming}</p>
    <img className="absolute top-0 right-[-15px] rotate-90   opacity-70  w-36 " src={bg2} alt="queue" />
    <img className="absolute bottom-0 right-[-53px] rotate-90  opacity-70   w-36 " src={bg2} alt="queue" />
</div>
<div className="relative flex-1 bg-white shadow-md hover:shadow-lg rounded-lg p-6 overflow-hidden">
    <h2 className="text-md font-semibold mb-4">Whatsapp Bookings</h2>
    <p className="text-4xl text-rose-400 font-bold">{metrics.whatsapp}</p>
    <img className="absolute bottom-0 right-0   opacity-70  w-36 " src={bg4} alt="queue" />
    
</div>


    </div>
  );
};

export default Metrics;
