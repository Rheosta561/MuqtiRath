import React, { useState } from 'react';
import logo from './logo.png'

function Password() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setSuccessMessage('');
    } else {
      setError('');
      setSuccessMessage('Password successfully created!');
      console.log(`Phone: ${phone}, Password: ${password}`);
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
        <div className="h-24 w-full  flex items-center justify-center text-xl text-gray-600">
          <img src={logo} className='h-full w-full object-cover scale-50' alt="" />
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
            placeholder="Create a password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-lg font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm">{successMessage}</div>
        )}
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
