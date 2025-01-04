import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import axios from "axios";
import { verifyLogin } from "../../api/services/projectServices";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login Data:", formData);

      // Determine whether this is an employee or admin login
      // const endpoint = formData.username.includes("admin") 
      //   ? "https://sensitivetechcrm.onrender.comadmin-login/adminlogin"  
      //   : "https://sensitivetechcrm.onrender.comemployee-login/login";





      // const response = await axios.post("https://sensitivetechcrm.onrender.comemployee-login/login", formData);
      const response = await verifyLogin(formData)

      console.log(response);

      if (response.status === 200) {
        const { _id, role } = response.data.employee || response.data.admin; // Adapt based on response structure
        localStorage.setItem("empId", _id);
        localStorage.setItem("role", role); // Save role to localStorage

        // Navigate based on role
        if (role === "employee") {
          navigate("/attendance-form");
        } else if (role === "Superadmin") {
          navigate("/dashboard"); // Admin should be navigated to the dashboard
        } else if (role === "Lead") {
          navigate("/dashboard"); // Lead should be navigated to their dashboard
        } else {
          navigate("/attendance-form"); // Default navigation
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid username or password. Please try again.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-blue-500 rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-auto h-auto" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
            />
            <div className="mt-2 text-right">
              <a
                href="/forgot-password"
                className="text-sm text-white hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-blue-500 bg-white border border-blue-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


