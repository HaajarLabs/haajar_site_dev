import React from 'react'
import { Link } from 'react-router-dom'
import bgcard from "../assets/bg-card2.png";
import Footer from '../components/Footer';
import goutham from "../assets/goutham.png";
import alfred from "../assets/alfred.png";
import athul from "../assets/athul.png";
import james from "../assets/james.png";
import Social from '../components/Social';

const Aboutpage = () => {
  return (
    <div className='bg-primary   overflow-hidden  '>
      <div className='bg-[#F43F5E] sm:px-14 md:px-20 xs:px-8 py-14  relative '>
        <div className='absolute inset-0 bg-pattern opacity-30'></div>
     <div className='flex'>
     <div>
        <div className='relative flex-col font-vilane_bold  text-white'>
          <h1 className='text-6xl'>About</h1>
          <h1 className='text-8xl'>Haajar</h1>
        </div>
        <div className='relative mt-5  font-vilane_Extra_light text-white  tracking-wide text-lg'>
          <p>Welcome to Haajar, your go-to SaaS solution for effortless appointment management. We specialize in streamlining the scheduling process, making it seamless and stress-free. Whether you’re a small business owner, a busy professional, or running a large organization, Haajar is here to simplify your appointment booking, saving you time and enhancing your productivity. Join us and experience the future of appointment management today!</p>
        </div>
        </div>
        <img src={bgcard} alt="photo" width={600} className='z-50 hidden sm:block'/>
     </div>
       
        <div className='relative mt-12 flex justify-start xs:flex-col sm:flex-row xs:px-7 sm:px-0  items-center gap-4'>
          <div className="flex bg-white items-center justify-center sm:w-10 sm:h-56 xs:w-full ">
            <div className="sm:transform sm:-rotate-90">
              <p className="text-lg text-rose-600 font-semibold">Founder's</p>
            </div>
          </div>
          <div className="duration-300 hover:-rotate-12 -rotate-0 group border-rose-900 border-4 overflow-hidden rounded-2xl relative h-52 w-72 bg-rose-800 p-5 flex flex-col items-start gap-5">
            <div className="text-gray-50">
              <span className="font-bold text-3xl">Alfred Jimmy</span>
              <p className="text-xs">alfredjimmyaj007@gmail.com</p>
              <Social linkedin={"https://www.linkedin.com/in/alfred-jimmy-087a61225/"} whatsapp={"8921645661"} github={"https://github.com/alffy007"} top={"10"} />
            </div>
            <img src={alfred} className='group-hover:scale-125 duration-500 absolute -bottom-0.5 right-0 w- h-48 z-10 -my-' alt="alfred" />
          </div>
          <div className="duration-300 hover:-rotate-12 -rotate-0 group border-rose-900 border-4 overflow-hidden rounded-2xl relative h-52 w-72 bg-rose-800 p-5 flex flex-col items-start gap-4">
            <div className="text-gray-50">
              <span className="font-bold text-3xl">Goutham C <br />Arun</span>
              <p className="text-xs">gouthamchennamakkal@gmail.com</p>
              <Social linkedin={"https://www.linkedin.com/in/goutham-c-arun-057b2722b/"} whatsapp={"9400244505"} github={"https://github.com/GouthamCArun"} top={"3"} />
            </div>
           
           <img src={goutham} className='group-hover:scale-125 duration-500 absolute -bottom-0.5 right-0 w- h-48 z-10 -my-' alt="gautham" />
          </div>
          <div className="duration-300 hover:-rotate-12 -rotate-0 group border-rose-900 border-4 overflow-hidden rounded-2xl relative h-52 w-72 bg-rose-800 p-5 flex flex-col items-start gap-4">
            <div className="text-gray-50">
              <span className="font-bold text-3xl">Athul Babu</span>
              <p className="text-xs">athulbabu5088@gmail.com</p>
              <Social linkedin={"https://www.linkedin.com/in/athul-babu-9b55362a5/"} whatsapp={"9048020515"} github={"https://github.com/ATHULB04"} top={"10"} />
            </div>
            <img src={athul} className='group-hover:scale-125 duration-500 absolute -bottom-0.5 right-0 w- h-48 z-10 -my-' alt="athul" />
          </div>
          {/* <div className="duration-300 hover:-rotate-12 -rotate-0 group border-rose-900 border-4 overflow-hidden rounded-2xl relative h-52 w-72 bg-rose-800 p-5 flex flex-col items-start gap-5">
            <div className="text-gray-50">
              <span className="font-bold text-3xl">James <br/>Joseph K</span>
              <p className="text-xs">james.jk1903@gmail.com</p>
              <Social linkedin={"https://www.linkedin.com/in/james-joseph-k-83568122b/"} whatsapp={"8714441495"} github={"https://github.com/Jamie-19"} top={"10"} />
            </div>
            <img src={james} className='group-hover:scale-125 duration-500 absolute -bottom-0.5 right-0 w- h-48 z-10 -my-' alt="james" />
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Aboutpage
