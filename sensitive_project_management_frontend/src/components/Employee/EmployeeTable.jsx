import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Track the employee to be deleted
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee data from an API
    const fetchEmployees = async () => {
      try {
        setLoading(true); // Show loader
        const response = await axios.get(
          "http://localhost:5000/getallemployees"
        ); // Replace with your API endpoint
        console.log(response)
        setEmployees(response.data); // Assuming data is an array of employees
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchEmployees();
  }, []);

  // Delete the employee whenever employeeToDelete is set
  const handleEmployeeDelete = async (id) => {
    console.log("employee id", id);

    try {
      await axios.delete(`http://localhost:5000/deleteemployee/${id}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
      alert("Employee deleted successfully!");
    } catch (err) {
      console.error("Error deleting employee:", err.message);
      alert("Failed to delete employee. Please try again.");
    } finally {
      setEmployeeToDelete(null);
    }
  };

  const handleEmployeeEdit = (id) => {
    console.log('Edit client with ID:', id);
    navigate(`/employee-edit/${id}`); // Adjust navigation route
  };




  const renderStatusBadge = (status) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800",
      "On Leave": "bg-yellow-100 text-yellow-800",
      Resigned: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || "bg-gray-100"
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return <div className="text-center mt-20">Loading employee data...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-10 text-center mt-20">
        Employee Details
      </h2>
      

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
              <th className="p-4 text-left font-semibold text-gray-600">
                S.No
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Profile Picture
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Emp ID
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Name
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Designation
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Department
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">DOB</th>
              <th className="p-4 text-left font-semibold text-gray-600">DOJ</th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Status
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Created Date
              </th>
              <th className="p-4 text-center font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  <img
                    src={employee.imageUrl}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </td>
                <td className="p-4">{employee.empId}</td>
                <td className="p-4">{employee.name}</td>
                <td className="p-4">{employee.designation}</td>
                <td className="p-4">{employee.department}</td>
                <td className="p-4">{employee.dob}</td>
                <td className="p-4">{employee.doj}</td>
                <td className="p-4">{renderStatusBadge(employee.status)}</td>
                <td className="p-4">{employee.createdDate}</td>
                <td className="p-4">
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
                      title="View Details"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleEmployeeEdit(employee._id)}
                      className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
                      title="Edit Employee"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleEmployeeDelete(employee._id)} // Set the employee to be deleted
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
