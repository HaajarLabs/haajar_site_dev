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
    return number.toString().padStart(2, '0');
  };

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = year + "-" + "0" + month + "-" + formatNumber(day);
  const [selectedOption, setSelectedOption] = useState(today);
  date.setDate(date.getDate() + 1);
  const daytom = date.getDate();
  const monthtom = date.getMonth() + 1;
  const yeartom = date.getFullYear();
  const tomorrow = yeartom + "-" + "0" + monthtom + "-" + formatNumber(daytom);
  date.setDate(date.getDate() + 1);
  const daybf = date.getDate();
  const monthbf = date.getMonth() + 1;
  const yearbf = date.getFullYear();
  const dayAfterTomorrow = yearbf + "-" + "0" + monthbf + "-" + formatNumber(daybf);
  const options = [today, tomorrow, dayAfterTomorrow];
  const [doc_name, setDocName] = useState("Dr. Haajar");
  // Fetch appointments data here
  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      getData(user.data.user.id);
    });
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
    number
  ) => {
    if (visit_status == false) {
      let text =
        "Press ok to sent message to " + name + " for appointment reminder.";
      if (confirm(text) == true) {
        console.log("You pressed OK!");
        const messageData = {
          rec_num: number,
          doctor_nam: doc_name,
          reci_nam: name,
        };
        console.log(messageData);
        try {
          const response = await fetch(
            "https://haajar-client.azurewebsites.net/send_message",
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

          const responseData = await response; // Assuming response is JSON

          console.log("Message sent successfully:", responseData);
          if (!visit_status) {
            toast.success(`Message Sent to ${name}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
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
        } catch (error) {
          console.error("Error sending message:", error.message);
          throw error; // Throw error to handle in calling function
        }
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
        <h1 className="md:text-2xl ss:text-xl font-semibold xs:text-md   pl-2">Appointments</h1>

        <Dropdown options={options} onSelect={handleSelect} />
      </div>
      <table className=" min-w-full xs:mt-4 border-2 rounded-lg border-gray-100 px-10 divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="px-6 py-3 hidden md:block text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slot Time
            </th>
            
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
        
            <th className="px-6 hidden md:flex py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone No
            </th>
           
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arrived
            </th>
            <th className="px-6 hidden ss:block py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Token No
            </th> 
          </tr>
        </thead>
        <tbody className="bg-white divide-y xs:text-xs md:text-base divide-gray-200">
          {
          appointments.filter((appointment) => appointment.date === selectedOption).length === 0 ?
            <tr>
              <td colSpan="5" className="text-center py-7">
                No appointments found
              </td>
            </tr>
          :
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
                  <td className="px-6 hidden md:flex py-7 whitespace-nowrap font-semibold ">
                    {appointment.app_time}
                  </td>
                  <td className="px-6 py-7 whitespace-nowrap font-semibold">
                    {appointment.name}
                  </td>
                  <td className="px-6 hidden md:flex py-7 whitespace-nowrap">
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
                          nextAppointmentPh
                        )
                      }
                      checked={appointment.visit_status ? true : false}
                    />
                  </td>
                  <td className="px-6 py-7 hidden ss:flex   whitespace-nowrap">
                    {appointment.token}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
