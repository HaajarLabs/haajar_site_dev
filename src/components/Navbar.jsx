import React, { useState, useEffect } from 'react';
import logo1 from '../assets/logofirst.png'
import { Link } from "react-router-dom";
import logo2 from '../assets/logosecond.png'

const Navbar = () => {

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prevState => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <nav className=' font-poppins w-full flex py-6 justify-between items-center '>
    <img   src={isFlipped ? logo1 : logo2} className="w-44 ease-linear transition-opacity duration-1000" alt="logo" />
    <div className=' cursor-pointer bg-gray-300  hover:bg-[#25D366] ease-in duration-300 px-4 py-2 rounded-3xl hover:text-white text-gray-00 font-semibold'>
       <Link to='/Login'>Login</Link>
    </div>
    </nav>
  )
}

export default Navbar
