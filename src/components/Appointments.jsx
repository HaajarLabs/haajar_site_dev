import React, { useEffect, useReducer, useMemo, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { format, parse, addDays } from "date-fns";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Utility functions for date formatting
const formatDateForDisplay = (dateString) => {
  return format(parse(dateString, "yyyy-MM-dd", new Date()), "dd-MM-yyyy");
};

const parseDateForDB = (dateString) => {
  return format(parse(dateString, "dd-MM-yyyy", new Date()), "yyyy-MM-dd");
};

const formatTimeForDisplay = (timeString) => {
  return format(parse(timeString, "HH:mm:ss", new Date()), "h:mm a");
};

const getTodayFormatted = () => format(new Date(), "dd-MM-yyyy");

// Sub-components
const TabButton = React.memo(({ isSelected, onClick, children }) => (
  <button
    className={`px-4 py-3 rounded text-md font-semibold uppercase transition duration-300 ${
      isSelected
        ? "bg-green-500 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-green-100"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
));

const DateSelector = React.memo(({ value, onChange, dates }) => (
  <select
    value={value || getTodayFormatted()}
    onChange={onChange}
    className="border border-gray-300 rounded px-3 py-1 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {dates.map((date) => (
      <option key={date} value={date}>
        {date}
      </option>
    ))}
  </select>
));

// Initial state
const initialState = {
  appointments: [],
  allAppointments: [],
  selectedSlot: Cookies.get("selectedSlot") || "ALL",
  selectedDate: Cookies.get("selectedDate") || getTodayFormatted(),
  canStart: false,
  start: false,
  isLoading: true,
  doctorSlotSpecs: [],
  error: null,
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload, isLoading: false };
    case "SET_ALL_APPOINTMENTS":
      return { ...state, allAppointments: action.payload };
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.payload.slotSpec]: [
            ...(state.appointments[action.payload.slotSpec] || []),
            action.payload.appointment,
          ],
        },
        allAppointments: [...state.allAppointments, action.payload.appointment],
      };
    case "SET_SELECTED_SLOT":
      return { ...state, selectedSlot: action.payload };
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload };
    case "SET_CAN_START":
      return { ...state, canStart: action.payload };
    case "SET_START":
      return { ...state, start: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "UPDATE_APPOINTMENT":
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [state.selectedSlot]:
            state.appointments[state.selectedSlot]?.map((app) =>
              app.appointment_id === action.payload.id
                ? { ...app, visit_status: action.payload.status }
                : app
            ) || [],
        },
        allAppointments: state.allAppointments.map((app) =>
          app.appointment_id === action.payload.id
            ? { ...app, visit_status: action.payload.status }
            : app
        ),
      };
    case "DELETE_APPOINTMENT":
      return {
        ...state,
        appointments: Object.fromEntries(
          Object.entries(state.appointments).map(([key, appointments]) => [
            key,
            appointments.filter(
              (app) => app.appointment_id !== action.payload.id
            ),
          ])
        ),
        allAppointments: state.allAppointments.filter(
          (app) => app.appointment_id !== action.payload.id
        ),
      };
    case "SET_DOCTOR_SLOT_SPECS":
      return { ...state, doctorSlotSpecs: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function Appointments() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = useCallback(async (userId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const [{ data: profileData }, { data: appointmentsData }] =
        await Promise.all([
          supabase
            .from("profiles")
            .select("can_start, start_status, slot_spec")
            .eq("id", userId)
            .single(),
          supabase
            .from("appointments")
            .select(
              `
          *,
          patients:pat_id (pat_name, pat_ph_num),
          slots:slot_id (slot_date, slot_start_time, slot_end_time, slot_spec)
        `
            )
            .eq("client_id", userId),
        ]);

      if (!profileData || !appointmentsData) {
        throw new Error("Failed to fetch data");
      }

      dispatch({ type: "SET_CAN_START", payload: profileData.can_start });
      dispatch({ type: "SET_START", payload: profileData.start_status });
      dispatch({
        type: "SET_DOCTOR_SLOT_SPECS",
        payload: profileData.slot_spec,
      });

      const groupedAppointments = appointmentsData.reduce(
        (acc, appointment) => {
          const { slots, patients, ...appointmentData } = appointment;
          const formattedAppointment = {
            ...appointmentData,
            date: formatDateForDisplay(slots.slot_date),
            appTime: formatTimeForDisplay(slots.slot_start_time),
            endTime: formatTimeForDisplay(slots.slot_end_time),
            name: patients.pat_name,
            phone: patients.pat_ph_num,
            originalDate: slots.slot_date,
            slots: slots,
          };

          acc[slots.slot_spec] = [
            ...(acc[slots.slot_spec] || []),
            formattedAppointment,
          ];
          return acc;
        },
        {}
      );

      const allAppointments = Object.values(groupedAppointments).flat();

      dispatch({ type: "SET_APPOINTMENTS", payload: groupedAppointments });
      dispatch({ type: "SET_ALL_APPOINTMENTS", payload: allAppointments });

      if (!state.selectedSlot) {
        dispatch({ type: "SET_SELECTED_SLOT", payload: "ALL" });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
      toast.error("Failed to fetch appointments");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await getData(user.id);

        // Set today's date if it's the first render (no cookie)
        if (!Cookies.get("selectedDate")) {
          const today = getTodayFormatted();
          dispatch({ type: "SET_SELECTED_DATE", payload: today });
          Cookies.set("selectedDate", today, { expires: 7 });
        }

        const appointmentSubscription = supabase
          .channel("schema-db-changes")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "appointments" },
            handleAppointmentChange
          )
          .subscribe();

        return () => {
          appointmentSubscription.unsubscribe();
        };
      }
    };
    fetchData();
  }, [getData]);

  const handleAppointmentChange = useCallback(async (payload) => {
    const { new: newAppointment, old: oldAppointment, eventType } = payload;

    try {
      if (eventType === "INSERT" || eventType === "UPDATE") {
        const { data, error } = await supabase
          .from("appointments")
          .select(
            `
            *,
            patients:pat_id (pat_name, pat_ph_num),
            slots:slot_id (slot_date, slot_start_time, slot_end_time, slot_spec)
          `
          )
          .eq("appointment_id", newAppointment.appointment_id)
          .single();

        if (error) throw error;

        const { slots, patients, ...appointmentData } = data;
        const formattedAppointment = {
          ...appointmentData,
          date: formatDateForDisplay(slots.slot_date),
          appTime: formatTimeForDisplay(slots.slot_start_time),
          endTime: formatTimeForDisplay(slots.slot_end_time),
          name: patients.pat_name,
          phone: patients.pat_ph_num,
          originalDate: slots.slot_date,
          slots: slots,
        };

        if (eventType === "INSERT") {
          dispatch({
            type: "ADD_APPOINTMENT",
            payload: {
              slotSpec: slots.slot_spec,
              appointment: formattedAppointment,
            },
          });
          toast.success(
            `New appointment added for ${formattedAppointment.name}`
          );
        } else if (eventType === "UPDATE") {
          dispatch({
            type: "UPDATE_APPOINTMENT",
            payload: {
              id: newAppointment.appointment_id,
              status: newAppointment.visit_status,
            },
          });
        }
      } else if (eventType === "DELETE") {
        dispatch({
          type: "DELETE_APPOINTMENT",
          payload: { id: oldAppointment.appointment_id },
        });
        toast.warning(`Appointment deleted`);
      }
    } catch (error) {
      console.error("Error handling appointment change:", error);
      toast.error("Failed to update appointment data");
    }
  }, []);

  const getNext7Days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = i === 0 ? today : addDays(today, i);
      return formatDateForDisplay(format(date, "yyyy-MM-dd"));
    });
  }, []);

  const handleTabSelect = useCallback((slot) => {
    dispatch({ type: "SET_SELECTED_SLOT", payload: slot });
    Cookies.set("selectedSlot", slot, { expires: 7 });
  }, []);

  const handleDateSelect = useCallback((e) => {
    const date = e.target.value;
    dispatch({ type: "SET_SELECTED_DATE", payload: date });
    Cookies.set("selectedDate", date, { expires: 7 });
  }, []);

  const filteredAppointments = useMemo(() => {
    return state.allAppointments.filter(
      (app) =>
        (state.selectedSlot === "ALL" ||
          app.slots.slot_spec === state.selectedSlot) &&
        (!state.selectedDate || app.date === state.selectedDate)
    );
  }, [state.allAppointments, state.selectedSlot, state.selectedDate]);

  const handleInputChange = useCallback(
    async (appointmentId, currentVisitStatus, name, time) => {
      try {
        const updatedStatus = !currentVisitStatus;
        const { error } = await supabase
          .from("appointments")
          .update({ visit_status: updatedStatus })
          .eq("appointment_id", appointmentId);

        if (error) throw error;

        dispatch({
          type: "UPDATE_APPOINTMENT",
          payload: { id: appointmentId, status: updatedStatus },
        });
        const user = (await supabase.auth.getUser()).data.user.id;
        const today = getTodayFormatted();
        // Make the API call
        const messageData = {
          client_id: user,
          slot_id: appointmentId,
          slot_date: parseDateForDB(today),
        };
        const response = await fetch(
          "https://message-send.azurewebsites.net/update_check_slots",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(messageData),
          }
        );
        console.log("response", response);
        toast.success(`${name}'s appointment at ${time} was updated`);
      } catch (error) {
        console.error("Error updating appointment:", error);
        toast.error("An error occurred while updating the appointment");
      }
    },
    []
  );

  const handlestart = useCallback(async () => {
    if (state.canStart) return;

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // Update the profile
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ can_start: false, start_status: true })
          .eq("id", user.id);

        if (profileError) throw profileError;

        dispatch({ type: "SET_CAN_START", payload: false });
        dispatch({ type: "SET_START", payload: true });

        // Find the next appointment
        const today = getTodayFormatted();
        const nextAppointment = state.allAppointments
          .filter((app) => app.date === today)
          .sort((a, b) => a.token - b.token)[0];

        if (!nextAppointment) {
          toast.warning("No appointments found for today");
          return;
        }

        // Make the API call
        const messageData = {
          client_id: user.id,
          slot_date: parseDateForDB(today),
        };

        const response = await fetch(
          "https://message-send.azurewebsites.net/start_find_check_slots",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(messageData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        toast.success(
          `Started appointments for today. Notified client for appointment at ${nextAppointment.appTime}`
        );
      }
    } catch (error) {
      console.error("Error starting appointment:", error);
      toast.error("Failed to start appointment");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.canStart, state.allAppointments]);

  const renderTabs = useCallback(() => {
    return (
      <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
        <TabButton
          isSelected={state.selectedSlot === "ALL"}
          onClick={() => handleTabSelect("ALL")}
        >
          ALL
        </TabButton>
        {Array.isArray(state.doctorSlotSpecs) &&
          state.doctorSlotSpecs.map((slotSpec) => (
            <TabButton
              key={slotSpec}
              isSelected={state.selectedSlot === slotSpec}
              onClick={() => handleTabSelect(slotSpec)}
            >
              {slotSpec}
            </TabButton>
          ))}
      </div>
    );
  }, [state.selectedSlot, state.doctorSlotSpecs, handleTabSelect]);

  if (state.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (state.error) {
    return <div className="text-red-500">Error: {state.error}</div>;
  }

  return (
    <div className="md:p-4 font-poppins">
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

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        {renderTabs()}

        <div className="w-auto h-auto sm:w-auto">
          {/* {console.log("canStart:", state.canStart, "allAppointments:", state.allAppointments.length)} */}
          {state.allAppointments.length > 0 && (
            <button
              onClick={handlestart}
              disabled={state.isLoading}
              className={`${
                state.isLoading ? "bg-rose-300" : "bg-rose-500"
              } group-hover:bg-rose-300 text-white p-2 mr-2 rounded  
    lg:w-32 lg:h-10 lg:text-base lg:font-semibold lg:tracking-wider lg:leading-3 
     xs:w-12 ss:h-10 xs:h-9 xs:text-xs xs:p-1 xs:rounded xs:mr-2 xs:ml-2 
     xs:text-white xs:font-semibold xs:tracking-wider xs:leading-3 xs:uppercase`}
            >
              {state.isLoading ? "Processing..." : "Start now"}
            </button>
          )}
          <DateSelector
            value={state.selectedDate}
            onChange={handleDateSelect}
            dates={getNext7Days}
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {filteredAppointments.length > 0 ? (
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                {state.selectedSlot === "ALL" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slot
                  </th>
                )}
                {state.selectedSlot !== "ALL" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.appointment_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.appTime} - {appointment.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.phone}
                  </td>
                  {state.selectedSlot === "ALL" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {appointment.slots.slot_spec}
                    </td>
                  )}
                  {state.selectedSlot !== "ALL" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className={`px-4 py-2 text-sm rounded ${
                          appointment.visit_status
                            ? "bg-green-500"
                            : "bg-red-500"
                        } text-white hover:opacity-90 transition duration-300`}
                        onClick={() =>
                          handleInputChange(
                            appointment.appointment_id,
                            appointment.visit_status,
                            appointment.name,
                            appointment.appTime
                          )
                        }
                      >
                        {appointment.visit_status
                          ? "Visited"
                          : "Mark as Visited"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                {state.selectedSlot === "ALL" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slot
                  </th>
                )}
                {state.selectedSlot !== "ALL" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td
                  colSpan={state.selectedSlot === "ALL" ? 5 : 5}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
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
