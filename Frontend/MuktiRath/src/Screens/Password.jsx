import React, { useState } from 'react';
import logo from './logo.png';
import { useNavigate, useNavigationType, useParams } from 'react-router-dom';
import axios from 'axios';

function Password() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password
  const { userId } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setSuccessMessage('');
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      

      const response = await axios.post(`https://muqtirath-wiegnite.onrender.com/createPass/${userId}`, {
        password,
      });

      if (response.data.message === 'Password updated successfully') {
        const userId = response.data.updatedUser._id;
        setSuccessMessage('Password successfully created!');
        navigate(`/dashboard/${userId}`);
      }
    } catch (err) {
      setError('Something went wrong while updating the password.');
    }
  };

  return (
    <div className="p-4 h-screen w-screen">
      <div className="text-center text-5xl mt-20 font-semibold">
        Let's Create a Password
      </div>
      <form
        onSubmit={handleSubmit}
        className="h-auto rounded-lg w-96 mx-auto mt-12 border flex flex-col p-4 space-y-6"
      >
        <div className="h-24 w-full flex items-center justify-center text-xl text-gray-600">
          <img src={logo} className="h-full w-full object-cover scale-50" alt="" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-lg font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}
        <button
          type="submit"
          className="w-full bg-pink-800 text-white p-3 rounded-lg hover:bg-pink-600 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Password;
