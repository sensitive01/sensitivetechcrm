import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const LeaveTable = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Doe",
      runningProjects: "Project A, Project B",
      leaveDates: "2024-12-01 to 2024-12-05",
      notes: "Sick leave, needs rest",
      attachment: "medical_certificate.pdf",
      status: "Approved",
      approvedBy: "Manager",
      statusChangeDate: "2024-12-01",
      leaveAppliedOn: "2024-11-30",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Jane Smith",
      runningProjects: "Project C",
      leaveDates: "2024-12-10 to 2024-12-15",
      notes: "Vacation leave",
      attachment: "vacation_plan.pdf",
      status: "Pending",
      approvedBy: "HR",
      statusChangeDate: "2024-12-05",
      leaveAppliedOn: "2024-12-01",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Alice Johnson",
      runningProjects: "Project D, Project E",
      leaveDates: "2024-12-12 to 2024-12-13",
      notes: "Emergency leave",
      attachment: "emergency_document.pdf",
      status: "Rejected",
      approvedBy: "Manager",
      statusChangeDate: "2024-12-03",
      leaveAppliedOn: "2024-12-02",
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-20 text-center mt-24">Employee Leave Details</h2>

      {/* Button Section */}
      <div className="flex justify-end mb-4">
        <Link
          to="/leave" // Link to the Employee Form page
          className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600 mb-6"
        >
          <FaPlus className="mr-2" />
          Add Leave
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-50 border-b">
            <tr>
              <th className="p-6 text-left">S.No</th>
              <th className="p-6 text-left whitespace-nowrap">Employee ID</th>
              <th className="p-6 text-left">Name</th>
              <th className="p-6 text-left whitespace-nowrap">Running Projects</th>
              <th className="p-6 text-left whitespace-nowrap">Leave Dates</th>
              <th className="p-6 text-left">Notes</th>
              <th className="p-6 text-left">Attachment</th>
              <th className="p-6 text-left">Status</th>
              <th className="p-6 text-left whitespace-nowrap">Approved By</th>
              <th className="p-6 text-left whitespace-nowrap">Status Change Date</th>
              <th className="p-6 text-left whitespace-nowrap">Leave Applied On</th>
              <th className="p-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3">{index + 1}</td>
                <td className="p-6">{employee.employeeId}</td>
                <td className="p-6 whitespace-nowrap">{employee.name}</td>
                <td className="p-6 whitespace-nowrap">{employee.runningProjects}</td>
                <td className="p-6 whitespace-nowrap">{employee.leaveDates}</td>
                <td className="p-6 whitespace-nowrap">{employee.notes}</td>
                <td className="p-6 whitespace-nowrap">{employee.attachment}</td>
                <td className="p-6">{employee.status}</td>
                <td className="p-6">{employee.approvedBy}</td>
                <td className="p-6">{employee.statusChangeDate}</td>
                <td className="p-6">{employee.leaveAppliedOn}</td>
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

export default LeaveTable;
