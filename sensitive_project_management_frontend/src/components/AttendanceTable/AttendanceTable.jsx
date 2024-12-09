import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const AttendanceTable = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([
        {
            id: 1,
            empid: "Emp123",
            photo: "https://via.placeholder.com/150",
            type: "login",
            date: "2023-12-08",
            logintime: "09:00 AM",
            logouttime:"6:00 AM",
        },
        {
            id: 2,
            empid: "Emp543",
            photo: "https://via.placeholder.com/150",
            type: "logout",
            date: "2023-12-08",
            logintime: "09:00 AM",
            logouttime:"6:00 AM",
        },
        {
            id: 3,
            empid: "Emp607",
            photo: "https://via.placeholder.com/150",
            type: "login",
            date: "2023-12-08",
            logintime: "09:00 AM",
            logouttime:"6:00 AM",
        },
        {
            id: 4,
            empid: "Emp978",
            photo: "https://via.placeholder.com/150",
            type: "logout",
            date: "2023-12-09",
            logintime: "09:00 AM",
            logouttime:"6:00 AM",
        },
        {
            id: 5,
            empid: "Emp678",
            photo: "https://via.placeholder.com/150",
            type: "login",
            date: "2023-12-09",
            logintime: "09:00 AM",
            logouttime:"6:00 AM",
        },
    ]);

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
                <table className="w-full">
                    <thead className="bg-blue-50 border-b">
                        <tr>
                            <th className="p-6 text-left">S.No</th>
                            <th className="p-6 text-left">Employee ID</th>
                            <th className="p-6 text-left">Photo</th>
                            <th className="p-6 text-left">Type</th>
                            <th className="p-6 text-left">Date</th>
                            <th className="p-6 text-left">LoginTime</th>
                            <th className="p-6 text-left">LogoutTime</th>
                            <th className="p-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceRecords.map((record, index) => (
                            <tr key={record.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-6">{record.empid}</td>
                                <td className="p-6">
                                    <img
                                        src={record.photo}
                                        alt="Employee"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </td>
                                <td className="p-6">{record.type}</td>
                                <td className="p-6">{record.date}</td>
                                <td className="p-6">{record.logintime}</td>
                                <td className="p-6">{record.logouttime}</td>
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
                                            title="Edit Attendance"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                                            title="Delete Attendance"
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

export default AttendanceTable;
