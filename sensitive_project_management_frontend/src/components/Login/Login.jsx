// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo light.png";
// import { verifyLogin } from "../../api/services/projectServices";
// import { Eye, EyeOff, AlertCircle, Loader } from "lucide-react";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (error) {
//       setError(""); 
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await verifyLogin(formData);
      
//       if (response.status === 200) {
//         const { _id, role } = response.data.employee || response.data.admin;
//         localStorage.setItem("empId", _id);
//         localStorage.setItem("role", role);
//         if (role === "employee") {
//           navigate("/attendance-form");
//         } else if (role === "Superadmin" || role === "Lead") {
//           navigate("/dashboard");
//         } else {
//           navigate("/attendance-form");
//         }
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       if (error.response) {
//         if (error.response.status === 401) {
//           setError("Invalid username or password. Please try again.");
//         } else {
//           setError("An unexpected error occurred. Please try again later.");
//         }
//       } else {
//         setError("Network error. Please check your connection.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
//       <div className="w-full max-w-sm p-6 bg-blue-500 rounded-lg shadow-md">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Logo" className="w-auto h-auto" />
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 mr-2" />
//                 <span>{error}</span>
//               </div>
//             </div>
//           )}
          
//           <div>
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
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border-gray-300"
//               required
//             />
//           </div>
          
//           <div className="relative">
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-medium text-white"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border-gray-300"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                 onClick={togglePasswordVisibility}
//                 tabIndex="-1" // Fixed this line
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-blue-700" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-blue-700" />
//                 )}
//               </button>
//             </div>
//           </div>
          
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <Loader className="animate-spin mr-2 h-4 w-4" />
//                 Logging in...
//               </span>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo light.png";
import { verifyLogin } from "../../api/services/projectServices";
import { Eye, EyeOff, AlertCircle, Loader } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for session expiration message in the URL
    if (location.state?.sessionExpired) {
      setError("Your session has expired. Please login again.");
    }
    
    // Clear any existing authentication data
    localStorage.removeItem("empId");
    localStorage.removeItem("role");
    localStorage.removeItem("tokenExpiration");
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) {
      setError(""); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await verifyLogin(formData);
      
      if (response.status === 200) {
        const { _id, role } = response.data.employee || response.data.admin;
        localStorage.setItem("empId", _id);
        localStorage.setItem("role", role);
        
        // Redirect to the original page or default page
        const from = location.state?.from || (
          role === "employee" ? "/attendance-form" : 
          (role === "Superadmin" || role === "Lead") ? "/dashboard" : 
          "/attendance-form"
        );
        
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid username or password. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="w-full max-w-sm p-6 bg-blue-500 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-auto h-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            </div>
          )}
          
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
    </div>
  );
};

export default LoginPage;