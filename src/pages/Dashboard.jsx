// import React,{useState} from "react";
// import Dashnav from "../components/Dashnav";
// import styles from "../style";
// import { FaArrowRight } from "react-icons/fa";
// import Footer from "../components/Footer";
// import FloatingButton from "../widgets/Floatingbutton";
// import Model from "../widgets/Model";

// const Dashboard = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [className, setClassName] = useState('');
//   const [file, setFile] = useState(null);

//   const handleClassNameChange = (e) => {
//     setClassName(e.target.value);
//   };

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can handle form submission here
//     console.log('Class Name:', className);
//     console.log('Uploaded File:', file);
//     // Reset form fields
//     setClassName('');
//     setFile(null);
//     setShowModal(false);
//   };

//   const handleMouseEnter = (index) => {
//     setIsHovered(true);
//     setHoveredIndex(index);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setHoveredIndex(null);
//   };
//   const handleButtonClick = (value) => {
//     console.log('Value received from Navbar:', value);
//     value=='clicked'?setShowModal(true):setShowModal(false)
//     // You can do something with the value here
//   };
//   const classList = [
//     {
//       classname: "EC6B",

//       googleLink: "https://docs.google.com/document/d/your_document_id/edit",
//       pdfUploaded: true,
//     },
//     {
//       classname: "EC4B",

//       googleLink: "https://docs.google.com/document/d/your_document_id/edit",
//       pdfUploaded: false,
//     },
//     {
//       classname: "ME4",

//       googleLink: "https://docs.google.com/document/d/your_document_id/edit",
//       pdfUploaded: true,
//     },
//     {
//       classname: "EB4A",

//       googleLink: "https://docs.google.com/document/d/your_document_id/edit",
//       pdfUploaded: true,
//     },
//     {
//       classname: "CS6B",

//       googleLink: "https://docs.google.com/document/d/your_document_id/edit",
//       pdfUploaded: false,
//     },
//   ];

//   return (
//     <div className="font-poppins w-full bg-primary  text-black overflow-hidden">
//        <Model isvisible={showModal} onClose={async () => setShowModal(false)}>
//        <div className="max-w-md mx-auto ">
//       <form onSubmit={handleSubmit} className=" rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class-name">
//             Class Name
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="class-name"
//             type="text"
//             placeholder="Enter Class Name"
//             value={className}
//             onChange={handleClassNameChange}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
//             Upload File
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="file"
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={handleFileChange}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             className="bg-black hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="submit"
//           >
//             Upload
//           </button>
//         </div>
//       </form>
//     </div>
//       </Model>
//       <div className={`${styles.paddingX} ${styles.flexCenter}`}>
//         <div>
//           <Dashnav handleButtonClick={handleButtonClick} />{" "}
//         </div>
//       </div>
//       <h1 className="  text-6xl mt-20  py-12 px-14">Classes</h1>

//       <ul
//         role="list"

//         className=" grid grid-cols-4  gap-4 gap-y-9 mb-44   px-24"
//       >
//         {classList.map((classItem, index) => (
//         <li
//           key={classItem.classname}
//           className="flex justify-between bg-white drop-shadow-md px-6 gap-x-6 py-8 rounded-3xl"
//         >
//           <div className="flex" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
//             <form className="">
//               <h1 className="text-2xl font-semibold text-slate-900">
//                 {classItem.classname}
//               </h1>
//               <div className="flex space-x-4  my-5 text-xs font-medium">
//                 <div className="flex space-x-4">
//                   <button
//                     className="h-10 px-6 font-semibold rounded-md bg-[#121312] text-white"
//                     type="submit"
//                   >
//                     {classItem.pdfUploaded ? "Uploaded" : "Upload"}
//                   </button>
//                   <button
//                     className="h-10 px-6 flex items-center gap-2 font-semibold rounded-md border border-slate-200 text-slate-900"
//                     type="button"
//                   >
//                     Sheet link
//                     <FaArrowRight />
//                   </button>
//                 </div>
//               </div>
//               <div className={`bg-red-500 text-xs justify-around w-full flex left-0 p-3 rounded-b-3xl absolute transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
//                 <button className="px-2 py-1 hover:bg-red-400 bg-opacity-35 rounded-full text-white">
//                   Delete
//                 </button>
//                 <button className="hover:bg-red-400 px-2 py-1 bg-opacity-35 rounded-full text-white">
//                   Re-upload
//                 </button>
//               </div>
//             </form>
//           </div>
//         </li>
//       ))}
//       </ul>
//       <FloatingButton />
//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;
{
  /* <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{person.role}</p>
            {person.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div> */
}

import React, { useState, useEffect } from "react";
import NavItem from "../components/Navitem";
import Appointments from "../components/Appointments";
import logoicon from "../assets/logofirst1.png";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import Metrics from "../components/Metrics";
import FloatingButton from "../components/Floatingbutton";
import { BsThreeDots } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa6";
import Settings from "../components/Settings";
const Dashboard = () => {
  const apiKey = process.env.SUPABASE_KEY;
  const apiUrl = process.env.SUPABASE_URL;
  const supabase = createClient(apiUrl, apiKey);
  const [totLAppointments, setTotalappoinments] = useState(0);
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    past: 0,
    upcoming: 0,
    whatsapp: 0,
  });
  const [appDatas, setAppDatas] = useState([]);
  const [navclicked, setNavclicked] = useState(false);

  useEffect(() => {
    const accessTokenObj = JSON.parse(
      localStorage.getItem("sb-lgzjqxhqfstjgehntfxi-auth-token")
    );
    if (accessTokenObj != null && accessTokenObj.user.aud === "authenticated") {
      getData(accessTokenObj.user.id);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
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
          await getData(payload.new.client_id);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  async function getData(id) {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("client_id", id);

    if (error) {
      console.error("Error fetching data:", error.message);
      return;
    }

    const whatsappAppointments = data.filter(
      (appointment) => appointment.book_medium === "whatsapp"
    ).length;
    const upcomingAppointments = data.filter(
      (appointment) => !appointment.visit_status
    ).length;
    const pastAppointments = data.filter(
      (appointment) => appointment.visit_status
    ).length;

    setAppDatas(data);
    setMetrics({
      past: pastAppointments,
      upcoming: upcomingAppointments,
      whatsapp: whatsappAppointments,
    });
    setTotalappoinments(data.length);
  }

  const handleButtonClick = () => {
    setNavclicked(!navclicked);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className={`absolute z-50 bg-white h-screen ${
          navclicked ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-500 ease-in-out lg:flex flex-col md:bg-gray-100/40 border-r w-64`}
      >
        <div className="flex flex-col h-screen justify-between">
          <div>
            <div className="flex items-center justify-between h-16 border-b px-5">
              <Link to="/Haajar">
                <img
                  src={logoicon}
                  className="w-36 animate-flipbottom transition-opacity duration-1000"
                  alt="logo"
                />
              </Link>
              <button
                onClick={handleButtonClick}
                className="bg-gray-200 p-2 md:hidden rounded-full"
              >
                <FaChevronLeft />
              </button>
            </div>
            <nav className="flex flex-col px-4 py-3 text-sm font-medium">
              <NavItem to="/Dashboard" label="Appointments" />
              <NavItem to="/Dashboard/Settings" label="Settings" />
            </nav>
          </div>
          <div className="px-4 py-3">
            <button
              onClick={signOut}
              className="w-full bg-rose-400 hover:bg-rose-500 text-white font-vilane_bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex  xs:justify-between md:justify-end items-center  py-4 bg-gray-100/40 border-b px-6">
          <button onClick={handleButtonClick} className="md:hidden">
            <BsThreeDots />
          </button>
          <h1 className="text-lg font-semibold">
            Total appointments: {totLAppointments}
          </h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Metrics metrics={metrics} />
                  <Appointments />
                </>
              }
            />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </main>
        <FloatingButton />
      </div>
    </div>
  );
};

export default Dashboard;
