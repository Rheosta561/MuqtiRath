import React from 'react'
import { useNavigate } from 'react-router-dom'

function OrgStart() {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/organisations/getStarted');
        
    }
  return (
    <div className='flex flex-col items-center min-h-screen justify-center'>
        <h1 className='text-7xl font-semibold'>Mukti<span className='text-pink-900'>Rath</span></h1>
        <h4 className='font-semibold text-zinc-800 underline '>For Organisations</h4>
        <div className='mx-20 text-center text-xs mt-2'>Help us bring the change , to make the lives of those who had no choice better
             </div>
             <h4 className='mt-2 text-sm font-semibold text-green-950'>#Protecting the Forced Queens</h4>

             <button className='mt-4 bg-zinc-900 hover:bg-zinc-950 p-3 text-xs rounded-full text-white ' onClick={handleClick}>Get Started</button>
    </div>
  )
}

export default OrgStart