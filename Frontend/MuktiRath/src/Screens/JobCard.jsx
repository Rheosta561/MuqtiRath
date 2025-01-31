import React from 'react'

function JobCard(props) {
  return (
    <div className='h-fit w-full bg-white rounded-lg border flex flex-col justify-between p-2'>
        <div>
        <p className='text-lg font-semibold text-zinc-800'>{props.job}</p>
        <p>Organization | <span className='font-semibold text-zinc-600'>{props.organizer}</span>
        </p>
        </div>
        <a href={`tel:${props.phone}`}>
        <button className='w-fit bg-zinc-900 p-3 rounded-full text-white'>Apply Now</button>
        </a>
        
        
    </div>
  )
}

export default JobCard