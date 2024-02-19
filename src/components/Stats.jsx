import React from 'react'



const Stats = () => {
  return (
<div className='flex justify-between px-44 py-14'>
<div className='hover:scale-125 cursor-pointer ease-in-out duration-300 hover:text-shadow'>
<h1 className=' font-semibold text-2xl '>Teachers{" "}</h1>
<h1 className=' text-center text-2xl text-slate-600  font-semibold'>0+</h1>
</div>
<div className='hover:scale-125 cursor-pointer ease-in-out duration-300 hover:text-shadow'>
<h1 className=' font-semibold text-2xl'>Students{" "}</h1>
<h1 className=' text-center text-2xl text-slate-600  font-semibold'>0+</h1>
</div>
<div className='hover:scale-125 cursor-pointer ease-in-out duration-300 hover:text-shadow'>
<h1 className=' font-semibold text-2xl'>Colleges{" "}</h1>
<h1 className=' text-center text-2xl text-slate-600  font-semibold'>0+</h1>
</div>
</div>
  )
}

export default Stats