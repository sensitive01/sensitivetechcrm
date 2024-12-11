import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react"; // Only keeping the View icon as an example
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const AttendanceTable = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch attendance records from the backend
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch("http://localhost:3000/attendance/attendance-all");
                if (!response.ok) {
                    throw new Error("Failed to fetch attendance data.");
                }
                const data = await response.json();
                setAttendanceRecords(data); // Assuming backend sends an array of records
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-bold mb-20 text-center mt-24">Attendance Records</h2>

            {/* Button Section with Link */}
            <div className="flex justify-end mb-4">
                <Link
                    to="/attendance-form"
                    className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600 mb-6"
                >
                    <FaPlus className="mr-2" />
                    Add Attendance
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                {loading ? (
                    <p className="text-center p-6">Loading attendance records...</p>
                ) : error ? (
                    <p className="text-center text-red-500 p-6">Error: {error}</p>
                ) : attendanceRecords.length === 0 ? (
                    <p className="text-center p-6">No attendance records found.</p>
                ) : (
                    <table className="w-full">
                        <thead className="bg-blue-50 border-b">
                            <tr>
                                <th className="p-6 text-left">S.No</th>
                                <th className="p-6 text-left">Employee ID</th>
                                <th className="p-6 text-left">Name</th>
                                <th className="p-6 text-left">Photo</th>
                                <th className="p-6 text-left">Status</th>
                                <th className="p-6 text-left">Date</th>
                                <th className="p-6 text-left">Login Time</th>
                                <th className="p-6 text-left">Logout Time</th>
                                {/* <th className="p-6 text-center">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceRecords.map((record, index) => (
                                <tr key={record.id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-6">{record.empid}</td>
                                    <td className="p-6">{record.name}</td>
                                    <td className="p-6">
                                        <img
                                            src={record.photo || "https://via.placeholder.com/150"}
                                            alt="Employee"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="p-6">
                                        {record.createdAt ? "Present" : "Absent"}
                                    </td>
                                    <td className="p-6 p-6 whitespace-nowrap">
                                        {new Intl.DateTimeFormat('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: '2-digit',
                                        }).format(new Date(record.createdAt))}
                                    </td>
                                    <td className="p-6">
                                        {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>

                                    <td className="p-6">{record.logouttime}</td>
                                    {/* <td className="p-3">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
                        title="Edit Attendance"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                        title="Delete Attendance"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AttendanceTable;
