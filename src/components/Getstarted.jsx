import React from 'react'
import { WhatsApp } from '@mui/icons-material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const Getstarted = () => {
  return (
    <div className='flex w-44 cursor-pointer  ease-in duration-300 rounded-3xl hover:scale-105 hover:w-48 hover:bg-green-500 justify-between bg-black text-white px-4 py-3'>
        <WhatsApp/>{" "}
        Getstarted{" "}
        <ArrowOutwardIcon/>
        </div>
  )
}

export default Getstarted