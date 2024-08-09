import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
const WeekCalendar = () => {
  const apiKey = process.env.SUPABASE_KEY;
  const apiUrl = process.env.SUPABASE_URL;
  const supabase = createClient(apiUrl, apiKey);
  const formatNumber = (number) => {
    return number.toString().padStart(2, "0");
  };
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [availabletimedata, setAvailableTimeData] = useState([]);
  const today = new Date();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const todayfull = year + "-" + formatNumber(month) + "-" + formatNumber(day);
  date.setDate(date.getDate() + 1);
  const daytom = date.getDate();
  const monthtom = date.getMonth() + 1;
  const yeartom = date.getFullYear();
  const tomorrow =
    yeartom + "-" + formatNumber(monthtom) + "-" + formatNumber(daytom);
  date.setDate(date.getDate() + 1);
  const daybf = date.getDate();
  const monthbf = date.getMonth() + 1;
  const yearbf = date.getFullYear();
  const dayAfterTomorrow =
    yearbf + "-" + formatNumber(monthbf) + "-" + formatNumber(daybf);
  const availableDates = [todayfull, tomorrow, dayAfterTomorrow];
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });
  const [selectedateslot, setSelectedDateslot] = useState(today.getDate());
  useEffect(() => {
    getSlotData();
  }, [selectedateslot]);

  async function getSlotData() {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      const client_id = user.id;
      const formattedSelectedDate = selectedDate; // Use selectedDate directly
      console.log(formattedSelectedDate);
      const { data: slotData, error } = await supabase
        .from("slots")
        .select("*")
        .eq("client_id", client_id)
        .eq("slot_date", formattedSelectedDate); // Filter by selectedDate
      if (error) {
        console.error("Error fetching slot data:", error.message);
        return;
      }

      const timeSlots = slotData
        .filter((slot) => {
          if (formattedSelectedDate === today) {
            // Filter slots only if selectedDate is today
            const startTime = slot.slot_start_time;
            return compareTimes(startTime, currentTime) > 0; // Compare slot_start_time with current time
          }
          return true; // Return all slots if selectedDate is not today
        })
        .map((slot) => slot.slot_start_time);

      setAvailableTimeSlots(timeSlots);

      // setSlotData(slotData);
      console.log("Slot data fetched successfully:", timeSlots);
      const timedata = slotData
      .map((slot) => slot.slot_available);

      setAvailableTimeData(timedata);
    console.log("Slot data fetched successfully:", timedata);
    } catch (error) {
      console.error("Error fetching slot data:", error.message);
    }
  }

  // Function to compare two time strings in "HH:mm:ss" format
  function compareTimes(time1, time2) {
    const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

    if (hours1 > hours2) {
      return 1;
    } else if (hours1 < hours2) {
      return -1;
    } else {
      if (minutes1 > minutes2) {
        return 1;
      } else if (minutes1 < minutes2) {
        return -1;
      } else {
        if (seconds1 > seconds2) {
          return 1;
        } else if (seconds1 < seconds2) {
          return -1;
        } else {
          return 0;
        }
      }
    }
  }

  const isActive = (date) => {
    const currentDate = new Date(today);
    return (
      date >= currentDate &&
      date < currentDate.setDate(currentDate.getDate() + 7)
    );
  };

  const isSelected = (date) => {
    if (selectedateslot == date) {
      return true;
    }
    return false;
  };


  const convertTimeFormat = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    let period = "AM";
    let formattedHours = parseInt(hours);

    if (formattedHours === 0) {
      formattedHours = 12;
    } else if (formattedHours > 12) {
      formattedHours -= 12;
      period = "PM";
    }

    return `${formattedHours}:${minutes} ${period}`;
  };
  const handleDateChange = (date) => {
    console.log("date", date);
    console.log("selecr", date.getDate());
    if (date.getDate() == today.getDate()) {
      setSelectedDate(todayfull);
    } else if (date.getDate() == today.getDate() + 1) {
      setSelectedDate(tomorrow);
    } else {
      setSelectedDate(dayAfterTomorrow);
    }
  };

 const handleSubmit = async (e) => {

  try {
    confirm("Are you sure you want to close this slot?")
    console.log("selectedDate", selectedDate);
    console.log("selectedSlot", selectedSlot);
    const user = (await supabase.auth.getUser()).data.user;

    const { error } = await supabase
      .from("slots")
      .update({ slot_available: false })
      .eq("slot_date", selectedDate)
      .eq("slot_start_time", selectedSlot)
      .eq("client_id", user.id)
      .select();
    
    if (error) {
      throw error;
    }
    window.location.reload();
   
  } catch (error) {
    print(error);
  }
 };

  return (
    <>
      <div className="flex w-full xs:gap-2 lg:gap-0 overflow-x-auto scrollbar-none justify-between p-4 rounded-lg font-poppins ">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`flex flex-col items-center lg:p-5 p-2  ${
              isSelected(date.getDate()) ? "drop-shadow-xl" : ""
            } rounded-lg cursor-pointer transition-colors border ${
              isActive(date) && isSelected(date.getDate())
                ? "border-rose-500"
                : "border-gray-300"
            } ${isActive(date) ? "bg-white" : "bg-gray-100"}`}
            onClick={() => {
              if (isActive(date)) {
                setSelectedDateslot(date.getDate());
                handleDateChange(date);
              }
            }}
          >
            <div
              className={`font-semibold text-2xl mb-2 ${
                isActive(date) && isSelected(date.getDate())
                  ? "text-[#F43F5E]"
                  : "text-gray-500"
              }  ${isActive(date) ? "" : "text-gray-300"}`}
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

      <div className=" flex flex-col items-start lg:h-96 justify-between  w-full">
        <h1 className=" lg:text-2xl lg:mb-6 xs:mb-2 text-lg mb-1">Time slots</h1>
        <div className="flex flex-wrap justify-between lg:flex-1 ml-4 lg:gap-4 gap-2  ">
          {availableTimeSlots.length > 0 ? (
            availableTimeSlots.map((slot, index) => (
              <div key={slot} className="">
                <label
                  className={`flex lg:p-4    border-2 items-center rounded-lg overflow-hidden ${
                    !availabletimedata[index]
                      ? "bg-gray-100 border-gray-200  cursor-not-allowed"
                      : "bg-white  hover:border-rose-300  cursor-pointer"
                  } ${ 
                     selectedSlot === slot
                      ? "bg-rose-400 border-rose-500  cursor-not-allowed"
                      : " "
                  }`}
                  
                >
                  <input
                    type="radio"
                    value={slot}
                    disabled={!availabletimedata[index]}
                    checked={selectedSlot === slot}
                    onChange={() => setSelectedSlot(slot)}
                    className="sr-only"
                  />
                  <div className={`lg:py-2  lg:px-4  p-2 lg:text-xl font-poppins ${
                    !availabletimedata[index]
                      ? "text-gray-400"
                      : "text-gray-800"
                  }  font-semibold`}>
                    {convertTimeFormat(slot)}
                  </div>
                </label>
              </div>
            ))
          ) : (
            <div className="text-red-400   font-semibold font-poppins  lg:text-3xl ">
              No slots available
            </div>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className={` absolute bottom-32 right-0 lg:p-4 p-2  px-7 lg:text-2xl ${
            selectedSlot
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          } rounded-l-full focus:outline-none focus:ring-2  focus:ring-green-500 transition duration-300 ease-in-out`}
        >
          Edit slots
        </button>
      </div>
    </>
  );
};

export default WeekCalendar;
