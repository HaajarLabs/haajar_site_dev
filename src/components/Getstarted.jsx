import React from 'react'
import { WhatsApp } from '@mui/icons-material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const Getstarted = () => {
  return (
    <div className='flex sm:w-44 w-40 cursor-pointer  ease-in duration-300 rounded-3xl hover:scale-105 hover:w-48 hover:bg-[#25D366] justify-between bg-black text-white sm:px-4 sm:py-3 px-2 py-2'>
        <WhatsApp fontSize='medium'/>{" "}
        Getstarted{" "}
        <ArrowOutwardIcon fontSize='medium'/>
        </div>
  )
}

export default Getstarted