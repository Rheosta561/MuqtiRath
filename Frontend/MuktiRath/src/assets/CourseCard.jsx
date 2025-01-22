import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';

function CourseCard() {
  return (
    <div className="h-72 md:w-auto border-zinc-400 flex flex-col rounded-lg  bg-white shadow-md">
      {/* Card Image Section */}
      <div className="h-60 rounded-lg w-full border bg-zinc-300 relative">
        <img
          src="https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png"
          alt="Course"
          className="h-full w-full rounded-lg object-cover brightness-50 contrast-100 absolute"
        />
        <div className="text-white relative p-2">
          <h1 className="text-5xl">Music Production</h1>
          <p className="text-xs w-1/2 md:w-full text-zinc-200">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est rerum explicabo similique velit iusto quos inventore distinctio nemo in expedita.
          </p>
        </div>
      </div>

      {/* Card Footer Section */}
      <div className="flex p-2 text-lg justify-between items-center">
        <div>
          Music Production | <span className='text-zinc-600'>Free</span>  | <span className="text-blue-700 font-semibold  cursor-pointer">Link</span>
        </div>
        <button className="flex items-center gap-2 px-2 py-2  text-zinc-950 rounded-lg scale-150 hover:text-blue-700 transition-all">
            
          <AiOutlineMessage size={20} />
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
