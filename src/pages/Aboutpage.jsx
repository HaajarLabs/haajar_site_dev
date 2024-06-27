import React from 'react'
import { Link } from 'react-router-dom'
import bgcard from "../assets/bg-card2.png";
import Footer from '../components/Footer';
import goutham from "../assets/goutham.png";
import alfred from "../assets/alfred.png";
import athul from "../assets/athul.png";

const Aboutpage = () => {
  return (
    <div className='bg-primary    '>
      <div className='bg-[#F43F5E] px-20 py-14 h-screen relative '>
        <div className='absolute inset-0 bg-pattern opacity-30'></div>
     <div className='flex'>
     <div>
        <div className='relative flex-col font-vilane_bold  text-white'>
          <h1 className='text-6xl'>About</h1>
          <h1 className='text-8xl'>Haajar.</h1>
        </div>
        <div className='relative mt-5  font-vilane_Extra_light text-white  tracking-wide text-lg'>
          <p>Welcome to Haajar, your go-to SaaS solution for effortless appointment management. We specialize in streamlining the scheduling process, making it seamless and stress-free. Whether you’re a small business owner, a busy professional, or running a large organization, Haajar is here to simplify your appointment booking, saving you time and enhancing your productivity. Join us and experience the future of appointment management today!</p>
        </div>
        </div>
        <img src={bgcard} alt="photo" width={600} className='z-50'/>
     </div>
       
        <div className='relative mt-12 flex justify-start items-center gap-4'>
          <div className="flex bg-white items-center justify-center w-10 h-56">
            <div className="transform -rotate-90">
              <p className="text-lg text-rose-600 font-semibold">Founder's</p>
            </div>
          </div>
          <div className="duration-300 hover:-rotate-12 -rotate-0 group border-rose-900 border-4 overflow-hidden rounded-2xl relative h-52 w-72 bg-rose-800 p-5 flex flex-col items-start gap-4">
            <div className="text-gray-50">
              <span className="font-bold text-3xl">Alfred Jimmy</span>
              <p className="text-xs">alfredjimmyaj007@gmail.com</p>
            </div>
            <img src={alfred} className='group-hover:scale-125 duration-500 absolute -bottom-0.5 right-0 w- h-48 z-10 -my-' alt="alfred" />
          </div>
          <div className="duration-300 hover:-rotate-12 -rotate-0 group border-rose-900 border-4 overflow-hidden rounded-2xl relative h-52 w-72 bg-rose-800 p-5 flex flex-col items-start gap-4">
            <div className="text-gray-50">
              <span className="font-bold text-3xl">Goutham C <br />Arun</span>
              <p className="text-xs">gouthamchennamakkal@gmail.com</p>
            </div>
           
           <img src={goutham} className='group-hover:scale-125 duration-500 absolute -bottom-0.5 right-0 w- h-48 z-10 -my-' alt="gautham" />
          </div>
          <div className="duration-300 hover:-rotate-12 -rotate-0 group border-rose-900 border-4 overflow-hidden rounded-2xl relative h-52 w-72 bg-rose-800 p-5 flex flex-col items-start gap-4">
            <div className="text-gray-50">
              <span className="font-bold text-3xl">Athul Babu</span>
              <p className="text-xs">athulbabu5088@gmail.com</p>
            </div>
            <img src={athul} className='group-hover:scale-125 duration-500 absolute -bottom-0.5 right-0 w- h-48 z-10 -my-' alt="athul" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Aboutpage
