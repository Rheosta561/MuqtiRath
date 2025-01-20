import React from 'react'
import logo from "./logo.png"

function Home() {
  return (
    <div className=' h-screen w-screen flex flex-col p-4 items-center justify-start'>
        <div className='h-1/2 w-1/2 flex items-center justify-center'>
            <img src={logo} alt="" className=' scale-150 mt-36   z-0 md:scale-100  md:mt-0 object-cover ' />
            
        </div>
        <div className='text-7xl z-30 md:z-0 -mt-14  font-semibold '>
            Hi there
        </div>
        <div className='mt-5 z-30'>Protecting the Forced Queens </div>
        <div className='z-30'>Empowering Lives, Restoring Dignity. </div>
        <div className='font-semibold text-pink-900 mt-4 z-30'>MUKTIRATH</div>
        <button className=' rounded-lg p-2 z-30 bg-zinc-200 mt-4'>
            Get Started
        </button>
        
    </div>
  )
}

export default Home