import React from 'react'
import { useNavigate } from 'react-router-dom'

function GetStarted() {
    const navigate = useNavigate();
    const handleSignUpClick = ()=>{
        navigate('/organisations/signup');
    }
    const handleLoginClick = ()=>{
        navigate('/organisations/login');
    }
  return (
    <div className='h-screen w-screen flex items-center justify-center p-1'>
        <div className='h-2/3 md:h-fit w-full border flex flex-col md:flex-row gap-2 p-2 rounded-lg bg-gray-200 items-center justify-center md:w-fit'>
        <div className='w-full md:w-80 h-64 flex flex-col rounded-lg   relative overflow-hidden shadow-sm border-zinc-800'>
            <img src="https://images.unsplash.com/photo-1613399421095-41f5c68e9f8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmdvfGVufDB8fDB8fHww" className='h-full w-full object-cover rounded-lg brightness-50 contrast-125 absolute' alt="" />
            <div className='w-full h-full flex flex-col gap-1 p-4 text-white justify-end  rounded relative'>
                <h1 className='text-lg  underline text-zinc-100 ml-2'>New User ?</h1>
                <button className='w-fit bg-pink-950 p-3 text-sm rounded-full' onClick={handleSignUpClick}>Register Now</button>
                <div className='text-xs ml-2 text-zinc-200'>Take initiative to rescue forced queens—women trapped in brothels and red-light areas in India. Support transgenders, the neglected communities, ensuring dignity, rights, and a better future.</div>
            </div>
        </div>
        <div className='w-full md:w-80 h-64 flex flex-col rounded-lg   relative overflow-hidden shadow-sm'>
            <img src="https://images.unsplash.com/photo-1646836391913-859cdecf098b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5nb3xlbnwwfHwwfHx8MA%3D%3D" className='h-full w-full object-cover rounded-lg brightness-50 contrast-125 absolute' alt="" />
            <div className='w-full h-full flex flex-col gap-1 p-4 text-white justify-end rounded relative'>
                <h1 className='text-lg  underline text-zinc-100 ml-2'>Already A User ?</h1>
                <button className='w-fit bg-pink-950 p-3 text-sm rounded-full' onClick={handleLoginClick}>Log In Now</button>
                <div className='text-xs ml-2 text-zinc-200'>Join us in taking a stand for the forced queens—women in brothels and red-light areas in India. Empower transgenders and neglected communities. 
                <p>Sign in to support change!</p></div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default GetStarted