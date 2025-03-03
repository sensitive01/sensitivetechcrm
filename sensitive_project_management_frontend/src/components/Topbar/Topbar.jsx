// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
// Menu, X, User, Search, ChevronDown, 
// LayoutDashboard, 
// Briefcase, 
// Users, 
// Clipboard, 
// MessageCircleQuestion, 
// CreditCard,
// FileText
// } from 'lucide-react';
// import { FaPowerOff } from 'react-icons/fa';
// import logo from "../../assets/logo light.png";

// const Topbar = () => {
//   const [showProfile, setShowProfile] = useState(false);
//   const [role, setRole] = useState("");
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openSubMenu, setOpenSubMenu] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const navigate = useNavigate();

//   const menuItems = [
//     { 
//       label: 'Dashboard', 
//       path: '/dashboard',
//       icon: LayoutDashboard
//     },
//     { 
//       label: 'Clients', 
//       icon: Briefcase,
//       subMenu: [
//         { label: 'Clients', path: '/client-table' },
//         { label: 'Projects', path: '/project' },
//         { label: 'Payments', path: '/payments-table' }
//       ]
//     },
//     { 
//       label: 'Employees', 
//       icon: Users,
//       subMenu: [
//         { label: 'Employee List', path: '/employee-table' },
//         { label: 'Attendance', path: '/attendance-table' },
//         { label: 'Leaves', path: '/leave-table' },
//         { label: 'Adjustments', path: '/adjustment-table' },
//         { label: 'Payroll', path: '/payroll-table' }
//       ]
//     },
//     { 
//       label: 'Tasks', 
//       path: '/task',
//       icon: Clipboard 
//     },
//     { 
//       label: 'Enquiries', 
//       path: '/lead-table',
//       icon: MessageCircleQuestion 
//     },
//     { 
//       label: 'Expenses', 
//       path: '/expense-table',
//       icon: CreditCard 
//     },
//     { 
//       label: 'MoM', 
//       path: '/mom',
//       icon: FileText
//     },
//   ];

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     const empId = localStorage.getItem("empId");
//     setRole(storedRole);

//   const getUserProfile = () => {
//     switch(storedRole) {
//       case "Superadmin":
//         setUserProfile({
//           name: localStorage.getItem("name") || "Admin User",
//           email: localStorage.getItem("email") || "admin@example.com",
//           position: "Super Administrator",
//           employeeId: empId,
//           department: "Administration",
//           accessLevel: "Full Access",
//           lastLogin: new Date().toLocaleString()
//         });
//         break;
//       case "Lead":
//         setUserProfile({
//           name: localStorage.getItem("name") || "Team Lead",
//           email: localStorage.getItem("email") || "lead@example.com",
//           position: "Project Lead",
//           employeeId: empId,
//           department: "Development",
//           team: "Core Development",
//           projectsManaged: "5 Active Projects"
//         });
//         break;
//       case "employee":
//         setUserProfile({
//           name: localStorage.getItem("name") || "Employee",
//           email: localStorage.getItem("email") || "employee@example.com",
//           position: "Software Developer",
//           employeeId: empId,
//           department: "Development",
//           reportingTo: "Team Lead",
//           joinDate: localStorage.getItem("joinDate") || "01/01/2023"
//         });
//         break;
//       default:
//         setUserProfile(null);
//     }
//   };

//   getUserProfile();

//   const handleResize = () => {
//     setIsMobile(window.innerWidth <= 768);
//     if (window.innerWidth > 768) {
//       setIsMenuOpen(false);
//       setOpenSubMenu(null);
//     }
//   };

//   handleResize();
//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("empId");
//     localStorage.removeItem("role");
//     localStorage.removeItem("name");
//     localStorage.removeItem("email");
//     navigate('/');
//   };

// const toggleProfile = () => setShowProfile(!showProfile);
// const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

// const toggleSubMenu = (label) => {
//   setOpenSubMenu(openSubMenu === label ? null : label);
// };

// const renderProfileContent = () => {
//   if (!userProfile) return null;

//   const commonFields = (
//     <>
//       <p><span className="font-semibold">Name:</span> {userProfile.name}</p>
//       <p><span className="font-semibold">Email:</span> {userProfile.email}</p>
//       <p><span className="font-semibold">Position:</span> {userProfile.position}</p>
//       <p><span className="font-semibold">Employee ID:</span> {userProfile.employeeId}</p>
//       <p><span className="font-semibold">Department:</span> {userProfile.department}</p>
//     </>
//   );

//   switch(role) {
//     case "Superadmin":
//       return (
//         <div className="space-y-3">
//           {commonFields}
//           <p><span className="font-semibold">Access Level:</span> {userProfile.accessLevel}</p>
//           <p><span className="font-semibold">Last Login:</span> {userProfile.lastLogin}</p>
//         </div>
//       );
//     case "Lead":
//       return (
//         <div className="space-y-3">
//           {commonFields}
//           <p><span className="font-semibold">Team:</span> {userProfile.team}</p>
//           <p><span className="font-semibold">Projects Managed:</span> {userProfile.projectsManaged}</p>
//         </div>
//       );
//     case "employee":
//       return (
//         <div className="space-y-3">
//           {commonFields}
//           <p><span className="font-semibold">Reporting To:</span> {userProfile.reportingTo}</p>
//           <p><span className="font-semibold">Join Date:</span> {userProfile.joinDate}</p>
//         </div>
//       );
//     default:
//       return null;
//   }
// };

// if (isMobile && (role === "employee" || role === "Lead")) {
//   return (
//     <div className="fixed inset-0 bg-gray-800 text-white flex items-center justify-center p-4">
//       <div className="text-center max-w-sm">
//         <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
//         <p className="text-lg">This application is not accessible on mobile for your role. Please use a desktop device.</p>
//       </div>
//     </div>
//   );
// }

// const renderMenuItem = (item, isMobileMenu = false) => {
//   const ItemIcon = item.icon;

//   if (item.subMenu) {
//     return (
//       <div key={item.label} className="relative">
//         {isMobileMenu ? (
//           <div 
//             onClick={() => toggleSubMenu(item.label)}
//             className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
//           >
//             <div className="flex items-center">
//               {ItemIcon && <ItemIcon className="mr-2 h-5 w-5 text-white" color="white" />}
//               {item.label}
//             </div>
//             <ChevronDown className={`h-4 w-4 transform ${openSubMenu === item.label ? 'rotate-180' : ''}`} />
//           </div>
//         ) : (
//           <div 
//             className="relative group"
//             onMouseEnter={() => setOpenSubMenu(item.label)}
//             onMouseLeave={() => setOpenSubMenu(null)}
//           >
//             <span className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium flex items-center cursor-pointer">
//               {ItemIcon && <ItemIcon className="mr-2 h-5 w-5 text-white" color="white" />}
//               {item.label}
//               <ChevronDown className="h-4 w-4 ml-1" />
//             </span>

//             {openSubMenu === item.label && (
//               <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 z-50 min-w-[200px]">
//                 {item.subMenu.map((subItem) => (
//                   <Link
//                     key={subItem.path}
//                     to={subItem.path}
//                     className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
//                   >
//                     {subItem.label}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {isMobileMenu && openSubMenu === item.label && (
//           <div className="pl-4">
//             {item.subMenu.map((subItem) => (
//               <Link
//                 key={subItem.path}
//                 to={subItem.path}
//                 className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {subItem.label}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return isMobileMenu ? (
//     <Link
//       key={item.path}
//       to={item.path}
//       className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
//       onClick={() => setIsMenuOpen(false)}
//     >
//       {ItemIcon && <ItemIcon className="mr-2 h-5 w-5 text-white" color="white" />}
//       {item.label}
//     </Link>
//   ) : (
//     <Link
//       key={item.path}
//       to={item.path}
//       className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium flex items-center"
//     >
//       {ItemIcon && <ItemIcon className="mr-2 h-5 w-5 text-white" color="white" />}
//       {item.label}
//     </Link>
//   );
// };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-md">
//       <div className="max-w-8xl mx-auto px-4">
//         <div className="flex justify-between items-center h-20">
//           <div className="flex-shrink-0">
//             <Link to="/dashboard">
//               <img src={logo} alt="Logo" className="h-16 w-auto" />
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-4">
//             {menuItems.map((item) => renderMenuItem(item))}
//           </div>

//           {/* Right Section */}
//           <div className="hidden md:flex items-center space-x-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
//             >
//               <FaPowerOff className="h-5 w-5" />
//             </button>
//             <User
//               className="h-6 w-6 cursor-pointer hover:text-gray-200"
//               onClick={toggleProfile}
//             />
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="text-white hover:text-gray-200 p-2"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-2">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {menuItems.map((item) => renderMenuItem(item, true))}
//               <div className="mt-4 space-y-2">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full px-4 py-2 rounded-md text-gray-900 text-sm"
//                 />
//                 <button
//                   onClick={handleLogout}
//                   className="w-full bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Profile Modal */}
//       {showProfile && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white text-gray-900 rounded-lg p-6 max-w-sm w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Profile Details</h2>
//               <button onClick={toggleProfile} className="text-gray-500 hover:text-gray-700">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             {renderProfileContent()}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Topbar;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu, X, User, Search, ChevronDown,
  LayoutDashboard,
  Briefcase,
  Users,
  Clipboard,
  MessageCircleQuestion,
  CreditCard,
  FileText
} from "lucide-react";
import { FaPowerOff } from "react-icons/fa";
import logo from "../../assets/logo light.png";

const Topbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [role, setRole] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mobileMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  // const [userProfile, setUserProfile] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   empId: "",
  // });
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    {
      label: "Clients",
      icon: Briefcase,
      subMenu: [
        { label: "Clients", path: "/client-table", roles: ["Superadmin"] },
        { label: "Projects", path: "/project", roles: ["Superadmin", "employee"] },
        { label: "Payments", path: "/payments-table", roles: ["Superadmin"] },
      ],
    },
    {
      label: "Employees",
      icon: Users,
      subMenu: [
        { label: "Employee List", path: "/employee-table", roles: ["Superadmin"] },
        { label: "Attendance", path: "/attendance-table", roles: ["Superadmin", "employee", "Lead"] },
        { label: "Leaves", path: "/leave-table", roles: ["Superadmin", "employee", "Lead"] },
        { label: "Adjustments", path: "/adjustment-table", roles: ["Superadmin"] },
        { label: "Payroll", path: "/payroll-table", roles: ["Superadmin"] },
      ],
    },
    { label: "Tasks", path: "/task", icon: Clipboard },
    {
      label: "Enquiries",
      path: "/lead-table",
      icon: MessageCircleQuestion,
      roles: ["Superadmin", "Lead"],
    },
    {
      label: "Expenses",
      path: "/expense-table",
      icon: CreditCard,
      roles: ["Superadmin"], // Visible only to Superadmin
    },
    { label: "MoM", path: "/momdetails", icon: FileText },
    { label: "Quotations", path: "/quotation-table", icon: FileText },
  ];

  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "Superadmin";
    // const storedUser = {
    //   name: localStorage.getItem("name") || "John Doe",
    //   email: localStorage.getItem("email") || "johndoe@example.com",
    //   password: localStorage.getItem("password") || "******",
    //   empId: localStorage.getItem("empId") || "123",
    // };
    setRole(storedRole);
    // setUserProfile(storedUser);

    // Add click outside listener for mobile menu
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, []);

  // Focus search input when search bar is opened
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // const toggleProfile = () => setShowProfile(!showProfile);
  const toggleProfile = async () => {
    setShowProfile(!showProfile);

    // Fetch profile data from the API when the profile button is clicked
    if (!userProfile) {
      try {
        const response = await axios.get(`https://sensitivetechcrm.onrender.com/employeedetails/${localStorage.getItem("empId")}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSubMenu = (label) => setOpenSubMenu(openSubMenu === label ? null : label);
  const toggleSearch = () => setShowSearch(!showSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search functionality here
    console.log('Searching for:', searchQuery);
    setShowSearch(false);
    setSearchQuery('');
  };

  // Close mobile menu when clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsMobileMenuOpen(false);
    }
  };

  const renderMenuItem = (item, isMobile = false) => {
    const ItemIcon = item.icon;

    if (item.subMenu) {
      const visibleSubItems = item.subMenu.filter(subItem => !subItem.roles || subItem.roles.includes(role));
      if (visibleSubItems.length === 0) return null;

      return (
        <div key={item.label} className={`relative ${isMobile ? 'w-full' : ''}`}>
          <div
            onClick={() => toggleSubMenu(item.label)}
            className={`
              flex items-center justify-between cursor-pointer
              ${isMobile
                ? 'px-4 py-3 text-gray-100 hover:bg-blue-700 w-full'
                : 'text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium'
              }
            `}
          >
            <div className="flex items-center">
              {ItemIcon && <ItemIcon className="mr-2 h-5 w-5" />}
              {item.label}
            </div>
            <ChevronDown className={`h-4 w-4 transform transition-transform ${openSubMenu === item.label ? 'rotate-180' : ''}`} />
          </div>

          {openSubMenu === item.label && (
            <div className={`
              ${isMobile
                ? 'bg-blue-700 w-full'
                : 'absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md min-w-[200px]'
              }
            `}>
              {visibleSubItems.map((subItem) => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  className={`
                    block px-4 py-2
                    ${isMobile
                      ? 'text-gray-100 hover:bg-blue-800'
                      : 'text-gray-800 hover:bg-gray-100'
                    }
                  `}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.roles && !item.roles.includes(role)) return null;

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
        className={`
          flex items-center
          ${isMobile
            ? 'px-4 py-3 text-gray-100 hover:bg-blue-700 w-full'
            : 'text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium'
          }
        `}
      >
        {ItemIcon && <ItemIcon className="mr-2 h-5 w-5" />}
        {item.label}
      </Link>
    );
  };

  // Restrict mobile access for "employee" and "Lead" roles
  if (role !== "Superadmin" && window.innerWidth <= 768) {
    return (
      <div className="fixed inset-0 bg-gray-800 text-white flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
          <p className="text-lg">This application is not accessible on mobile for your role. Please use a desktop device.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-md">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/dashboard">
                <img src={logo} alt="Logo" className="h-16 w-auto" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => renderMenuItem(item))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button
                onClick={toggleSearch}
                className="p-2 hover:bg-blue-700 rounded-md"
              >
                <Search className="h-5 w-5" />
              </button>

              <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-2 rounded-md">
                <FaPowerOff className="h-5 w-5" />
              </button>
              <User
                className="h-6 w-6 cursor-pointer hover:text-gray-200 hidden md:block"
                onClick={toggleProfile}
              />

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Overlay */}
        {showSearch && (
          <div className="absolute inset-0 bg-blue-600 z-50">
            <div className="max-w-8xl mx-auto px-4 h-20 flex items-center">
              <form onSubmit={handleSearch} className="flex-1 flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-blue-500 text-white placeholder-blue-200 border-none rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
              <button
                onClick={toggleSearch}
                className="ml-4 p-2 hover:bg-blue-700 rounded-md"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleOverlayClick}
          >
            {/* Mobile Menu Content */}
            <div
              ref={mobileMenuRef}
              className="fixed inset-y-0 left-0 w-64 bg-blue-600 transform transition-transform duration-300 ease-in-out overflow-y-auto"
            >
              <div className="flex flex-col h-full pt-20">
                {menuItems.map((item) => renderMenuItem(item, true))}
                <div className="mt-4 px-4">
                  <div
                    className="flex items-center px-4 py-3 text-gray-100 hover:bg-blue-700 cursor-pointer"
                    onClick={toggleProfile}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Profile Modal */}
      {showProfile && userProfile ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2" onClick={toggleProfile}>
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-black text-xl font-semibold mb-4">Profile Details</h2>
            <p className="text-black"><strong>Role:</strong> {role}</p>
            <p className="text-black"><strong>Name:</strong> {userProfile.name}</p>
            <p className="text-black"><strong>Email:</strong> {userProfile.email}</p>
            <p className="text-black"><strong>Password:</strong> {userProfile.password}</p>
            <p className="text-black"><strong>empId:</strong> {userProfile.empId}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Topbar;
