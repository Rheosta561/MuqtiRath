import React, { useState } from 'react';
import logo from './logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !phone || !password) {
      setError('All fields are required!');
      setSuccessMessage('');
      return;
    }

    try {
      setLoading(true); // Start loading
      setError('');
      setSuccessMessage('');
      const response = await axios.post('https://muqtirath-wiegnite.onrender.com/verify', {
        username,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage('Login successful!');
        const userId = response.data.user._id;
        console.log(response.data.user);
        navigate(`/dashboard/${userId}`);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong during the request.');
      }
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="p-4 h-screen w-screen">
      <div className="text-center text-5xl mt-20 font-semibold">
        Login to Your Account
      </div>
      <form
        onSubmit={handleSubmit}
        className="h-auto rounded-lg w-96 mx-auto mt-12 border flex flex-col p-4 space-y-6"
      >
        <div className="h-24 w-full flex items-center justify-center text-xl text-gray-600">
          <img src={logo} className="h-full w-full object-cover scale-50" alt="Logo" />
        </div>
        <div>
          <label htmlFor="username" className="block text-lg font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}
        
        <button
          type="submit"
          className={`w-full bg-pink-800 text-white p-3 rounded-lg transition-all ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Loading...</span>
            </div>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
