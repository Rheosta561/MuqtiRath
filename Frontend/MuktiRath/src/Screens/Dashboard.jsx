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
            <CourseCard title="Tailoring & Fashion Design" description="Learn stitching, pattern making, and garment creation to start your tailoring business or work in fashion." image="https://media.gettyimages.com/id/1279988363/photo/female-textile-workers-standing-together-in-solidarity-at-factory.jpg?s=612x612&w=0&k=20&c=owiqqVaRxO6xaQVASeS7dCNXMLqI3_CaCSojMApMOVY=" />
            <CourseCard 
  title="Beauty & Wellness" 
  description="Master makeup, hairstyling, skincare, and spa techniques for salon jobs or freelance work." 
  image="https://media.gettyimages.com/id/1357162123/photo/organic-bio-cosmetics-healthy-concept-with-petri-dishes-with-natural-plants-and-beauty.jpg?s=612x612&w=0&k=20&c=0zXNKNj7Q-DEXasZiR-dWY9W0k05ocINGOIMTKCRjgo=" 
/>

<CourseCard 
  title="Digital Marketing Basics" 
  description="Learn social media, SEO, and content creation to secure remote or freelance marketing jobs." 
  image="https://media.gettyimages.com/id/1214772075/vector/digital-networking-cloud-computing.jpg?s=612x612&w=0&k=20&c=6AFWXqgwDg4A-o1RIvgu7Oa9u38O0lep_ZGoubHqzZc=" 
/>

<CourseCard 
  title="Culinary Arts & Baking" 
  description="Develop cooking and baking skills to work in restaurants or start a food business." 
  image="https://media.gettyimages.com/id/1307977267/vector/planet-earth.jpg?s=612x612&w=0&k=20&c=wZlsVHP7opC1hhnm3ZgQLaFSpCZrGPN_hCJ5xsBc8tg=" 
/>

<CourseCard 
  title="Jewelry Making & Crafts" 
  description="Create handmade jewelry and crafts to sell online or at local markets." 
  image="https://media.gettyimages.com/id/1403250565/photo/making-jewelry-with-beads.jpg?s=612x612&w=0&k=20&c=vx-fTcjyUVZu-FWmgrsuHdX5F44G0gcNnamNeoz2pr4=" 
/>

<CourseCard 
  title="Hygiene & Sanitation Awareness" 
  description="Learn essential hygiene practices to promote health and prevent diseases in your community." 
  image="https://media.gettyimages.com/id/1225772238/photo/male-healthcare-worker-washing-hands.jpg?s=612x612&w=0&k=20&c=GLKMpy2m5nxiEyIZO85I8UYetQMqAR72W3NrHODKnlU=" 
/>

<CourseCard 
  title="Health Camp Facilitation" 
  description="Learn to organize free health camps, including cancer screenings and wellness initiatives." 
  image="https://media.gettyimages.com/id/1473559425/photo/female-medical-practitioner-reassuring-a-patient.jpg?s=612x612&w=0&k=20&c=kGbm-TE5qdppyyiteyip7_CzKLktyPrRuWD4Zz2EcqE=" 
/>

<CourseCard 
  title="First Aid & Emergency Response" 
  description="Train in basic first aid and emergency care to assist in medical situations." 
  image="https://media.gettyimages.com/id/1437515877/vector/ambulance-concept-healthcare-in-cartoon-style-doctors-hand-holding-a-portable-first-aid-kit.jpg?s=612x612&w=0&k=20&c=PDkxQKuw5uHk1bmIbZINYlESURwYr18_6YzxCadJAaw=" 
/>

<CourseCard 
  title="Free Cancer Awareness & Screening" 
  description="Participate in free cancer screening programs to raise awareness and ensure early detection." 
  image="https://media.gettyimages.com/id/183579195/photo/pink-breast-cancer-awareness-ribbon-with-copy-space.jpg?s=612x612&w=0&k=20&c=hyXFkEUAU_ws6R5LUvJ_gwxvbnmNGfF-8i-y0wtHLlM=" 
/>




          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard