import React, { useState } from 'react';
import DateSelector from '../widgets/DateSelector';
import SlotSelector from '../widgets/SlotSelector';
import WeekCalendar from '../widgets/Datepicker';
const Settings = () => {
   
    const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Mock data for demonstration
  const dates = ["Today", "Tomorrow", "Day After"];
  const slots = [
    { id: 1, time: "10:00 AM" },
    { id: 2, time: "11:00 AM" },
    { id: 3, time: "12:00 PM" },
    { id: 4, time: "01:00 PM" },
    { id: 5, time: "02:00 PM" },
  ];

  return (
    <div className=" mx-auto py-4 font-poppins flex flex-col justify-between lg:px-24  items-start">
        <h1 className=' lg:text-2xl text-lg lg:mb-4'>Slot Settings </h1>
      <WeekCalendar />
      {/* <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <h2 className="text-2xl font-bold my-4">Select a Slot</h2>
      <SlotSelector
        slots={slots}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />

      <div className="mt-8">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() =>
            alert(
              `Booking confirmed for ${selectedDate} at ${slots.find(
                (slot) => slot.id === selectedSlot
              ).time}`
            )
          }
          disabled={!selectedDate || !selectedSlot}
        >
          Confirm Booking
        </button>
      </div> */}
    </div>
  );
};

export default Settings;