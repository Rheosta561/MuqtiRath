import React from 'react';

function ProfileCard(props) {
  return (
    <div className="min-h-72 max-h-fit w-full rounded-lg flex flex-col bg-gray-50 border p-2 gap-2">
      <div className="flex h-1/4 rounded-lg p-1 px-2 gap-3">
        <div className="h-14 w-14 border rounded-full bg-zinc-950">
          <img
            src="https://img.freepik.com/free-vector/girl-shy-character_1450-155.jpg?semt=ais_hybrid"
            alt=""
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="h-full flex-col mt-2 flex">
          <p className="text-xl font-semibold">{props.name}</p>
          <p className="text-xs text-pink-950">{props.gender}</p>
        </div>
      </div>

      <div className="border mx-2 h-fit text-sm bg-white p-2 rounded-lg">
        {props.story}
      </div>
      
      <a href={`tel:${props.phoneNumber}`}>
        <button className="w-fit mx-2 p-3 bg-zinc-950 text-white rounded-full">
          Connect
        </button>
      </a>
    </div>
  );
}

export default ProfileCard;
