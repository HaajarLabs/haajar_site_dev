import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { ThreeCircles } from 'react-loader-spinner';

const Modal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [slot_id, setSlotId] = useState();
  const [slot_data, setSlotData] = useState();
  const [loading, setLoading] = useState(false); // State to track loading
  const formatNumber = (number) => {
    return number.toString().padStart(2, '0');
  };
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = year + "-" + formatNumber(month) + "-" + formatNumber(day);
  date.setDate(date.getDate() + 1);
  const daytom = date.getDate();
  const monthtom = date.getMonth() + 1;
  const yeartom = date.getFullYear();
  const tomorrow = yeartom + "-" + formatNumber(monthtom)+ "-" + formatNumber(daytom);
  date.setDate(date.getDate() + 1);
  const daybf = date.getDate();
  const monthbf = date.getMonth() + 1;
  const yearbf = date.getFullYear();
  const dayAfterTomorrow = yearbf + "-" +formatNumber(monthbf)+ "-" + formatNumber(daybf);
  const availableDates = [today, tomorrow, dayAfterTomorrow];
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const apiKey = process.env.SUPABASE_KEY;
  const apiUrl = process.env.SUPABASE_URL;
  const supabase = createClient(apiUrl, apiKey);

  useEffect(() => {
    getSlotData();
  }, [selectedDate]);

  async function getSlotData() {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      const client_id = user.id;
      const formattedSelectedDate = selectedDate; // Use selectedDate directly
  
      const currentDate = new Date(); // Get current date
      const today = currentDate.toISOString().slice(0, 10); // Format current date as "YYYY-MM-DD"
      const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`; // Get current time in "HH:mm:ss" format
  
      const { data: slotData, error } = await supabase
        .from("slots")
        .select("*")
        .eq("client_id", client_id)
        .eq("slot_date", formattedSelectedDate) // Filter by selectedDate
        .eq("slot_available", true);
  
      if (error) {
        console.error("Error fetching slot data:", error.message);
        return;
      }
  
      const timeSlots = slotData
        .filter(slot => {
          if (formattedSelectedDate === today) {
            // Filter slots only if selectedDate is today
            const startTime = slot.slot_start_time;
            return compareTimes(startTime, currentTime) > 0; // Compare slot_start_time with current time
          }
          return true; // Return all slots if selectedDate is not today
        })
        .map(slot => slot.slot_start_time);
  
      setAvailableTimeSlots(timeSlots);
      setSlotData(slotData);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (!selectedSlot) {
      toast.error("Please select a time slot");
      setLoading(false); // Stop loading if error
      return;
    }

    const user = (await supabase.auth.getUser()).data.user;

    const { error } = await supabase
      .from("slots")
      .update({ slot_available: false })
      .eq("slot_id", slot_id)
      .eq("client_id", user.id)
      .select();

    if (error) {
      console.error("slot table error", error);
      setLoading(false); // Stop loading if error
      return;
    }

    const { data: patient_data, error: patient_error } = await supabase
      .from("patients")
      .select("pat_id")
      .order("pat_id", { ascending: false })
      .limit(1)
      .single();
console.log(patient_data);
    if (patient_error) {
      console.error("pat_id_error", patient_error);
      setLoading(false); // Stop loading if error
      return;
    }

    const newPatId = patient_data ? patient_data.pat_id + 1 : 1;


    const { error: insert_error } = await supabase
      .from("patients")
      .insert([
        {
          pat_id: newPatId,
          pat_ph_num: "91" + phone,
          pat_name: name,
          par_app_dates: [selectedDate],
          client_id: user.id,
        },
      ])
      .select();

    if (insert_error) {
      console.error("pat_error_ins", insert_error);
      setLoading(false); // Stop loading if error
      return;
    }

    const { data: app_data, error: app_err } = await supabase
      .from("appointments")
      .select("appointment_id")
      .order("appointment_id", { ascending: false })
      .limit(1)
      .single();

    if (app_err) {
      console.log("pat_error", app_err);
      setLoading(false); // Stop loading if error
      const newAppId = 400;
      console.log(newAppId);
    }
    const newAppId = app_data!=null ? app_data.appointment_id + 1 : 400;
      console.log(newAppId);
  
    const { error: app_error } = await supabase
      .from("appointments")
      .insert([
        {
          appointment_id: newAppId,
          slot_id: slot_id,
          pat_id: newPatId,
          msg_status: false,
          visit_status: false,
          book_medium: "manual",
          booked_on: date,
          client_id: user.id,
        },
      ])
      .select();

    if (app_error) {
      console.error("app_error", app_error);
      setLoading(false); // Stop loading if error
      return;
    }

    toast.success("Appointment added successfully");
    setLoading(false); // Stop loading after successful completion
    onClose(); // Close the modal
  };

  const convertDateFormat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
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

  const slot_id_fetch = (slot, id) => {
    setSelectedSlot(slot);
    setSlotId(slot_data[id].slot_id);
  };

  return (
    <div className="fixed inset-0 z-50 flex xs:mx-3 items-center justify-center backdrop-filter backdrop-blur-lg bg-slate-300 bg-opacity-30">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 border-2 border-green-300 block h-10 w-full px-2 focus:border-green-600 rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              maxLength={10} // Restrict input to maximum 10 characters
              pattern="[0-9]{10}" // Use pattern to allow only digits and exactly 10 characters
              title="Please enter a 10-digit phone number"
              required
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full h-10 border-green-300 px-2 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <label htmlFor="phone" className="block mt-1 mb-2 text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <div className="flex flex-wrap -mx-2">
            {availableDates.map((date) => (
              <div key={date} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/6 px-2 mb-4">
                <label
                  className={`flex border-2 border-green-400 items-center rounded-lg overflow-hidden ${
                    selectedDate === date
                      ? "bg-green-200 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100 cursor-pointer"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <input
                    type="radio"
                    value={date}
                    checked={selectedDate === date}
                    onChange={() => setSelectedDate(date)}
                    className="sr-only"
                  />
                  <div className="flex-1 py-2 px-4 text-xs font-poppins text-green-900 font-semibold">
                    {convertDateFormat(date)}
                  </div>
                </label>
              </div>
            ))}
          </div>
          <label htmlFor="phone" className="block mt-1 mb-2 text-sm font-medium text-gray-700">
            Slot time
          </label>
          <div className="flex flex-wrap -mx-2">
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((slot, index) => (
                <div key={slot} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 px-2 mb-4">
                  <label
                    className={`flex border-2 border-green-400 items-center rounded-lg overflow-hidden ${
                      selectedSlot === slot
                        ? "bg-green-200 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100 cursor-pointer"
                    }`}
                    onClick={() => slot_id_fetch(slot, index)}
                  >
                    <input
                      type="radio"
                      value={slot}
                      checked={selectedSlot === slot}
                      onChange={() => setSelectedSlot(slot)}
                      className="sr-only"
                    />
                    <div className="flex-1 py-2 px-4 text-xs font-poppins text-green-900 font-semibold">
                      {convertTimeFormat(slot)}
                    </div>
                  </label>
                </div>
              ))
            ) : (
              <div className="text-red-500">No slots available</div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 py-2 px-4 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedSlot || loading}
              className={`py-2 px-4 text-sm ${
                selectedSlot
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out`}
            >
              {loading ? (
               <ThreeCircles
               visible={true}
               height="15"
               width="15"
               color="#ffffff"
               ariaLabel="three-circles-loading"
               wrapperStyle={{}}
               wrapperClass=""
               />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
