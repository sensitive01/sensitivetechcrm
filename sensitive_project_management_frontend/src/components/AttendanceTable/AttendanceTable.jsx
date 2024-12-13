import React, { useState, useMemo, useEffect } from "react";
import { 
    useTable, 
    useGlobalFilter, 
    useSortBy, 
    usePagination 
} from 'react-table';
import { FaPlus, FaFileDownload, FaFilter, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';

const AttendanceTable = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch("http://localhost:3000/attendance/attendance-all");
                if (!response.ok) {
                    throw new Error("Failed to fetch attendance data.");
                }
                const data = await response.json();
                
                // Sort records by most recent first
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setAttendanceRecords(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    const handleLogoutTimeUpdate = async (recordId) => {
        const record = attendanceRecords.find((rec) => rec._id === recordId);
        if (record.logouttime) {
            alert("Logout time has already been set.");
            return;
        }

        const logoutTime = new Date().toLocaleTimeString();

        try {
            const response = await fetch(`http://localhost:3000/attendance/logout/${recordId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ logouttime: logoutTime }),
            });

            if (!response.ok) {
                throw new Error("Failed to update logout time.");
            }

            setAttendanceRecords((prevRecords) =>
                prevRecords.map((record) =>
                    record._id === recordId ? { ...record, logouttime: logoutTime } : record
                )
            );
        } catch (err) {
            console.error("Error updating logout time:", err);
            alert("Failed to update logout time. Please try again.");
        }
    };

    const exportToExcel = () => {
        // Prepare data for export
        const exportData = attendanceRecords.map((record, index) => ({
            'S.No': index + 1,
            'Employee ID': record.employeeId,
            'Name': record.employeeName,
            'Status': record.createdAt ? 'Present' : 'Absent',
            'Date': new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }).format(new Date(record.createdAt)),
            'Login Time': new Date(record.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            'Logout Time': record.logouttime || 'Not Set'
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        
        // Create workbook and add worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Records");
        
        // Export to Excel file
        XLSX.writeFile(workbook, `Attendance_Records_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const columns = useMemo(() => [
        {
            Header: 'S.No',
            accessor: (row, index) => index + 1,
        },
        {
            Header: 'Employee ID',
            accessor: 'employeeId',
        },
        {
            Header: 'Name',
            accessor: 'employeeName',
        },
        {
            Header: 'Photo',
            accessor: 'photo',
            Cell: ({ row }) => (
                <img
                    src={row.original.photo || "https://via.placeholder.com/150"}
                    alt="Employee"
                    className="w-12 h-12 rounded-full object-cover"
                />
            )
        },
        {
            Header: 'Status',
            accessor: row => row.createdAt ? 'Present' : 'Absent',
        },
        {
            Header: 'Date',
            accessor: row => new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }).format(new Date(row.createdAt)),
        },
        {
            Header: 'Login Time',
            accessor: row => new Date(row.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        },
        {
            Header: 'Logout Time',
            accessor: 'logouttime',
            Cell: ({ value }) => value || 'Not Set',
        },
        {
            Header: 'Actions',
            accessor: '_id',
            Cell: ({ row }) => (
                !row.original.logouttime ? (
                    <button
                        onClick={() => handleLogoutTimeUpdate(row.original._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Set Logout
                    </button>
                ) : (
                    <span className="text-gray-500">Logout Time Set</span>
                )
            )
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
    } = useTable(
        {
            columns,
            data: attendanceRecords,
            initialState: { pageSize: 10 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex } = state;

    if (loading) return <p className="text-center p-6">Loading attendance records...</p>;
    if (error) return <p className="text-center text-red-500 p-6">Error: {error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-bold mb-10 text-center mt-24">Attendance Records</h2>

            {/* Action Buttons Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={globalFilter || ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search records..."
                            className="border border-blue-500 p-2 rounded w-64 pl-8"
                        />
                        <FaFilter className="absolute left-2 top-3 text-blue-500" />
                    </div>
                </div>
                
                <div className="flex space-x-4">
                    <button 
                        onClick={exportToExcel}
                        className="bg-green-500 text-white px-6 py-2 rounded flex items-center hover:bg-green-600"
                    >
                        <FaFileDownload className="mr-2" />
                        Export Data
                    </button>
                    
                    <Link
                        to="/attendance-form"
                        className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600"
                    >
                        <FaPlus className="mr-2" />
                        Add Attendance
                    </Link>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                {attendanceRecords.length === 0 ? (
                    <p className="text-center p-6">No attendance records found.</p>
                ) : (
                    <>
                        <table {...getTableProps()} className="w-full">
                            <thead className="bg-blue-50 border-b">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th 
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="p-6 text-left cursor-pointer"
                                            >
                                                <div className="flex items-center">
                                                    {column.render('Header')}
                                                    <span>
                                                        {column.isSorted 
                                                            ? (column.isSortedDesc 
                                                                ? ' 🔽' 
                                                                : ' 🔼') 
                                                            : ''}
                                                    </span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr 
                                            {...row.getRowProps()} 
                                            className="border-b hover:bg-gray-50 transition-colors"
                                        >
                                            {row.cells.map(cell => (
                                                <td 
                                                    {...cell.getCellProps()} 
                                                    className="p-6"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center p-4">
                            <div>
                                <span>
                                    Page{' '}
                                    <strong>
                                        {pageIndex + 1} of {pageOptions.length}
                                    </strong>
                                </span>
                            </div>
                            <div className="space-x-2">
                                <button 
                                    onClick={() => previousPage()} 
                                    disabled={!canPreviousPage}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button 
                                    onClick={() => nextPage()} 
                                    disabled={!canNextPage}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AttendanceTable;