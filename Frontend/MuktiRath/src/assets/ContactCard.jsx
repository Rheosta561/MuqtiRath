import React from 'react'

function ContactCard(props) {
  return (
    <div className='flex flex-col border h-44 p-2 w-full rounded-lg'>
        <div className='flex gap-2 h-full w-full'>
            <div className='w-36 h-36 bg-zinc-300 border rounded-full'>
                <img src={props.image} className='h-full w-full rounded-full' alt="" />
            </div>
            <div className='h-full w-2/3 border rounded-lg flex flex-col p-2'>
            <div className='w-full h-16 border rounded-lg flex p-2 flex-col'>
<h1 className='text-xl font-semibold text-zinc-700'>{props.name}</h1>
<h2 className='text-sm '>{props.designation}</h2>
            </div>
            <a href={`mailto:${props.email}`} className='text-sm mt-2 ml-2 text-zinc-600'>{props.email}</a>
            </div>
        </div>

    </div>
  )
}

export default ContactCard