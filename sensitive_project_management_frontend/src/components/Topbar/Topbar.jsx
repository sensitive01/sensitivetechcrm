import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from "../../assets/logo.webp";
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons
import ProfileModal from '../Profile/Profile'; // Import ProfileModal

export default function Topbar() {
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile modal
  const [role, setRole] = useState(""); // State to store the role
  const navigate = useNavigate(); // Initialize useNavigate

  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    position: "Software Developer"
  };

  // Get the role from localStorage when the component mounts
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens, user data)
    localStorage.removeItem("empId");
    localStorage.removeItem("role"); // Clear role from localStorage
    navigate('/'); // Redirect to the login page
  };

  const toggleProfile = () => {
    setShowProfile(prevState => !prevState); // Toggle profile visibility
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 grid grid-cols-1 md:grid-cols-3 items-center bg-blue-600 text-white py-2 px-4 sm:px-6 shadow-md">
      {/* Logo Section */}
      <div className="flex justify-center md:justify-start items-center mb-4 md:mb-0">
        <Link to="/dashboard">
          <img
            src={logo}
            alt="Logo"
            className="max-h-16 sm:max-h-14 md:max-w-[350px] lg:max-w-[550px]"
          />
        </Link>
      </div>

      {/* Menu Section */}
      <div className="flex justify-center items-center space-x-6 md:space-x-8 lg:space-x-7 ml-[-80px]">
        {/* Always visible links */}
        <Link to="/attendance-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Attendance</Link>
        <Link to="/leave-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Leave</Link>
        <Link to="/task" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Task</Link>
        <Link to="/project" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Project</Link>

        {/* Admin specific links */}
        {role === "Superadmin" && (
          <>
            <Link to="/employee-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Employee</Link>
            <Link to="/client-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Client</Link>
            <Link to="/lead-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Leads</Link>
            <Link to="/payments-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Payments</Link>
            <Link to="/payroll-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Payroll</Link>
          </>
        )}

        {role === "Lead" && (
          <>
            <Link to="/lead-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Leads</Link>
            <Link to="/payments-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Payments</Link>
            <Link to="/payroll-table" className="font-bold text-white hover:text-gray-200 text-[16px] transition-colors">Payroll</Link>
          </>
        )}
      </div>

      {/* Right Section: Search Bar, Logout Button, and User Icon */}
      <div className="flex justify-center md:justify-end items-center mt-4 md:mt-0 space-x-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="bg-white text-blue-600 py-2 px-2 w-24 sm:w-32 md:w-40 rounded-l-md focus:outline-none"
        />


        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 text-[16px] font-bold py-2 px-2 rounded hover:bg-gray-100 transition-colors"
        >
          Logout
        </button>

        {/* User Icon */}
        <FaUser
          className="text-white text-[20px] cursor-pointer hover:text-gray-200"
          onClick={toggleProfile}
        />
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          userProfile={userProfile}
          onClose={toggleProfile}
        />
      )}
    </div>
  );
}
