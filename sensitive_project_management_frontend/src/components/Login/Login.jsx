import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo light.png";
import axios from "axios";
import { verifyLogin } from "../../api/services/projectServices";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons from lucide-react

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Login Data:", formData);

      const response = await verifyLogin(formData);

      console.log(response);

      if (response.status === 200) {
        const { _id, role } = response.data.employee || response.data.admin;
        localStorage.setItem("empId", _id);
        localStorage.setItem("role", role);

        if (role === "employee") {
          navigate("/attendance-form");
        } else if (role === "Superadmin") {
          navigate("/dashboard");
        } else if (role === "Lead") {
          navigate("/dashboard");
        } else {
          navigate("/attendance-form");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-blue-500 rounded-lg shadow-md">
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
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between password and text input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="text-blue-500" /> // Blue icon for hidden password
              ) : (
                <Eye className="text-blue-500" /> // Blue icon for visible password
              )}
            </div>
            <div className="mt-2 text-right">
              {/* <a
                href="/forgot-password"
                className="text-sm text-white hover:underline"
              >
                Forgot Password?
              </a> */}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-blue-500 bg-white border border-blue-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {loading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full border-t-2 border-b-2 border-white w-6 h-6"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
