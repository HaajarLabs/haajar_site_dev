import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { createClient } from "@supabase/supabase-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "./Dropdown.jsx";
import { IoIosArrowDown } from "react-icons/io";

function Appointments() {
  const apiKey = process.env.SUPABASE_KEY;
  const apiUrl = process.env.SUPABASE_URL;
  const supabase = createClient(apiUrl, apiKey);
  const [appointments, setAppointments] = useState([]);
  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  const formatNumber = (number) => {
    return number.toString().padStart(2, "0");
  };

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = year + "-" + formatNumber(month) + "-" + formatNumber(day);
  const [selectedOption, setSelectedOption] = useState(today);
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
  const options = [today, tomorrow, dayAfterTomorrow];
  const [doc_name, setDocName] = useState("Dr. Haajar");
  // Fetch appointments data here
  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      getData(user.data.user.id);
    });
  }, []);

  const [start, setStart] = useState(false);
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      if (
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0
      ) {
        setStart((prevState) => (prevState ? false : prevState));
      }
    };

    const interval = setInterval(checkMidnight, 1000);

    return () => clearInterval(interval);
  }, []);

  async function getData(id) {
    const { data: drData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id);
    setDocName(drData[0].full_name);
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "appointments",
        },

        async (payload) => {
          const { data } = await supabase
            .from("appointments")
            .select("*")
            .eq("client_id", id);
          const app_data = data;

          const newAppointments = [];
          for (let index = 0; index < app_data.length; index++) {
            const { data: pat_data } = await supabase
              .from("patients")
              .select("*")
              .eq("pat_id", app_data[index].pat_id);

            const { data: slot_data } = await supabase
              .from("slots")
              .select("*")
              .eq("slot_id", app_data[index].slot_id);
            newAppointments.push({
              date: slot_data[0].slot_date,
              app_time: slot_data[0].slot_start_time,
              end_time: slot_data[0].slot_end_time,
              name: pat_data[0].pat_name,
              phone: pat_data[0].pat_ph_num,
              id: app_data[index].appointment_id,
              token: app_data[index].slot_id,
              visit_status: app_data[index].visit_status,
            });
          }

          setAppointments(newAppointments);
        }
      )
      .subscribe();

    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("client_id", id);
    const app_data = data;

    const newAppointments = [];
    for (let index = 0; index < app_data.length; index++) {
      const { data: pat_data } = await supabase
        .from("patients")
        .select("*")
        .eq("pat_id", app_data[index].pat_id);

      const { data: slot_data } = await supabase
        .from("slots")
        .select("*")
        .eq("slot_id", app_data[index].slot_id);
      newAppointments.push({
        date: slot_data[0].slot_date,
        app_time: slot_data[0].slot_start_time,
        end_time: slot_data[0].slot_end_time,
        name: pat_data[0].pat_name,
        phone: pat_data[0].pat_ph_num,
        id: app_data[index].appointment_id,
        token: app_data[index].slot_id,
        visit_status: app_data[index].visit_status,
      });
    }

    setAppointments(newAppointments);
  }

  const handleInputChange = async (
    appointment_id,
    visit_status,
    name,
    start_time,
    token
  ) => {
    if (visit_status == false) {
      let text =
        "Press ok to sent message to " + name + " for appointment reminder.";
      if (confirm(text) == true) {
        console.log("You pressed OK!");
        const currentDate = new Date(); // Get current date
        const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        const timeDifference = await compareTimes(start_time, currentTime);
        console.log("timedf", timeDifference);
        const messageData = {
          delay_change: timeDifference,
          slot_id: token,
        };
        try {
          const response = await fetch(
            "https://message-send.azurewebsites.net/update_check_slots",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Add any additional headers if required
              },
              body: JSON.stringify(messageData), // Convert messageData to JSON string
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response;

          console.log("Message sent successfully:", responseData);
        } catch (error) {
          console.error("Error sending message:", error.message);
        }
        const user = (await supabase.auth.getUser()).data.user;
        const { data, error } = await supabase
          .from("appointments")
          .upsert({
            appointment_id: appointment_id,
            visit_status: visit_status ? false : true,
            client_id: user.id,
          })
          .select();
        console.log(error);
      } else {
        console.log("You pressed Cancel!");
      }
    } else {
      const user = (await supabase.auth.getUser()).data.user;
      const { data, error } = await supabase
        .from("appointments")
        .upsert({
          appointment_id: appointment_id,
          visit_status: visit_status ? false : true,
          client_id: user.id,
        })
        .select();
      console.log(error);
    }
  };

  const handlestart = async (start_time) => {
    setStart(true);
    console.log(true);
    console.log("starttime", start_time);
    const currentDate = new Date(); // Get current date
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    console.log("current", currentTime);
    const timeDifference = await compareTimes(start_time, currentTime);
    console.log("startdf", timeDifference);
    const user = (await supabase.auth.getUser()).data.user;
    const messageData = {
      // client_id: user.id,
      slot_date: today,
      delay: timeDifference,
    };
    try {
      const response = await fetch(
        "https://message-send.azurewebsites.net/start_find_check_slots",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
          body: JSON.stringify(messageData), // Convert messageData to JSON string
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response;

      console.log("Message sent successfully:", responseData);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  function compareTimes(time1, time2) {
    const [hours1, minutes1] = time1.split(":").map(Number).slice(0, 2);
    const [hours2, minutes2] = time2.split(":").map(Number).slice(0, 2);

    // Convert both times to total minutes
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    // Calculate the difference in minutes
    const difference = totalMinutes2 - totalMinutes1;

    // Determine if time2 is delayed or early
    if (difference > 0) {
      return difference;
    } else if (difference < 0) {
      return difference;
    } else {
      return "On time";
    }
  }

  return (
    <div className="md:p-4    font-poppins   overflow-hidden ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex items-center mb-1 justify-between">
        <h1 className="md:text-2xl ss:text-xl font-semibold xs:text-md   pl-2">
          Appointments
        </h1>

        <div className="flex items-center">
          <div className="group">
            <button
              disabled={start}
              onClick={() =>
                handlestart(
                  appointments.length > 0
                    ? appointments
                        .filter(
                          (appointment) => appointment.date === selectedOption
                        )
                        .sort((a, b) => a.token - b.token)
                        .at(0).app_time // Sort appointments in ascending order of token
                    : "00:00:00"
                )
              }
              className={`${
                start ? "bg-rose-300" : "bg-rose-500"
              } group-hover:bg-rose-300 text-white p-2 mr-2 rounded ${
                appointments.length > 0 ? "" : "hidden"
              }xs:w-12 ss:h-10 xs:h-9 xs:text-xs  xs:p-1 xs:rounded   xs:mr-2 xs:ml-2 xs:text-white xs:font-semibold xs:tracking-wider xs:leading-3 xs:uppercase`}
            >
              Start now
            </button>
            <span class="absolute  top-60 right-48 duration-500  scale-0 transition-all rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100">
              Pressing this button will start the next patient's appointment and
              send reminders.⌛
            </span>
          </div>
          <Dropdown options={options} onSelect={handleSelect} />
        </div>
      </div>
      <table className=" min-w-full xs:mt-4 border-2 rounded-lg border-gray-100 px-10 divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="px-6 py-3 hidden sm:block text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slot Time
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>

            <th className="px-6 hidden sm:flex py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone No
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arrived
            </th>
            <th className="px-6 py-3 xs:block sm:hidden text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slot Time
            </th>
            <th className="px-6 hidden md:block py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Token No
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y  xs:text-xs md:text-base divide-gray-200">
          {appointments.filter(
            (appointment) => appointment.date === selectedOption
          ).length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-7">
                No appointments found
              </td>
            </tr>
          ) : (
            appointments
              .filter((appointment) => appointment.date === selectedOption)
              .sort((a, b) => a.token - b.token) // Sort appointments in ascending order of token
              .map((appointment, index, array) => {
                const nextAppointment =
                  index < array.length - 1 ? array[index + 1].name : "";
                const nextAppointmentPh =
                  index < array.length - 1 ? array[index + 1].phone : "";
                return (
                  <tr key={appointment.token}>
                    <td className="px-6 hidden sm:block py-7 whitespace-nowrap font-semibold ">
                      {appointment.app_time}
                    </td>
                    <td className="px-6 py-7 whitespace-nowrap font-semibold">
                      {appointment.name}
                    </td>
                    <td className="px-6 hidden sm:block py-7 whitespace-nowrap">
                      {appointment.phone.slice(2)}
                    </td>

                    <td className="px-6 py-7 whitespace-nowrap">
                      <Checkbox
                        color="success"
                        onChange={() =>
                          handleInputChange(
                            appointment.id,
                            appointment.visit_status,
                            nextAppointment,
                            appointment.end_time,
                            appointment.token
                          )
                        }
                        checked={appointment.visit_status ? true : false}
                      />
                    </td>
                    <td className="px-6  xs:block sm:hidden py-7 whitespace-nowrap font-semibold ">
                      {appointment.app_time}
                    </td>
                    <td className="px-6 py-7 hidden md:flex   whitespace-nowrap">
                      {appointment.token}
                    </td>
                  </tr>
                );
              })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
