import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';

function CourseCard(props) {
  return (
    <div className="h-fit md:w-auto p-1 border-zinc-700 border flex flex-col rounded-lg  bg-white shadow-md">
      {/* Card Image Section */}
      <div className="h-60 rounded-lg w-full border bg-zinc-300 shadow-sm  relative">
        <img
          src={props.image}
          alt="Course"
          className="h-full w-full m rounded-lg object-cover  brightness-50 contrast-100 absolute"
        />
        <div className="text-white relative p-2 flex flex-col h-full justify-between ">
          <div className="text-3xl font-semibold">{props.title}</div>
          <p className="text-xs w- md:w-full text-zinc-200">
            {props.description}
          </p>
        </div>
      </div>

      {/* Card Footer Section */}
      <div className="flex p-2 text-lg justify-between items-center">
        <div>
          {props.title} | <span className='text-zinc-600'>Free</span>  | <span className="text-blue-700 font-semibold  cursor-pointer"><a href={props.link}>Link</a></span>
        </div>
        <button className="flex items-center gap-2 px-2 py-2  text-zinc-950 rounded-lg scale-150 hover:text-blue-700 transition-all">
            
          <AiOutlineMessage size={20} />
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
