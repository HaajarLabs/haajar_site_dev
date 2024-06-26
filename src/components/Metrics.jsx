import React from "react";

const Metrics = ({ metrics }) => {
  return (
    <div className="flex px-4 font-poppins justify-between space-x-4 mb-6">
      <div className="flex-1 bg-white shadow-md hover:shadow-lg rounded-lg p-5">
        <h2 className="text-md font-semibold mb-4">Arrived Appointments</h2>
        <p className="text-4xl text-rose-400 font-bold">{metrics.past}</p>
      </div>
      <div className="flex-1 bg-white shadow-md hover:shadow-lg  rounded-lg p-6">
        <h2 className="text-md font-semibold mb-4">Upcoming Appointments</h2>
        <p className="text-4xl text-rose-400  font-bold">{metrics.upcoming}</p>
      </div>
      <div className="flex-1 bg-white shadow-md hover:shadow-lg  rounded-lg p-6">
        <h2 className="text-md font-semibold mb-4">Whatsapp Bookings </h2>
        <p className="text-4xl text-rose-400  font-bold">{metrics.whatsapp}</p>
      </div>
    </div>
  );
};

export default Metrics;
