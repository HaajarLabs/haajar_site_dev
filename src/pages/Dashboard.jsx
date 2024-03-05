import React,{useState} from "react";
import Dashnav from "../components/Dashnav";
import styles from "../style";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../components/Footer";
import FloatingButton from "../widgets/Floatingbutton";

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
  };
  const classList = [
    {
      classname: "EC6B",

      googleLink: "https://docs.google.com/document/d/your_document_id/edit",
      pdfUploaded: true,
    },
    {
      classname: "EC4B",

      googleLink: "https://docs.google.com/document/d/your_document_id/edit",
      pdfUploaded: false,
    },
    {
      classname: "ME4",

      googleLink: "https://docs.google.com/document/d/your_document_id/edit",
      pdfUploaded: true,
    },
    {
      classname: "EB4A",

      googleLink: "https://docs.google.com/document/d/your_document_id/edit",
      pdfUploaded: true,
    },
    {
      classname: "CS6B",

      googleLink: "https://docs.google.com/document/d/your_document_id/edit",
      pdfUploaded: false,
    },
  ];

  return (
    <div className="font-poppins w-full bg-primary  text-black overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div>
          <Dashnav />{" "}
        </div>
      </div>
      <h1 className="  text-6xl mt-20  py-12 px-14">Classes</h1>

      <ul
        role="list"
        
        className=" grid grid-cols-4  gap-4 gap-y-9 mb-44   px-24"
      >
        {classList.map((classItem, index) => (
        <li
          key={classItem.classname}
          className="flex justify-between bg-white drop-shadow-md px-6 gap-x-6 py-8 rounded-3xl"
        >
          <div className="flex" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
            <form className="">
              <h1 className="text-2xl font-semibold text-slate-900">
                {classItem.classname}
              </h1>
              <div className="flex space-x-4  my-5 text-xs font-medium">
                <div className="flex space-x-4">
                  <button
                    className="h-10 px-6 font-semibold rounded-md bg-[#121312] text-white"
                    type="submit"
                  >
                    {classItem.pdfUploaded ? "Uploaded" : "Upload"}
                  </button>
                  <button
                    className="h-10 px-6 flex items-center gap-2 font-semibold rounded-md border border-slate-200 text-slate-900"
                    type="button"
                  >
                    Sheet link
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              <div className={`bg-red-500 text-xs justify-around w-full flex left-0 p-3 rounded-b-3xl absolute transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                <button className="px-2 py-1 hover:bg-red-400 bg-opacity-35 rounded-full text-white">
                  Delete
                </button>
                <button className="hover:bg-red-400 px-2 py-1 bg-opacity-35 rounded-full text-white">
                  Re-upload
                </button>
              </div>
            </form>
          </div>
        </li>
      ))}
      </ul>
      <FloatingButton />
      <Footer />
    </div>
  );
};

export default Dashboard;
  {/* <div className="flex min-w-0 gap-x-4">
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
          </div> */}