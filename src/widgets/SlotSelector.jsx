// components/SlotSelector.jsx
import React from "react";

const SlotSelector = ({ slots, selectedSlot, setSelectedSlot }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {slots.map((slot) => (
        <button
          key={slot.id}
          className={`px-4 py-2 rounded-md ${
            selectedSlot === slot.id ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedSlot(slot.id)}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
};

export default SlotSelector;
