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

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = year + "-" +"0"+ month + "-" + day;
  const [selectedOption, setSelectedOption] = useState(today);
  const tomorrow = year + "-"+"0" + month + "-" + (day + 1);
  const dayAfterTomorrow = year + "-"+"0"+ month + "-" + (day + 2);
  const options = [today, tomorrow, dayAfterTomorrow];
  // Fetch appointments data here
  useEffect(() => {
  
    supabase.auth.getUser().then((user) => {
      getData(user.data.user.id);
    });
  }, []);

  async function getData(id) {
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
 

  const handleInputChange = async (appointment_id, visit_status, name) => {
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
  };

  return (
    <div className="m-4   font-poppins   overflow-hidden ">
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
        <h1 className="text-2xl font-semibold  pl-2">Appointments</h1>

        <Dropdown options={options} onSelect={handleSelect} />
      </div>
      <table className=" min-w-full border-2 rounded-lg border-gray-100 px-10 divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slot Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Token No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arrived
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {appointments
  .filter(appointment => appointment.date === selectedOption)
  .sort((a, b) => a.token - b.token) // Sort appointments in ascending order of token
  .map((appointment, index, array) => {
    const nextAppointment = index < array.length - 1 ? array[index + 1].name : "";
    return (
      <tr key={appointment.token}>
        <td className="px-6 py-7 whitespace-nowrap font-semibold">
          {appointment.app_time}
        </td>
        <td className="px-6 py-7 whitespace-nowrap font-semibold">
          {appointment.name}
        </td>
        <td className="px-6 py-7 whitespace-nowrap">
          {appointment.phone.slice(2)}
        </td>
        <td className="px-6 py-7 whitespace-nowrap">
          {appointment.token}
        </td>
        <td className="px-6 py-7 whitespace-nowrap">
          <Checkbox
            color="success"
            onChange={() =>
              handleInputChange(
                appointment.id,
                appointment.visit_status,
                nextAppointment
              )
            }
            checked={appointment.visit_status ? true : false}
          />
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
