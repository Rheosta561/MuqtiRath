import React, { useState } from 'react';
import logo from './logo.png';
import reglogo from './register.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [healthProblem, setHealthProblem] = useState('');
  const [education, setEducation] = useState('');
  const [shortStory, setShortStory] = useState('');
  const [filteredEducationOptions, setFilteredEducationOptions] = useState([]);
  const [filteredHealthOptions, setFilteredHealthOptions] = useState([]);

  const healthOptions = [
    'None',
    'Diabetes',
    'Asthma',
    'Heart Disease',
    'Hypertension',
    'Other',
  ];

  const educationOptions = [
    'None',
    '5th',
    '10th',
    '12th',
    'Graduation',
    'Post-Graduation',
  ];

  const genderOptions = ['Women', 'Trans'];

  const handleEducationChange = (e) => {
    setError(false);
    const value = e.target.value;
    setEducation(value);
    if (value.trim() === '') {
      setFilteredEducationOptions([]);
    } else {
      setFilteredEducationOptions(
        educationOptions.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleEducationOptionClick = (option) => {
    setEducation(option);
    setFilteredEducationOptions([]);
  };

  const handleHealthChange = (e) => {
    const value = e.target.value;
    setHealthProblem(value);
    if (value.trim() === '') {
      setFilteredHealthOptions([]);
    } else {
      setFilteredHealthOptions(
        healthOptions.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };
  const [error, setError] = useState(false);

  const handleHealthOptionClick = (option) => {
    setHealthProblem(option);
    setFilteredHealthOptions([]);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("button clicked")
    e.preventDefault();
    const formdata = {
      username,
      age,
      gender,
      health: healthProblem,
      education,
      story: shortStory,
    };
  
    try {
      const response = await axios.post("https://muqtirath-wiegnite.onrender.com/createUser", formdata);
      console.log(response);
      const userId = response.data.newUser._id;
      console.log("Success");
      navigate(`/setPassword/${userId}`);
      setError(false);
    } catch (error) {
      console.log("Something went wrong", error);
      setError(true);
    }
  };

  return (
    <div className="p-4">
      <img
        src={logo}
        alt="Logo"
        className="z-0 h-32 w-44 scale-150 object-cover mx-auto"
      />
      <div className="h-44 w-44 rounded-full mx-auto mt-8 z-20">
        <img
          src={reglogo}
          alt="Register"
          className="-mt-8 scale-150 rounded-full"
        />
      </div>
      <br />
      <div className="mx-auto text-5xl font-semibold text-center ">
        Registration
      </div>
      <form className="mt-8 max-w-lg mx-auto space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="username">
            What should we call you?
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter your age"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            min="1"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="" disabled>
              Select your gender
            </option>
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Health Problem */}
        <div className="relative">
          <label className="block text-lg font-medium mb-2" htmlFor="health">
            Any health problem?
          </label>
          <input
            type="text"
            id="health"
            name="health"
            placeholder="Type your health problem"
            value={healthProblem}
            onChange={handleHealthChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {filteredHealthOptions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-1 z-10">
              {filteredHealthOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleHealthOptionClick(option)}
                  className="p-2 hover:bg-pink-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Education */}
        <div className="relative">
          <label className="block text-lg font-medium mb-2" htmlFor="education">
            Education
          </label>
          <input
            type="text"
            id="education"
            name="education"
            placeholder="Type your education level"
            value={education}
            onChange={handleEducationChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {filteredEducationOptions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-1 z-10">
              {filteredEducationOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleEducationOptionClick(option)}
                  className="p-2 hover:bg-pink-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Short Story */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="shortStory">
            Tell us a short story about yourself (optional)
          </label>
          <textarea
            id="story"
            name="story"
            placeholder="Write a short story about yourself"
            value={shortStory}
            onChange={(e) => setShortStory(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-800 text-white p-3 rounded-lg hover:bg-pink-600 transition-all"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {error && <p className='text-red-900'>Username Already Exists</p>}
      </form>
    </div>
  );
}

export default Register;
