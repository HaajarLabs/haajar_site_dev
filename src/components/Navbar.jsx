import React from 'react'
import logo1 from '../assets/logo1.png'

const Navbar = () => {
  return (
    <nav className=' w-full flex py-6 justify-between items-center '>
    <img src={logo1} alt="logo" />
    </nav>
  )
}

export default Navbar