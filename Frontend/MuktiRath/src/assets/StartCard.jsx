import React from 'react'
import { useNavigate } from 'react-router-dom'

function StartCard(props) {
    // const navigate = useNavigate();
    // const handleClick = ()=>{
    //     navigate(`/${props.src}`);

    // }
  return (
    <div className='w-full h-60 relative'>
        <img src={props.img} className='h-full w-full rounded-lg absolute brightness-80 object-cover' alt="" />
         <div className='h-60 w-full border border-zinc-800 flex flex-col  justify-between p-4 rounded-lg absolute'>
        <div>
        <div className='text-2xl font-semibold'>{props.title}</div>
        <div className='text-sm'>{props.desc1} </div>
        <div className='text-xs'>{props.desc2}</div>
        </div>
        
        <button onClick={props.func} className='border border-zinc-900 p-2 rounded-xl w-1/2 mx-auto bg-zinc-50'>{props.button}</button>
    </div>
    </div>
   
  )
}

export default StartCard