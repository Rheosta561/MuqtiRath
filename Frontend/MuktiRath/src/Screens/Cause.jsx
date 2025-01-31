import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate";



function Cause() {
    const navigate = useNavigate();
const handleCauseClick = ()=>{
    navigate('/start');
    console.log('hello')

}
   
    
  return (
    <div className="min-h-screen w-screen relative ">
      <GoogleTranslate/>
      <img
        src="https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30471.jpg?t=st=1737577413~exp=1737581013~hmac=c15d1cbb2647918a33eba48294abd7642f806ceb4b5c29bbe54b8aa8db485a9d&w=1380"
        className="object-cover h-full w-full brightness-50 contrast-125 absolute"
        alt=""
      />
      <div className="text-white relative h-full w-full p-5 cause ">
        <h1 className="mx-auto text-center pt-5 text-6xl font-semibold bg-gradient-to-r from-zinc-50 via-pink-400 to-pink-900 text-transparent bg-clip-text">
          MuktiRath
        </h1>
        <h1 className="text-center text-gray-50">
        Reclaiming Choices, Restoring Dignity

        </h1>
        <p className="mx-4 text-xs text-center text-zinc-400 mt-8">
  Muktirath is a platform dedicated to empowering the sex workers of India's red-light areas by providing them with opportunities to rebuild their lives and reclaim their choices. Inspired by the sentiment "I wish I had a choice," Muktirath strives to offer freedom, dignity, and resources to those who have long been denied a voice. Through education, skill-building programs, and community support, we aim to create a future where everyone has the power to choose their path.
</p>
<div className="h-2/3 mt-8  w-full flex flex-col items-center ">
<img src="https://images.unsplash.com/photo-1520981269471-2935a5567932?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9vciUyMHdvbWFuJTIwSW5kaWFufGVufDB8fDB8fHww" alt="" className="h-2/3 w-2/3 object-cover" />
<div className="text-center text-xs mt-2 ">" Sex workers in India endure poverty, exploitation, societal stigma, and violence. Limited access to healthcare, education, and legal protection worsens their plight, leaving them marginalized and trapped in cycles of vulnerability and despair. "</div>
<button className="p-2 bg-pink-950 rounded-lg text-zinc-200 mt-4 transition-all hover:bg-pink-600" onClick={handleCauseClick}>Bring Change</button>
    
</div>
      </div>
    </div>
  );
}

export default Cause;
