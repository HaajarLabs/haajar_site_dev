import React from 'react'
import logo1 from '../assets/logo1.png'
import { Button } from '@mui/material'

const Navbar = () => {
  return (
    <nav className=' font-poppins w-full flex py-6 justify-between items-center '>
    <img src={logo1} width={124} height={32} alt="logo" />
    <div className=' cursor-pointer bg-gray-300  hover:bg-green-500 ease-in duration-300 px-4 py-2 rounded-3xl hover:text-white text-gray-00 font-semibold'>
        Login
    </div>
    </nav>
  )
}

export default Navbar