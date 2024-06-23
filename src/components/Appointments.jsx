import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import {  createClient } from "@supabase/supabase-js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Appointments() {

  const apiKey = process.env.SUPABASE_KEY;
  const apiUrl = process.env.SUPABASE_URL;
  const supabase = createClient(
    apiUrl,
    apiKey
  );
  const [appointments, setAppointments] = useState([]);

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
          const { data } = await supabase.from("appointments").select("*").eq("client_id", id);
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
              date: slot_data[0].slot_start_time,
              name: pat_data[0].pat_name,
              phone: pat_data[0].pat_ph_num,
              token: app_data[index].slot_id,
              id: app_data[index].appointment_id,
              visit_status: app_data[index].visit_status,
            });
          }
          setAppointments(newAppointments);

        }
      )
      .subscribe();
    const { data } = await supabase.from("appointments").select("*").eq("client_id", id);
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
        date: slot_data[0].slot_start_time,
        name: pat_data[0].pat_name,
        phone: pat_data[0].pat_ph_num,
        id: app_data[index].appointment_id,
        token: app_data[index].slot_id,
        visit_status: app_data[index].visit_status,
      });
    }
    setAppointments(newAppointments);
  }



  const handleInputChange = async (appointment_id,visit_status,name) => {
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
const { data, error } = await supabase
  .from('appointments')
  .upsert({ appointment_id: appointment_id, visit_status: visit_status ? false : true })
  .select();
console.log(error);
  };

  return (
    <div className="m-4   overflow-hidden ">
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

      <h1 className="text-2xl font-semibold mb-4 pl-2">Appointments</h1>
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
            .sort((a, b) => a.token - b.token) // Sort appointments in ascending order of token
            .map((appointment, index) => (
              <tr key={appointment.token}>
                <td className="px-6 py-7 whitespace-nowrap font-semibold">
                  {appointment.date}
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
                    onChange={() => handleInputChange(appointment.id, appointment.visit_status, index < appointments.length - 1 ? `, ${appointments[index + 1].name}` : "")}
                    checked={appointment.visit_status ? true : false}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default Appointments;
