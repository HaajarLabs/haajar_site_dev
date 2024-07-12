// components/DateSelector.jsx
import React from "react";

const DateSelector = ({ dates, selectedDate, setSelectedDate }) => {
  return (
    <div className="flex space-x-4">
      {dates.map((date) => (
        <button
          key={date}
          className={`px-4 py-2 rounded-md ${
            selectedDate === date ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedDate(date)}
        >
          {date}
        </button>
      ))}
    </div>
  );
};

export default DateSelector;
