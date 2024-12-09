import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import { FaPlus } from 'react-icons/fa';  // Import the plus icon

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      fullName: "Jeyaram",
      email: "jeyram@gmail.com",
      phone: "+91 7974532890",
      department: "IT",
      position: "Flutter Developer",
      joiningDate: "2022-03-15",
      salary: "85000",
      address: "123 Tech Lane, San Francisco, CA 94105",
      emergencyContactNo: "+91 7974532890",
      task: "Parking Management",
      status: "Active",
      imageUrl: "/src/assets/jey.jpg"
    },
    {
      id: 2,
      fullName: "Adiraj",
      email: "adiraj@gmail.com",
      phone: "+91 7878234567",
      department: "IT",
      position: "Fullstack Developer",
      joiningDate: "2021-06-20",
      salary: "92000",
      address: "456 Corporate Road, New York, NY 10001",
      emergencyContactNo: "+91 7878234567",
      task: "Indexia",
      status: "Active",
      imageUrl: "/src/assets/adi.jpg"
    },
    {
      id: 3,
      fullName: "AswinRaj",
      email: "aswinraj@gmail.com",
      phone: "+91 8325678901",
      department: "IT",
      position: "Fullstack Developer",
      joiningDate: "2020-01-10",
      salary: "120000",
      address: "789 Business Street, Chicago, IL 60601",
      emergencyContactNo: "+91 8325678901",
      task: "Mindmentor",
      status: "On Leave",
      imageUrl: "/src/assets/asw.jpg"
    },
    {
        id: 4,
        fullName: "Puja",
        email: "puja@gmail.com",
        phone: "+91 9558976025",
        department: "IT",
        position: "Fullstack Developer",
        joiningDate: "2021-06-20",
        salary: "92000",
        address: "456 Corporate Road, New York, NY 10001",
        emergencyContactNo: "+91 9558976025",
        task: "Capillary",
        status: "Active",
        imageUrl: "/src/assets/p.jpg"
      },
      {
        id: 5,
        fullName: "Rakesh",
        email: "rakesh@gmail.com",
        phone: "+91 7823451289",
        department: "IT",
        position: "Frontend Developer",
        joiningDate: "2021-06-20",
        address: "456 Corporate Road, New York, NY 10001",
        emergencyContactNo: "+91 7823451289",
        task: "Project Management",
        status: "Active",
        imageUrl: "/src/assets/rak.jpg"
      }
  ]);

  const renderStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-green-100 text-green-800',
      'On Leave': 'bg-yellow-100 text-yellow-800',
      'Resigned': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-20 text-center mt-24 ">Employee Details</h2>

      {/* Button Section with Link */}
      <div className="flex justify-end mb-4">
        <Link 
          to="/employee-form"  // Link to the Employee Form page
          className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600 mb-6"
        >
          <FaPlus className="mr-2" />  {/* Plus icon */}
          Add Employee
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-50 border-b">
            <tr>
              <th className="p-6 text-left">S.No</th>
              <th className="p-6 text-left">Image</th>
              <th className="p-6 text-left">Name</th>
              <th className="p-6 text-left">Department</th>
              <th className="p-6 text-left">Position</th>
              <th className="p-6 text-left">Email</th>
              <th className="p-6 text-left">Phone</th>
              <th className="p-6 text-left">EmergencyContactNo</th>
              <th className="p-6 text-left">Task</th>
              <th className="p-6 text-left">joiningDate</th>
              <th className="p-6 text-left">Address</th>
              <th className="p-6 text-left">Status</th>
              <th className="p-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <img 
                    src={employee.imageUrl} 
                    alt={employee.fullName} 
                    className="w-28 h-16 rounded-full object-cover"
                  />
                </td>
                <td className="p-6">{employee.fullName}</td>
                <td className="p-6">{employee.department}</td>
                <td className="p-6 whitespace-nowrap">{employee.position}</td>
                <td className="p-3">{employee.email}</td>
                <td className="p-3 whitespace-nowrap">{employee.phone}</td>
                <td className="p-6">{employee.emergencyContactNo}</td>
                <td className="p-6 whitespace-nowrap">{employee.task}</td>
                <td className="p-6">{employee.joiningDate}</td>
                <td className="p-3 whitespace-nowrap">{employee.address}</td>
                <td className="p-6">
                  {renderStatusBadge(employee.status)}
                </td>
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button 
                      className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
                      title="View Details"
                    >
                      <Eye size={20} />
                    </button>
                    <button 
                      className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
                      title="Edit Employee"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                      title="Delete Employee"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
