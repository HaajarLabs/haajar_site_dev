
import React, { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
function Appointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      token: "123",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Jane Doe",
      phone: "987-654-3210",
      token: "456",
      status: "Pending",
    },
    {
      id: 3,
      name: "Alice",
      phone: "456-789-0123",
      token: "789",
      status: "Confirmed",
    },
    {
      id: 4,
      name: "Bob",
      phone: "789-012-3456",
      token: "012",
      status: "Pending",
    },
    {
      id: 5,
      name: "Eve",
      phone: "345-678-9012",
      token: "345",
      status: "Confirmed",
    },
    {
      id: 6,
      name: "Alex",
      phone: "678-901-2345",
      token: "678",
      status: "Pending",
    },
    {
      id: 7,
      name: "Sarah",
      phone: "901-234-5678",
      token: "901",
      status: "Confirmed",
    },
    {
      id: 8,
      name: "Mike",
      phone: "234-567-8901",
      token: "234",
      status: "Pending",
    },
    {
      id: 9,
      name: "Emily",
      phone: "567-890-1234",
      token: "567",
      status: "Confirmed",
    },
    {
      id: 10,
      name: "David",
      phone: "890-123-4567",
      token: "890",
      status: "Pending",
    },
    {
      id: 11,
      name: "Olivia",
      phone: "123-456-7890",
      token: "123",
      status: "Confirmed",
    },
    {
      id: 12,
      name: "Daniel",
      phone: "987-654-3210",
      token: "456",
      status: "Pending",
    },
    {
      id: 13,
      name: "Sophia",
      phone: "456-789-0123",
      token: "789",
      status: "Confirmed",
    },
    {
      id: 14,
      name: "Matthew",
      phone: "789-012-3456",
      token: "012",
      status: "Pending",
    },
  ]);

  // Fetch appointments data here
  useEffect(() => {
    // This is a placeholder. Replace this with your actual data fetching logic.
    fetch("/api/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data));
  }, []);

  return (
    <div className="m-4  overflow-hidden ">
        <h1 className="text-2xl font-semibold mb-4 pl-2">Appointments</h1>
      <table className=" min-w-full border-2 rounded-lg border-gray-100 px-10 divide-y divide-gray-200">
        <thead className="">
          <tr>
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
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-7 whitespace-nowrap font-semibold">
                {appointment.name}
              </td>
              <td className="px-6 py-7 whitespace-nowrap">
                {appointment.phone}
              </td>
              <td className="px-6 py-7 whitespace-nowrap">
                {appointment.token}
              </td>
            
              <td className="px-6 py-7 whitespace-nowrap">
             
              
     <Checkbox color="success"/> 

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
