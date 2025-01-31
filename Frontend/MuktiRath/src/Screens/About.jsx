import React from "react";

function About() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center ">Mukti<span className="text-pink-900">Rath</span></h1>
      <p className="mt-4 text-sm text-gray-700">
        Many women involved in prostitution express a strong desire to leave the industry and pursue education to build better lives. A study by Prostitution Research & Education found that 89% of individuals in prostitution across nine countries wished to exit but lacked sustainable job opportunities.
      </p>
      
      <h2 className="text-3xl font-semibold mt-6 text-zinc-900">Challenges Faced</h2>
      <ul className="list-disc list-inside mt-2 text-gray-700 text-xs">
        <li>Criminalization and discrimination deter women from seeking medical care.</li>
        <li>Women in brothels, illiterate women in villages, and transgender individuals face stigma, lack of opportunities, and forced circumstances.</li>
        <li>Trapped in cycles of trauma, poverty, and societal neglect.</li>
      </ul>
      
      <h2 className="text-3xl font-semibold mt-6 text-zinc-900">Our Initiatives</h2>
      <p className="mt-2 text-sm text-gray-700">
        MuktiRath is committed to empowering marginalized individuals through various initiatives:
      </p>
      <ul className="list-disc list-inside mt-2 text-gray-700 text-xs">
        <li><strong className="text-sm">Providing Digital Literacy:</strong> Teaching basic literacy, numeracy, smartphone use, online safety, and essential digital tools.</li>
        <li><strong className="text-sm">Partnering with NGOs:</strong> A portal for NGOs to explore anonymous stories, assess skills, and provide employment opportunities.</li>
        <li><strong className="text-sm">Anonymous Job Opportunities:</strong> Tailoring, farming, recycling, online selling, data entry, and more for sustainable income.</li>
        <li><strong className="text-sm">Imparting Financial Awareness:</strong> Educating on budgeting, saving, banking, and digital wallet use.</li>
      </ul>
      
      <h2 className="text-3xl font-semibold mt-6 text-zinc-900">Why MuktiRath?</h2>
      <p className="mt-2 text-sm text-gray-700">
        Although gender equity is gaining attention, women in prostitution and transgender individuals remain neglected despite their historical significance in Indian society. MuktiRath aims to address their struggles and rights for true empowerment.
      </p>
      
      <h2 className="text-3xl font-semibold mt-6 text-zinc-900">Curated Skills for Jobs</h2>
      <p className="mt-2 text-sm text-gray-700">
        Our carefully curated recommendation list helps users gain proficiency in various skills, such as tailoring and budgeting, making employment more accessible.
      </p>
      
      <h2 className="text-3xl font-semibold mt-6 text-zinc-900">Personal Guide - Dhruvi</h2>
      <p className="mt-2 text-sm text-gray-700">
        Our AI-powered virtual assistant, available in several languages, ensures inclusivity and assists users on their journey to empowerment.
      </p>
      
      <h2 className="text-3xl font-semibold mt-6 text-zinc-900">Tech Stack</h2>
      <p className="mt-2 text-sm text-gray-700">
        MuktiRath is built on a modern tech stack featuring MERN (MongoDB, Express, React, Node.js), Langchain, and Docker to ensure a seamless and scalable experience.
      </p>

      <p className="bottom-1 mt-4 text-sm text-zinc-600 text-center"> Developed and Tested By Team Unchained</p>
    </div>
  );
}

export default About;
