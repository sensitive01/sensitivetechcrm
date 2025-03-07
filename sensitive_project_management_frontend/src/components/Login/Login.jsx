// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo light.png";
// import axios from "axios";
// import { verifyLogin } from "../../api/services/projectServices";
// import { Eye, EyeOff } from "lucide-react";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {

//       const response = await verifyLogin(formData);
//       if (response.status === 200) {
//         const { _id, role } = response.data.employee || response.data.admin;
//         localStorage.setItem("empId", _id);
//         localStorage.setItem("role", role);

//         if (role === "employee") {
//           navigate("/attendance-form");
//         } else if (role === "Superadmin") {
//           navigate("/dashboard");
//         } else if (role === "Lead") {
//           navigate("/dashboard");
//         } else {
//           navigate("/attendance-form");
//         }
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert("Invalid username or password. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-sm p-6 bg-blue-500 rounded-lg shadow-md">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Logo" className="w-auto h-auto" />
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="username"
//               className="block mb-2 text-sm font-medium text-white"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
//             />
//           </div>
//           <div className="mb-4 relative">
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-medium text-white"
//             >
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
//             />
//             <div
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? (
//                 <EyeOff className="text-blue-500" />
//               ) : (
//                 <Eye className="text-blue-500" />
//               )}
//             </div>
//             <div className="mt-2 text-right">
//               {/* <a
//                 href="/forgot-password"
//                 className="text-sm text-white hover:underline"
//               >
//                 Forgot Password?
//               </a> */}
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-sm font-medium text-blue-500 bg-white border border-blue-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {loading && (
//           <div className="flex justify-center mt-4">
//             <div className="animate-spin rounded-full border-t-2 border-b-2 border-white w-6 h-6"></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo light.png";
import { verifyLogin } from "../../api/services/projectServices";
import { Eye, EyeOff, AlertCircle, Loader, X } from "lucide-react";

// Simple Toast Notification Component
const ErrorToast = ({ message, onClose }) => {
  return (
    <div 
      className="fixed top-4 right-4 z-50 flex items-center p-4 mb-4 bg-red-100 border-l-4 border-red-500 rounded-lg shadow-md max-w-md animate-fade-in"
      style={{
        animation: 'fadeIn 0.3s ease-in-out',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex-shrink-0">
        <AlertCircle className="h-5 w-5 text-red-500" />
      </div>
      <div className="ml-3 mr-8 text-sm font-medium text-red-700">
        {message}
      </div>
      <button
        type="button"
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 rounded-lg p-1.5 inline-flex items-center justify-center focus:outline-none"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorToast, setErrorToast] = useState({ show: false, message: "" });
  const navigate = useNavigate();

  // Effect to auto-dismiss the toast after 5 seconds
  useEffect(() => {
    let timer;
    if (errorToast.show) {
      timer = setTimeout(() => {
        setErrorToast({ show: false, message: "" });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorToast.show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error toast when user starts typing again
    if (errorToast.show) {
      setErrorToast({ show: false, message: "" });
    }
  };

  const showError = (message) => {
    setErrorToast({
      show: true,
      message: message
    });
    
    // Create a global error message element as a fallback
    // This approach creates a DOM element directly if the component approach fails
    const existingError = document.getElementById("global-error-toast");
    if (!existingError) {
      const errorDiv = document.createElement("div");
      errorDiv.id = "global-error-toast";
      errorDiv.style.position = "fixed";
      errorDiv.style.top = "20px";
      errorDiv.style.right = "20px";
      errorDiv.style.backgroundColor = "#FEE2E2";
      errorDiv.style.color = "#B91C1C";
      errorDiv.style.padding = "16px";
      errorDiv.style.borderRadius = "8px";
      errorDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      errorDiv.style.zIndex = "9999";
      errorDiv.style.maxWidth = "400px";
      errorDiv.style.borderLeft = "4px solid #EF4444";
      
      const errorText = document.createElement("div");
      errorText.textContent = message;
      
      const closeButton = document.createElement("button");
      closeButton.textContent = "×";
      closeButton.style.position = "absolute";
      closeButton.style.top = "8px";
      closeButton.style.right = "8px";
      closeButton.style.background = "none";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "20px";
      closeButton.style.cursor = "pointer";
      closeButton.style.color = "#B91C1C";
      
      closeButton.onclick = function() {
        document.body.removeChild(errorDiv);
      };
      
      errorDiv.appendChild(errorText);
      errorDiv.appendChild(closeButton);
      document.body.appendChild(errorDiv);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (document.body.contains(errorDiv)) {
          document.body.removeChild(errorDiv);
        }
      }, 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorToast({ show: false, message: "" }); // Clear any existing errors

    try {
      const response = await verifyLogin(formData);
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
      
      // Determine appropriate error message
      let errorMessage = "Invalid username or password. Please try again.";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Invalid username or password. Please try again.";
        } else {
          errorMessage = error.response.data?.message || 
            `Authentication failed (${error.response.status}): Please check your credentials.`;
        }
      } else if (error.request) {
        errorMessage = "Server not responding. Please try again later.";
      } else {
        errorMessage = "An error occurred during login. Please try again.";
      }
      
      // Show the error toast
      showError(errorMessage);
      
      // Also create a direct alert as last resort
      setTimeout(() => {
        alert("Login Failed: " + errorMessage);
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Toast Notification Component */}
      {errorToast.show && (
        <ErrorToast 
          message={errorToast.message} 
          onClose={() => setErrorToast({ show: false, message: "" })} 
        />
      )}

      <div className="w-full max-w-sm p-6 bg-blue-500 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-auto h-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border-gray-300"
              required
            />
          </div>
          
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border-gray-300"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={togglePasswordVisibility}
                tabIndex="-1"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-blue-700" />
                ) : (
                  <Eye className="h-5 w-5 text-blue-700" />
                )}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin mr-2 h-4 w-4" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      {/* Inline error notification */}
      <div id="error-container"></div>
    </div>
  );
};

export default LoginPage;