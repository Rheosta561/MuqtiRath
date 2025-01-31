import React from 'react'
import logo from "./logo.png"
import { useNavigate } from 'react-router-dom'
import GoogleTranslate from './GoogleTranslate';


function Home() {
  const navigate = useNavigate();
const handleStartedClick = ()=>{
  navigate('/cause');

}
const handleNgoClick =() =>{
  navigate('/organisations');
}
 
  return (
    <>
    <GoogleTranslate/>
       <div className=' h-screen w-screen flex flex-col p-4 items-center justify-start'>
        <div className='h-1/2 w-1/2 flex items-center justify-center'>
            <img src={logo} alt="" className=' scale-150 mt-36   z-0 md:scale-100  md:mt-0 object-cover ' />
            
        </div>
        {/* <div className='text-7xl z-30 md:z-0 -mt-14  font-semibold '>
            Hi there
        </div> */}
        <div className='-mt-8 z-30'>Protecting the Forced Queens </div>
        <div className='z-30'>Empowering Lives, Restoring Dignity. </div>
        
        <button onClick={handleStartedClick} className=' rounded-lg p-2 z-30 bg-zinc-800 text-white hover:bg-zinc-900 text-xs p-3 hover:text-white transition-all mt-4'
        >
            Get Started
        </button>
        <div className='mt-4 text-md z-50 '>For Ngo's Or Organisations | <button className='text-blue-900' onClick={handleNgoClick}>Click here</button></div>
        
    </div>
    </>
 
  )
}

export default Home