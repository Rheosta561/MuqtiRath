import React, { useState } from 'react';
import logo from '../../Screens/logo.png';
import { useNavigate } from 'react-router-dom';

function OrgNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleAboutClick = ()=>{
    navigate('/about');
  }
  const handleContactClick=()=>{
    navigate('/contact');
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-50 border-gray-200 fixed z-50 top-0 right-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-9 scale-150 rounded-lg" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            Mukti<span className="text-pink-900">Rath</span>
          </span>
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto transition-all duration-300 ease-in-out`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-zinc-900 rounded-sm md:bg-transparent md:text-zinc-700 md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={handleAboutClick}
              >
                About
              </a>
            </li>
            <li>
              <a
                onClick={handleContactClick}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default OrgNavBar;
