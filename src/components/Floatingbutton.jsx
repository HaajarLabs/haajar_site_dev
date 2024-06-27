// FloatingButton.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import Modal from "./Modal"; // Import the Modal component

const FloatingButton = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
  //   <>
  //   <Link
  //     onClick={toggleModal}
  //     className="fixed bottom-6 right-6 border-2 border-white bg-green-500 hover:bg-green-600 hover:scale-125 text-white text-3xl p-4 rounded-full shadow-lg flex items-center justify-center transition duration-300 ease-in-out z-10  group"
  //   >
  //     <h5 className="text-sm font-semibold hidden group-hover:block font-poppins absolute bottom-full mb-2 transition-opacity duration-300 ease-in-out z-20">Add an appointment</h5>
  //     <BsPlus />
  //   </Link>
  //   {showModal && <Modal onClose={toggleModal} />} Render modal if showModal is true
  // </>
  <>
 
 
 <button
  type="button"
  onClick={toggleModal}
  class="bg-white text-center w-50 right-32 hover:-translate-x-20 rounded transition-transform duration-500 ease-in-out h-14 fixed font-sans text-black text-xl  bottom-2  font-semibold group"
>
  <div
  
    class="bg-green-400 rounded h-12 w-60 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
  >
   <BsPlus size={30} />
  </div>
  <p class="group-hover:translate-x-48 translate-x-5 ease-in-out text-base transition-transform duration-500">Add appointment</p>
</button>

{showModal && <Modal onClose={toggleModal} />} 
  </>
  
  );
};

export default FloatingButton;
