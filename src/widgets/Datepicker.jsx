import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { createClient } from "@supabase/supabase-js";

const WeekCalendar = () => {
  // Supabase configuration
  const apiKey = process.env.SUPABASE_KEY;
  const apiUrl = process.env.SUPABASE_URL;
  const supabase = createClient(apiUrl, apiKey);

  // Utility function to pad numbers with leading zeros
  const formatNumber = (number) => {
    return number.toString().padStart(2, "0");
  };

  // Utility function to compare times
  const compareTimes = (time1, time2) => {
    const [h1, m1, s1] = time1.split(':').map(Number);
    const [h2, m2, s2] = time2.split(':').map(Number);

    if (h1 !== h2) return h1 - h2;
    if (m1 !== m2) return m1 - m2;
    return s1 - s2;
  };

  // Convert 24-hour time to 12-hour format
  const convertTimeFormat = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${period}`;
  };

  // Check if a date is active (not in the past)
  const isActive = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate >= today;
  };

  // Check if a specific date is selected
  const isSelected = (dateToCheck) => {
    return selectedDate === formatDateString(dateToCheck);
  };

  // Format date to YYYY-MM-DD string
  const formatDateString = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${formatNumber(d.getMonth() + 1)}-${formatNumber(d.getDate())}`;
  };

  // Handle date change
  const handleDateChange = (date) => {
    const formattedDate = formatDateString(date);
    setSelectedDate(formattedDate);
    setSelectedSlot(""); // Reset selected slot when date changes
  };

  // Handle slot submission (close/reopen)
  const handleSubmit = async () => {
    try {
      const currentSlotIndex = availableTimeSlots.findIndex(slot => slot === selectedSlot);
      const isCurrentlyAvailable = availabletimedata[currentSlotIndex];
      
      const actionMessage = isCurrentlyAvailable 
        ? "Are you sure you want to close this slot?" 
        : "Are you sure you want to reopen this slot?";

      if (!confirm(actionMessage)) {
        return;
      }

      const user = (await supabase.auth.getUser()).data.user;

      const { error } = await supabase
        .from("slots")
        .update({ slot_available: !isCurrentlyAvailable })
        .eq("slot_date", selectedDate)
        .eq("slot_start_time", selectedSlot)
        .eq("client_id", user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setAvailableTimeData(prevData => {
        const newData = [...prevData];
        if (currentSlotIndex !== -1) {
          newData[currentSlotIndex] = !isCurrentlyAvailable;
        }
        return newData;
      });
      
      setSelectedSlot(""); // Reset selected slot
    } catch (error) {
      console.error("Error updating slot:", error);
    }
  };

  // State initialization
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [availabletimedata, setAvailableTimeData] = useState([]);
  const [slotSpecs, setSlotSpecs] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState(null);

  // Date initialization
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const [selectedDate, setSelectedDate] = useState(formatDateString(today));

  // Fetch slot data
  async function getSlotData() {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      const client_id = user.id;

      const { data: slotData, error } = await supabase
        .from("slots")
        .select("*")
        .eq("client_id", client_id)
        .eq("slot_date", selectedDate);

      if (error) {
        console.error("Error fetching slot data:", error.message);
        return;
      }

      // Filter and process slot data
      const timeSlotData = slotData
        .filter((slot) => {
          if (selectedDate === formatDateString(today)) {
            const currentDate = new Date();
            const currentTime = `${formatNumber(currentDate.getHours())}:${formatNumber(currentDate.getMinutes())}:00`;
            return compareTimes(slot.slot_start_time, currentTime) > 0;
          }
          return true;
        })
        .map((slot) => ({
          time: slot.slot_start_time,
          available: slot.slot_available,
          id: slot.id,
          spec: slot.slot_spec || "No Specification"
        }));

      // Sort time slots chronologically
      timeSlotData.sort((a, b) => compareTimes(a.time, b.time));

      // Extract unique slot specifications
      const uniqueSpecs = [...new Set(timeSlotData.map(slot => slot.spec))];
      setSlotSpecs(uniqueSpecs);
      
      // Set initial selected spec if not already set
      if (!selectedSpec && uniqueSpecs.length > 0) {
        setSelectedSpec(uniqueSpecs[0]);
      }

      // Filter slots based on selected specification
      const filteredSlots = selectedSpec
        ? timeSlotData.filter(slot => slot.spec === selectedSpec)
        : timeSlotData;

      setAvailableTimeSlots(filteredSlots.map(slot => slot.time));
      setAvailableTimeData(filteredSlots.map(slot => slot.available));
    } catch (error) {
      console.error("Error fetching slot data:", error.message);
    }
  }

  // Effect hooks
  useEffect(() => {
    getSlotData();
  }, [selectedDate, selectedSpec]);

  return (
    <>
      {/* Week Day Selector */}
      <div className="flex w-full xs:gap-2 lg:gap-0 overflow-x-auto scrollbar-none justify-between p-4 rounded-lg font-poppins">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`flex flex-col items-center lg:p-5 p-2 ${
              isSelected(date) ? "drop-shadow-xl" : ""
            } rounded-lg cursor-pointer transition-colors border ${
              isActive(date) && isSelected(date)
                ? "border-rose-500"
                : "border-gray-300"
            } ${isActive(date) ? "bg-white" : "bg-gray-100"}`}
            onClick={() => {
              if (isActive(date)) {
                handleDateChange(date);
              }
            }}
          >
            <div
              className={`font-semibold text-2xl mb-2 ${
                isActive(date) && isSelected(date)
                  ? "text-[#F43F5E]"
                  : "text-gray-500"
              } ${isActive(date) ? "" : "text-gray-300"}`}
            >
              {daysOfWeek[date.getDay()]}
            </div>
            <div
              className={`text-3xl mb-2 ${
                isActive(date) ? "text-[#F43F5E]" : "text-gray-400"
              }`}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Specification Tabs */}
      {slotSpecs.length > 0 && (
        <div className="w-full mt-4 mb-4 overflow-x-auto">
          <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg">
            {slotSpecs.map((spec, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedSpec(spec)}
                className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium transition-colors ${
                  selectedSpec === spec 
                    ? "bg-rose-500 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time Slots Display */}
      <div className="flex flex-col items-start lg:h-96 justify-between w-full">
        <h1 className="lg:text-2xl lg:mb-6 xs:mb-2 text-lg mb-1">
          {selectedSpec ? `${selectedSpec} Slots` : "Time Slots"}
        </h1>
        <div className="flex flex-wrap justify-between lg:flex-1 ml-4 lg:gap-4 gap-2">
          {availableTimeSlots.length > 0 ? (
            availableTimeSlots.map((slot, index) => (
              <div key={`${selectedDate}-${slot}-${index}`}>
                <label
                  className={`flex lg:p-4 border-2 items-center rounded-lg overflow-hidden ${
                    selectedSlot === slot
                      ? "bg-rose-400 border-rose-500"
                      : !availabletimedata[index]
                      ? "bg-gray-100 border-gray-200"
                      : "bg-white hover:border-rose-300"
                  } cursor-pointer`}
                >
                  <input
                    type="radio"
                    value={slot}
                    checked={selectedSlot === slot}
                    onChange={() => setSelectedSlot(slot)}
                    className="sr-only"
                  />
                  <div
                    className={`lg:py-2 lg:px-4 p-2 lg:text-xl font-poppins ${
                      !availabletimedata[index]
                        ? "text-gray-400"
                        : "text-gray-800"
                    } font-semibold`}
                  >
                    {convertTimeFormat(slot)}
                  </div>
                </label>
              </div>
            ))
          ) : (
            <div className="text-red-400 font-semibold font-poppins lg:text-3xl">
              No slots available
            </div>
          )}
        </div>
        
        {/* Dynamic Submit Button */}
        {selectedSlot && (
          <button
            type="submit"
            onClick={handleSubmit}
            className={`absolute bottom-32 right-0 lg:p-4 p-2 px-7 lg:text-2xl ${
              availabletimedata[availableTimeSlots.findIndex(slot => slot === selectedSlot)]
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } rounded-l-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              availabletimedata[availableTimeSlots.findIndex(slot => slot === selectedSlot)]
                ? "focus:ring-green-500"
                : "focus:ring-blue-500"
            } transition duration-300 ease-in-out`}
          >
            {availabletimedata[availableTimeSlots.findIndex(slot => slot === selectedSlot)]
              ? "Close Slot"
              : "Reopen Slot"}
          </button>
        )}
      </div>
    </>
  );
};

export default WeekCalendar;