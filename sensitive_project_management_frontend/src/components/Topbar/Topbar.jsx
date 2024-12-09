import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from "../../assets/logo.webp";
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons

export default function Topbar() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens, user data)
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 grid grid-cols-1 md:grid-cols-3 items-center bg-blue-600 text-white py-2 px-4 sm:px-6 shadow-md">
      {/* Logo Section */}
      <div className="flex justify-center md:justify-start items-center mb-4 md:mb-0">
        <Link to="/dashboard">
          <img 
            src={logo} 
            alt="Logo" 
            className="max-h-16 sm:max-h-20 md:max-w-[350px] lg:max-w-[550px]" 
          />
        </Link>
      </div>

      {/* Menu Section */}
      <div className="flex justify-center items-center space-x-6 md:space-x-8 lg:space-x-12">
<<<<<<< HEAD
<<<<<<< HEAD
=======
        <Link to="/employee-table" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Employee</Link>
        <Link to="/attendance-table" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Attendance</Link>
        <Link to="/client-table" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Client</Link>
        <Link to="/task" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Task</Link>
        <Link to="/leave-table" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Leave</Link>
=======
>>>>>>> puja_code


        <Link to="/employee-table" className="font-bold text-white hover:text-gray-200 text-xl transition-colors">Employee</Link>
        <Link to="/attendance" className="font-bold text-white hover:text-gray-200 text-xl transition-colors">Attendance</Link>
        <Link to="/client" className="font-bold text-white hover:text-gray-200 text-xl transition-colors">Client</Link>
        <Link to="/task" className="font-bold text-white hover:text-gray-200 text-xl transition-colors">Task</Link>
        <Link to="/project" className="font-bold text-white hover:text-gray-200 transition-colors">Project</Link>
        <Link to="/leave" className="font-bold text-white hover:text-gray-200 text-xl transition-colors">Leave</Link>


<<<<<<< HEAD
=======
        <Link to="/employee-table" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Employee</Link>
        <Link to="/attendance-table" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Attendance</Link>
        <Link to="/client-table" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Client</Link>
        <Link to="/task" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Task</Link>
        <Link to="/leave-table" className="font-bold text-white hover:text-gray-200 text-2xs transition-colors">Leave</Link>
>>>>>>> puja_code
=======
>>>>>>> e139716cba39215f2eb80da352cc36aaa4c80ed4
>>>>>>> puja_code
      </div>

      {/* Right Section: Search Bar, Logout Button, and User Icon */}
      <div className="flex justify-center md:justify-end items-center mt-4 md:mt-0 space-x-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="bg-white text-blue-600 py-2 px-4 rounded-l-md focus:outline-none"
        />
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="bg-white text-blue-600 font-bold py-3 px-8 rounded hover:bg-gray-100 transition-colors"
        >
          Logout
        </button>

        {/* User Icon */}
        <FaUser className="text-white text-2xl cursor-pointer hover:text-gray-200" />
      </div>
    </div>
  );
}
