import React from 'react'
import logo from './logo.png'
import StartCard from '../assets/StartCard'
import { useNavigate } from 'react-router-dom'

function Start() {
    const navigate = useNavigate();
    const handleSignUp = ()=>{
        navigate('/signup');

    }
    const handleLogIn = ()=>{
        navigate('/login');

    }
  return (
    <div className='flex justify-center items-center h-screen w-screen '>
        <div className='h-fit gap-4  flex flex-col md:flex-row border border-zinc-800 w-5/6 md:w-2/3 rounded-lg p-4 justify-evenly md:items-center md:gap-4 md:h-fit bg-violet-50'>
        <StartCard title="New to MuktiRath ?" desc1="Register now with us" desc2="Empowering the forced Queens" img="https://cdn.pixabay.com/photo/2022/09/20/02/48/mountains-7466858_1280.png" src="/register" func={handleSignUp} button="Register"/>
        <StartCard title ="Already A User ?" desc1="Log in Now to Your Accont" desc2="Empowering the forced Queens" img="https://img.freepik.com/free-vector/natural-landscape_23-2147506331.jpg?t=st=1737444345~exp=1737447945~hmac=50a8f4a3c05a16d73417d012d93b6b34e6ae57527aae5ad2e7ab9e23456f30dd&w=1380" src="/login" func={handleLogIn} button = "Log In"/>
        </div>
        
    </div>
  )
}

export default Start