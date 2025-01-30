import React from 'react'
import OrgNavBar from './OrgNavBar'
import ProfileCard from './ProfileCard'

function OrgDashBoard() {
  return (
    <div>
        <OrgNavBar/>
        <div className='grid gap-3 p-2 grid-cols-1 md:grid-cols-3'>
            <ProfileCard name='Rani' gender='women' story=" Rani, a sex worker in Mumbai, wakes before dawn in a cramped room, surrounded by the noise of the city. Every day, she faces abuse, rejection, and the harsh judgment of society. The work is grueling, often exploitative, and the threats of violence are constant. She dreams of a life beyond the streets—one where she isn't defined by her past or the stigma of her work. Yet, the cycle of poverty, lack of education, and fear keeps her trapped in a system that offers no escape. Despite the hardships, Asha holds onto hope, determined to build a future for herself and her daughter, beyond the shadow of shame."/>
            <ProfileCard name='Asha' gender='women' story ="In the narrow lanes of Mumbai, Asha, a sex worker, battles stigma, exploitation, and isolation. Despite facing abuse and societal rejection, she dreams of a life beyond the streets, struggling for dignity, safety, and a chance at a new beginning."/>
            <ProfileCard name='Aisha' gender='Trans' story ="Aisha’s journey began in silence, a whisper of truth hidden beneath layers of expectation. Born in a small village, she was taught to be something she wasn’t. As a trans woman, she faced ridicule, violence, and alienation at every turn. Her family couldn’t understand, and society’s gaze was unkind. Yet, she found strength in her identity, no longer hiding in the shadows. In the crowded streets of Kolkata, Aisha began to rebuild her life, one step at a time. Though the world often rejected her, she learned to accept herself. With courage, she faced each challenge, determined to be seen—not as the world wanted, but as who she truly was."/>

        </div>
    </div>
  )
}

export default OrgDashBoard