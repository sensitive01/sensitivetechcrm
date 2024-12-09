import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
<<<<<<< HEAD
      empId: "EMP001",
      fullName: "Rakesh N",
      designation: "Frontend Developer",
=======
      fullName: "Jeyaram",
      employeeid: "Emp123",
      email: "jeyram@gmail.com",
      phone: "+91 7974532890",
>>>>>>> 03fae27a90367ad50d44a63b0cc73f2f475c6ae0
      department: "IT",
      dob: "2001-01-16",
      doj: "2024-10-14",
      status: "Active",
      createdDate: "2024-10-14",
      imageUrl: "/src/assets/arjun.jpg"
    },
    {
      id: 2,
<<<<<<< HEAD
      empId: "EMP002",
      fullName: "AswiniRaj",
      designation: "Full stack developer",
=======
      fullName: "Adiraj",
      employeeid: "Emp543",
      email: "adiraj@gmail.com",
      phone: "+91 7878234567",
>>>>>>> 03fae27a90367ad50d44a63b0cc73f2f475c6ae0
      department: "IT",
      dob: "1985-09-20",
      doj: "2018-09-01",
      status: "Active",
      createdDate: "2018-08-20",
      imageUrl: "/src/assets/priya.jpg"
    },
    {
      id: 3,
<<<<<<< HEAD
      empId: "EMP003",
      fullName: "Jeyaram",
      designation: "Fultter devp",
=======
      fullName: "AswinRaj",
      employeeid: "Emp456",
      email: "aswinraj@gmail.com",
      phone: "+91 8325678901",
>>>>>>> 03fae27a90367ad50d44a63b0cc73f2f475c6ae0
      department: "IT",
      dob: "1992-07-15",
      doj: "2019-07-10",
      status: "On Leave",
      createdDate: "2019-06-30",
      imageUrl: "/src/assets/vikram.jpg"
    },
    {
<<<<<<< HEAD
      id: 4,
      empId: "EMP004",
      fullName: "Puja Samantaray",
      designation: "Full stack developer",
      department: "IT",
      dob: "1995-11-25",
      doj: "2022-03-05",
      status: "Active",
      createdDate: "2022-02-28",
      imageUrl: "/src/assets/kavya.jpg"
    },
=======
        id: 4,
        fullName: "Puja",
        employeeid: "Emp897",
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
        employeeid: "Emp089",
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
>>>>>>> 03fae27a90367ad50d44a63b0cc73f2f475c6ae0
  ]);

  const renderStatusBadge = (status) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800",
      "On Leave": "bg-yellow-100 text-yellow-800",
      Resigned: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-10 text-center mt-20">Employee Details</h2>

      {/* Add Employee Button */}
      <div className="flex justify-end mb-6">
        <Link
          to="/employee-form"
          className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600 shadow-lg"
        >
          <FaPlus className="mr-2" /> Add Employee
        </Link>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border">
        <table className="w-full table-auto">
          <thead className="bg-blue-50 border-b">
            <tr>
<<<<<<< HEAD
              <th className="p-4 text-left font-semibold text-gray-600">S.No</th>
              <th className="p-4 text-left font-semibold text-gray-600">Profile Picture</th>
              <th className="p-4 text-left font-semibold text-gray-600">Emp ID</th>
              <th className="p-4 text-left font-semibold text-gray-600">Name</th>
              <th className="p-4 text-left font-semibold text-gray-600">Designation</th>
              <th className="p-4 text-left font-semibold text-gray-600">Department</th>
              <th className="p-4 text-left font-semibold text-gray-600">DOB</th>
              <th className="p-4 text-left font-semibold text-gray-600">DOJ</th>
              <th className="p-4 text-left font-semibold text-gray-600">Status</th>
              <th className="p-4 text-left font-semibold text-gray-600">Created Date</th>
              <th className="p-4 text-center font-semibold text-gray-600">Actions</th>
=======
              <th className="p-6 text-left">S.No</th>
              <th className="p-6 text-left">Image</th>
              <th className="p-6 text-left">Name</th>
              <th className="p-6 text-left">EmployeeID</th>
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
>>>>>>> 03fae27a90367ad50d44a63b0cc73f2f475c6ae0
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  <img
                    src={employee.imageUrl}
                    alt={employee.fullName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </td>
<<<<<<< HEAD
                <td className="p-4">{employee.empId}</td>
                <td className="p-4">{employee.fullName}</td>
                <td className="p-4">{employee.designation}</td>
                <td className="p-4">{employee.department}</td>
                <td className="p-4">{employee.dob}</td>
                <td className="p-4">{employee.doj}</td>
                <td className="p-4">{renderStatusBadge(employee.status)}</td>
                <td className="p-4">{employee.createdDate}</td>
                <td className="p-4">
                  <div className="flex justify-center items-center space-x-4">
                    <button
=======
                <td className="p-6">{employee.fullName}</td>
                <td className="p-6">{employee.employeeid}</td>
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
>>>>>>> 03fae27a90367ad50d44a63b0cc73f2f475c6ae0
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
