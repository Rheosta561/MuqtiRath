import React from 'react'
import ContactCard from '../assets/ContactCard'

function Contact() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center p-4'>
      <h1 className='text-center text-5xl mt-4  font-semibold'>Mukti<span className='text-pink-900'>Rath</span></h1>
      <div className='border w-full rounded-lg grid grid-cols-1 p-3 md:grid-cols-2 gap-2'>
        <ContactCard name="Anubhav Mishra " designation="Web Developer" email="manubhav731@gmail.com" image="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid"/>
        <ContactCard name="Akshat Jha " designation="ML Developer" email="codedakshat@gmail.com" image="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid"/>
        <ContactCard name="Charu Misra " designation="Research And Development " email="charum.16nov@gmail.com" image="https://img.freepik.com/free-vector/young-girl-smiling-happy-character_24877-83363.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid"/>
        <ContactCard name="Harshita Sharma " designation="UI UX " email="harshitasharma@gmail.com" image="https://img.freepik.com/free-vector/young-girl-smiling-happy-character_24877-83363.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid"/>
        
        
      </div>
      
    </div>
  )
}

export default Contact