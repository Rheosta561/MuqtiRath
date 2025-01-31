import React, { useState } from 'react';
import logo from './logo.png';
import reglogo from './register.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleTranslate from './GoogleTranslate';

function Register() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState(null); // Store phone as an integer
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [healthProblem, setHealthProblem] = useState('');
  const [education, setEducation] = useState('');
  const [shortStory, setShortStory] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const genderOptions = ['Women', 'Trans'];
  const healthOptions = ['None', 'Diabetes', 'Asthma', 'Heart Disease', 'Hypertension', 'Other'];
  const educationOptions = ['None', '5th', '10th', '12th', 'Graduation', 'Post-Graduation'];

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    setPhone(value ? parseInt(value, 10) : null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    const formData = {
      username,
      phone, 
      age,
      gender,
      health: healthProblem,
      education,
      story: shortStory,
    };

    try {
      const response = await axios.post("https://muqtirath-wiegnite.onrender.com/createUser", formData);
      console.log(response);
      const userId = response.data.newUser._id;
      console.log("Registration Success!");
      navigate(`/setPassword/${userId}`);
      setError(false);
    } catch (error) {
      console.error("Something went wrong", error);
      setError(true);
    }
  };

  return (
    <>
    <GoogleTranslate/>
        <div className="p-4">

<img src={logo} alt="Logo" className="z-0 h-32 w-44 scale-150 object-cover mx-auto" />
<div className="h-44 w-44 rounded-full mx-auto mt-8 z-20">
  <img src={reglogo} alt="Register" className="-mt-8 scale-150 rounded-full" />
</div>
<br />
<div className="mx-auto text-5xl font-semibold text-center">Registration</div>

<form className="mt-8 max-w-lg mx-auto space-y-6" onSubmit={handleSubmit}>
  

  <div>
    <label className="block text-lg font-medium mb-2" htmlFor="username">What should we call you?</label>
    <input
      type="text"
      id="username"
      placeholder="Enter your username"
      value={username}
      required
      onChange={(e) => setUsername(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  </div>


  <div>
    <label className="block text-lg font-medium mb-2" htmlFor="phone">Phone Number</label>
    <input
      type="text"
      id="phone"
      placeholder="Enter your Mobile Number"
      value={phone || ''}
      required
      pattern="\d*"
      inputMode="numeric"
      onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
      onChange={handlePhoneChange}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  </div>


  <div>
    <label className="block text-lg font-medium mb-2" htmlFor="age">Age</label>
    <input
      type="number"
      id="age"
      placeholder="Enter your age"
      value={age}
      required
      onChange={(e) => setAge(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
      min="1"
    />
  </div>


  <div>
    <label className="block text-lg font-medium mb-2" htmlFor="gender">Gender</label>
    <select
      id="gender"
      required
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <option value="" disabled>Select your gender</option>
      {genderOptions.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>


  <div>
    <label className="block text-lg font-medium mb-2" htmlFor="health">Any health problem?</label>
    <select
      id="health"
      value={healthProblem}
      onChange={(e) => setHealthProblem(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <option value="" disabled>Select health condition</option>
      {healthOptions.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>


  <div>
    <label className="block text-lg font-medium mb-2" htmlFor="education">Education</label>
    <select
      id="education"
      value={education}
      onChange={(e) => setEducation(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <option value="" disabled>Select your education level</option>
      {educationOptions.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>


  <div>
    <label className="block text-lg font-medium mb-2" htmlFor="shortStory">Tell us a short story about yourself (optional)</label>
    <textarea
      id="shortStory"
      placeholder="Write a short story about yourself"
      value={shortStory}
      onChange={(e) => setShortStory(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
      rows="4"
    ></textarea>
  </div>


  <button
    type="submit"
    className="w-full bg-pink-800 text-white p-3 rounded-lg hover:bg-pink-600 transition-all"
  >
    Submit
  </button>
  
  {error && <p className="text-red-900 mt-2">Username Already Exists</p>}
</form>
</div>
    </>

  );
}

export default Register;
