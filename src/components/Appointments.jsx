import React, { useEffect, useReducer, useMemo, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Utility functions for date formatting
const formatDateForDisplay = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

const parseDateForDB = (dateString) => {
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

const formatTimeForDisplay = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${period}`;
};

// Initial state
const initialState = {
  appointments: {},
  allAppointments: [],
  selectedSlot: Cookies.get("selectedSlot") || "ALL",
  selectedDate: Cookies.get("selectedDate") || "",
  start: false,
  canStart: false,
  isLoading: true,
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload, isLoading: false };
    case 'SET_ALL_APPOINTMENTS':
      return { ...state, allAppointments: action.payload };
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.payload.slotSpec]: [
            ...(state.appointments[action.payload.slotSpec] || []),
            action.payload.appointment
          ]
        },
        allAppointments: [...state.allAppointments, action.payload.appointment]
      };
    case 'SET_SELECTED_SLOT':
      return { ...state, selectedSlot: action.payload };
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SET_START':
      return { ...state, start: action.payload };
    case 'SET_CAN_START':
      return { ...state, canStart: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [state.selectedSlot]: state.appointments[state.selectedSlot].map(
            app => app.appointment_id === action.payload.id ? { ...app, visit_status: action.payload.status } : app
          )
        },
        allAppointments: state.allAppointments.map(
          app => app.appointment_id === action.payload.id ? { ...app, visit_status: action.payload.status } : app
        )
      };
    default:
      return state;
  }
}

function Appointments() {
  const supabase = useMemo(() => createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY), []);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = useCallback(async (userId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const [{ data: profileData }, { data: appointmentsData }] = await Promise.all([
        supabase.from("profiles").select("can_start, start_status").eq("id", userId).single(),
        supabase.from("appointments").select(`
          *,
          patients:pat_id (pat_name, pat_ph_num),
          slots:slot_id (slot_date, slot_start_time, slot_end_time, slot_spec)
        `).eq("client_id", userId)
      ]);

      dispatch({ type: 'SET_CAN_START', payload: profileData.can_start });
      dispatch({ type: 'SET_START', payload: profileData.start_status });

      const groupedAppointments = appointmentsData.reduce((acc, appointment) => {
        const { slots, patients, ...appointmentData } = appointment;
        const formattedAppointment = {
          ...appointmentData,
          date: formatDateForDisplay(slots.slot_date),
          appTime: formatTimeForDisplay(slots.slot_start_time),
          endTime: formatTimeForDisplay(slots.slot_end_time),
          name: patients.pat_name,
          phone: patients.pat_ph_num,
          originalDate: slots.slot_date,
          slots: slots
        };
        
        if (!acc[slots.slot_spec]) {
          acc[slots.slot_spec] = [];
        }
        acc[slots.slot_spec].push(formattedAppointment);
        return acc;
      }, {});

      const allAppointments = Object.values(groupedAppointments).flat();

      dispatch({ type: 'SET_APPOINTMENTS', payload: groupedAppointments });
      dispatch({ type: 'SET_ALL_APPOINTMENTS', payload: allAppointments });
      
      if (!state.selectedSlot) {
        dispatch({ type: 'SET_SELECTED_SLOT', payload: 'ALL' });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch appointments");
    }
  }, [supabase]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await getData(user.id);
        
        // Set up real-time listener for new appointments
        const appointmentSubscription = supabase
          .channel('appointments-channel')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'appointments' }, async (payload) => {
            const { new: newAppointment } = payload;
            
            // Fetch the full appointment data
            const { data, error } = await supabase
              .from("appointments")
              .select(`
                *,
                patients:pat_id (pat_name, pat_ph_num),
                slots:slot_id (slot_date, slot_start_time, slot_end_time, slot_spec)
              `)
              .eq("appointment_id", newAppointment.appointment_id)
              .single();

            if (error) {
              console.error("Error fetching new appointment data:", error);
              return;
            }

            const { slots, patients, ...appointmentData } = data;
            const formattedAppointment = {
              ...appointmentData,
              date: formatDateForDisplay(slots.slot_date),
              appTime: formatTimeForDisplay(slots.slot_start_time),
              endTime: formatTimeForDisplay(slots.slot_end_time),
              name: patients.pat_name,
              phone: patients.pat_ph_num,
              originalDate: slots.slot_date,
              slots: slots
            };

            dispatch({
              type: 'ADD_APPOINTMENT',
              payload: {
                slotSpec: slots.slot_spec,
                appointment: formattedAppointment
              }
            });

            toast.success('New appointment added!');
          })
          .subscribe();

        // Set up real-time listener for cancelled appointments
        const cancelledAppointmentSubscription = supabase
          .channel('appointments-channel')
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'appointments' }, async (payload) => {
            const { new: updatedAppointment } = payload;
            
            dispatch({
              type: 'UPDATE_APPOINTMENT',
              payload: {
                id: updatedAppointment.appointment_id,
                status: updatedAppointment.visit_status
              }
            });

            toast.success('Appointment status updated!');
          })
          .subscribe();

        // Clean up the subscriptions when the component unmounts
        return () => {
          appointmentSubscription.unsubscribe();
          cancelledAppointmentSubscription.unsubscribe();
        };
      }
    };
    fetchData();
  }, [supabase, getData]);

  const getNext7Days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return formatDateForDisplay(date.toISOString().split('T')[0]);
    });
  }, []);

  const handleTabSelect = useCallback((slot) => {
    dispatch({ type: 'SET_SELECTED_SLOT', payload: slot });
    Cookies.set("selectedSlot", slot, { expires: 7 });
  }, []);

  const handleDateSelect = useCallback((date) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
    Cookies.set("selectedDate", date, { expires: 7 });
  }, []);

  const filteredAppointments = useMemo(() => {
    if (state.selectedSlot === 'ALL') {
      return state.allAppointments.filter(appointment => appointment.date === state.selectedDate);
    }
    return (state.appointments[state.selectedSlot] || []).filter(appointment => appointment.date === state.selectedDate);
  }, [state.appointments, state.allAppointments, state.selectedSlot, state.selectedDate]);

  const handleInputChange = async (appointmentId, currentVisitStatus, name, time) => {
    try {
      const updatedStatus = !currentVisitStatus;
      const { error } = await supabase
        .from("appointments")
        .update({ visit_status: updatedStatus })
        .eq("appointment_id", appointmentId);

      if (error) {
        toast.error("Failed to update appointment status");
        return;
      }

      dispatch({
        type: 'UPDATE_APPOINTMENT',
        payload: { id: appointmentId, status: updatedStatus }
      });

      toast.success(`${name}'s appointment at ${time} was updated`);
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("An error occurred while updating the appointment");
    }
  };

  const handlestart = async (time) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({ start_status: true })
          .eq("id", user.id);

        if (!error) {
          dispatch({ type: 'SET_START', payload: true });
          toast.success(`Started appointments for ${time}`);
        }
      }
    } catch (error) {
      console.error("Error starting appointments:", error);
      toast.error("Failed to start appointments");
    }
  };

  if (state.isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="md:p-4 font-poppins">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      
      {state.canStart && !state.start && (
        <button
          onClick={() => handlestart("08:00:00")}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
        >
          Start Appointment
        </button>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
          <button
            className={`px-4 py-3 rounded text-md font-semibold uppercase transition duration-300 ${
              state.selectedSlot === 'ALL'
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-green-100"
            }`}
            onClick={() => handleTabSelect('ALL')}
          >
            ALL
          </button>
          {Object.keys(state.appointments).map((slotSpec) => (
            <button
              key={slotSpec}
              className={`px-4 py-3 rounded text-md font-semibold uppercase transition duration-300 ${
                state.selectedSlot === slotSpec
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-green-100"
              }`}
              onClick={() => handleTabSelect(slotSpec)}
            >
              {slotSpec}
            </button>
          ))}
        </div>
        
        <div className="w-full sm:w-auto">
          <select
            value={state.selectedDate}
            onChange={(e) => handleDateSelect(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Date</option>
            {getNext7Days.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {filteredAppointments.length > 0 ? (
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                {state.selectedSlot === 'ALL' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                )}
                {state.selectedSlot !== 'ALL' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.appointment_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.appTime} - {appointment.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.phone}</td>
                  {state.selectedSlot === 'ALL' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{appointment.slots.slot_spec}</td>
                  )}
                  {state.selectedSlot !== 'ALL' && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleInputChange(appointment.appointment_id, appointment.visit_status, appointment.name, appointment.appTime)}
                      className={`px-4 py-2 rounded text-sm font-medium transition duration-300 ${
                        appointment.visit_status
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {appointment.visit_status ? "Visited" : "Mark Visited"}
                    </button>
                  </td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                {state.selectedSlot === 'ALL' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                )}
                {/*if the selected slot is from db then only we want the actions button*/}
                {state.selectedSlot !== 'ALL' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>  
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan={state.selectedSlot === 'ALL' ? 6 : 5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  No appointments found for the selected date and slot
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Appointments;