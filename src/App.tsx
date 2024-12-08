// path/to/App.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/productSlice';
import SearchBar from './components/SearchBar';
import Logo from './assets/logo.svg';
import heroImg from './assets/image 2.png';
import ProductGrid from './components/ProductGrid';
import { AppDispatch } from './store/store';
import { IoPersonCircle } from "react-icons/io5";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null); // Reference for the profile options

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleProfileOptions = () => {
    setShowProfileOptions((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef]);

  return (
    <div className="min-h-screen bg-[#FEFEF4]">
      <div className="container w-100 mx-auto">
        <div className="flex justify-between align-middle px-2 py-4 mb-8 z-20 fixed top-0 left-0 w-full bg-[#FEFEF4] shadow-md border-b-2 border-[#124E49]"> 
          <div className="flex justify-between align-middle">
          <img src={Logo} alt="Logo" className="h-10 w-auto ml-4" />
          <h1 className="text-2xl text-[#124E49] my-auto ml-4 font-bold">
            Wingman
          </h1>
          </div>
          <div className="flex items-center relative" ref={profileRef}> 
            <div className="relative">
              <IoPersonCircle
                className="ml-4 text-[#124E49] cursor-pointer"
                size={50}
                onClick={toggleProfileOptions} // Toggle on click
              />
              {showProfileOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg shadow-lg z-20">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">Settings</li>
                    <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='title mt-[6rem] text-[#124E49] text-center text-4xl font-semibold'>Welcome to Wingman!</div>
        <SearchBar />
        <ProductGrid />
      </div>
    </div>
  );
};

export default App;