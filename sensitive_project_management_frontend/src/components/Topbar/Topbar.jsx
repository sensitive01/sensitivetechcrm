import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.webp";

export default function Topbar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center bg-blue-600 text-white py-3 px-4 sm:px-6">
      {/* Logo Section */}
      <div className="flex justify-center md:justify-start items-center mb-4 md:mb-0">
        <img 
          src={logo} 
          alt="Logo" 
          className="max-h-16 sm:max-h-20 md:max-w-[350px] lg:max-w-[550px]" 
        />
      </div>

      {/* Menu Section */}
      <div className="flex justify-center items-center space-x-6 md:space-x-8 lg:space-x-12">
        <Link to="/user" className="font-bold text-white hover:text-gray-200 transition-colors">User</Link>
        <Link to="/employee" className="font-bold text-white hover:text-gray-200 transition-colors">Employee</Link>
        <Link to="/attendance" className="font-bold text-white hover:text-gray-200 transition-colors">Attendance</Link>
        <Link to="/client" className="font-bold text-white hover:text-gray-200 transition-colors">Client</Link>
        <Link to="/project" className="font-bold text-white hover:text-gray-200 transition-colors">Project</Link>
        <Link to="/task" className="font-bold text-white hover:text-gray-200 transition-colors">Task</Link>
        <Link to="/leave" className="font-bold text-white hover:text-gray-200 transition-colors">Leave</Link>
      </div>

      {/* Logout Button Section */}
      <div className="flex justify-center md:justify-end items-center mt-4 md:mt-0">
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded hover:bg-gray-100 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}
