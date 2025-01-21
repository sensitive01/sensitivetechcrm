import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Search } from 'lucide-react';
import { FaPowerOff } from 'react-icons/fa'; // Importing the FaPowerOff icon
import logo from "../../assets/logo.webp";

const Topbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [role, setRole] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const empId = localStorage.getItem("empId");
    setRole(storedRole);

    // Fetch and set user profile based on role
    const getUserProfile = () => {
      // In a real application, you would fetch this data from your API
      // This is a simulation of different profile data based on role
      switch(storedRole) {
        case "Superadmin":
          setUserProfile({
            name: localStorage.getItem("name") || "Admin User",
            email: localStorage.getItem("email") || "admin@example.com",
            position: "Super Administrator",
            employeeId: empId,
            department: "Administration",
            accessLevel: "Full Access",
            lastLogin: new Date().toLocaleString()
          });
          break;
        case "Lead":
          setUserProfile({
            name: localStorage.getItem("name") || "Team Lead",
            email: localStorage.getItem("email") || "lead@example.com",
            position: "Project Lead",
            employeeId: empId,
            department: "Development",
            team: "Core Development",
            projectsManaged: "5 Active Projects"
          });
          break;
        case "employee":
          setUserProfile({
            name: localStorage.getItem("name") || "Employee",
            email: localStorage.getItem("email") || "employee@example.com",
            position: "Software Developer",
            employeeId: empId,
            department: "Development",
            reportingTo: "Team Lead",
            joinDate: localStorage.getItem("joinDate") || "01/01/2023"
          });
          break;
        default:
          setUserProfile(null);
      }
    };

    getUserProfile();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("empId");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate('/');
  };

  const toggleProfile = () => setShowProfile(!showProfile);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Render profile content based on role
  const renderProfileContent = () => {
    if (!userProfile) return null;

    const commonFields = (
      <>
        <p><span className="font-semibold">Name:</span> {userProfile.name}</p>
        <p><span className="font-semibold">Email:</span> {userProfile.email}</p>
        <p><span className="font-semibold">Position:</span> {userProfile.position}</p>
        <p><span className="font-semibold">Employee ID:</span> {userProfile.employeeId}</p>
        <p><span className="font-semibold">Department:</span> {userProfile.department}</p>
      </>
    );

    switch(role) {
      case "Superadmin":
        return (
          <div className="space-y-3">
            {commonFields}
            <p><span className="font-semibold">Access Level:</span> {userProfile.accessLevel}</p>
            <p><span className="font-semibold">Last Login:</span> {userProfile.lastLogin}</p>
          </div>
        );
      case "Lead":
        return (
          <div className="space-y-3">
            {commonFields}
            <p><span className="font-semibold">Team:</span> {userProfile.team}</p>
            <p><span className="font-semibold">Projects Managed:</span> {userProfile.projectsManaged}</p>
          </div>
        );
      case "employee":
        return (
          <div className="space-y-3">
            {commonFields}
            <p><span className="font-semibold">Reporting To:</span> {userProfile.reportingTo}</p>
            <p><span className="font-semibold">Join Date:</span> {userProfile.joinDate}</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Access restriction message for mobile employees and leads
  if (isMobile && (role === "employee" || role === "Lead")) {
    return (
      <div className="fixed inset-0 bg-gray-800 text-white flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
          <p className="text-lg">This application is not accessible on mobile for your role. Please use a desktop device.</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Attendance', path: '/attendance-table' },
    { label: 'Leave', path: '/leave-table' },
    { label: 'Task', path: '/task' },
    { label: 'Project', path: '/project' },
    ...(role === 'Superadmin' ? [
      { label: 'Employee', path: '/employee-table' },
      { label: 'Client', path: '/client-table' },
      { label: 'Leads', path: '/lead-table' },
      { label: 'Payments', path: '/payments-table' },
      { label: 'Payroll', path: '/payroll-table' }
    ] : []),
    ...(role === 'Lead' ? [
      { label: 'Leads', path: '/lead-table' },
    ] : [])
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/dashboard">
              {/* <img
                src="/src/assets/logo.webp"
                alt="Logo"
                className="h-12 w-auto"
              /> */}
               <img src={logo} alt="Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
            >
              
              <FaPowerOff className="h-5 w-5" />
            </button>
            <User
              className="h-6 w-6 cursor-pointer hover:text-gray-200"
              onClick={toggleProfile}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-md text-gray-900 text-sm"
                />
                <button
                  onClick={handleLogout}
                  className="w-full bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Profile Details</h2>
              <button onClick={toggleProfile} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            {renderProfileContent()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Topbar;