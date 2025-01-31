import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';  

function NgoReg() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    jobs: '',
    city: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();
  const { orgId } = useParams();  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);  
  const handleClick =()=>{
    navigate(`/organisations/dashboard/${orgId}`);

  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://muqtirath-wiegnite.onrender.com/register', { 
        ...formData, 
        orgId 
      });

      console.log('Response:', response);
      setFormSubmitted(true);  
      setError(null);  
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again later.');  
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-1 md:p-4 bg-gray-100">
      {!formSubmitted ? (
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-1">Organisation Registration</h2>
          <h1 className="text-center mb-4">
            Partner with <span className="font-semibold">Mukti<span className="text-pink-900">Rath</span></span>
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Organisation Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description (What You Do)</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label htmlFor="jobs" className="block text-sm font-medium text-gray-600">Jobs You Provide</label>
              <textarea
                id="jobs"
                name="jobs"
                value={formData.jobs}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-600">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            {error && (
              <div className="text-red-600 text-center mt-4">{error}</div>
            )}


            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-zinc-800 text-white rounded-md hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register NGO
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-2xl p-8 message rounded-lg text-center">
          <h2 className="text-5xl font-semibold text-zinc-900 mb-2">Thank You for Partnering!</h2>
          <h1 className='text-2xl mb-2'>with <span className='font-semibold'>Mukti<span className='text-pink-900'>Rath</span></span></h1>
          <button 
            className='bg-zinc-900 p-3 rounded-full text-white'
            onClick={handleClick}  
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default NgoReg;
