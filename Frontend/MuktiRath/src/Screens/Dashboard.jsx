import React from 'react'
import Navbar from '../assets/Navbar'
import CourseCard from '../assets/CourseCard'
import { useParams } from 'react-router-dom'

function Dashboard() {
  const {userId} = useParams();
  return (
    <div>
      <Navbar Id={userId}/>
      <br /><br />
      
      <div className=' h-fit w-screen p-2 mt-4'>
        <div className='border h-full rounded border-zinc-400 p-2 bg-[url(https://img.freepik.com/free-vector/hand-drawn-spring-wallpaper_23-2148829855.jpg?t=st=1737539091~exp=1737542691~hmac=cae9d7dfcef744058a2b3a87ddbdec406db9f4ad5e9a51469e5f603d621c676d&w=2000)] bg-center bg-cover '>
          <h1 className='text-5xl font-semibold'>Recommended Skills </h1>
          
          <p className='text-sm text-zinc-700'>Specially Crafted Skills for You </p>
          <p className='text-sm text-zinc-600'>Curated with love </p>
          <hr className='border mt-2 border-zinc-700 rounded-lg' />
          <div className='h-fit w-full  mt-2  grid grid-cols-1 md:grid-cols-3 gap-4'>
            <CourseCard/>
            <CourseCard/>
            <CourseCard/>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard