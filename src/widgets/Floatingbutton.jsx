import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const FloatingButton = () => {
  return (
    <div className="fixed bottom-4 right-4 z-30">
      <button className="bg-[#25D366]  hover:bg-green-500 text-white font-bold py-3 items-center px-4 flex gap-2 rounded-full">
       <FaWhatsapp size={25} /> Whatsapp<ArrowOutwardIcon/> 

      </button>
    </div>
  );
};

export default FloatingButton;
