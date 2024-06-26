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
    <>
      <Link
        // to="/add-appointment"
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white text-3xl p-4 rounded-full shadow-lg flex items-center justify-center transition duration-300 ease-in-out z-10"
      >
        <BsPlus />
      </Link>
      {showModal && <Modal onClose={toggleModal}  />} {/* Render modal if showModal is true */}
    </>
  );
};

export default FloatingButton;
