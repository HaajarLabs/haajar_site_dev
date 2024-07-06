import React from 'react';
import mockup from '../assets/Group 13.svg';
const Features = () => {
    return (
        <div className='px-10    py-16 flex flex-col  items-center w-full ' >
            <h1 className='pt-3 text-4xl  font-vilane_Semi_bold ' >Introducing</h1>
            <p className='text-[400px] tracking-widest font-vilane_bold -mt-36 text-[#F43F5E] drop-shadow-neumorphism' >Haajar</p>
            <div className='h-60'></div>
       <img className=' absolute  mt-60   w-4/6' src={mockup} alt="mockup" />
        </div>
    );
};

export default Features;