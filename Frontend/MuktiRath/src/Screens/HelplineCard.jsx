import React from 'react'

function HelplineCard(props) {
  return (
    <div className='h-fit p-2 w-full flex flex-col bg-white rounded-lg border '>
        <div>
            <p className='text-lg font-semibold'>{props.name}</p>
            <p>{props.desc}</p>
        </div>

        <a href={`tel:${props.phone}`} className='font-semibold text-zinc-800'>Call Now</a>
    </div>
  )
}

export default HelplineCard