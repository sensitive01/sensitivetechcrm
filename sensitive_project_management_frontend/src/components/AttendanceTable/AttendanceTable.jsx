import React, { useState, useMemo, useEffect } from "react";
import {
    useTable,
    useGlobalFilter,
    useSortBy,
    usePagination,
} from "react-table";
import { FaPlus, FaFileDownload, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const AttendanceTable = () => {
    const employeeId = localStorage.getItem("empId");
    const [allAttendanceRecords, setAllAttendanceRecords] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [role, setRole] = useState(localStorage.getItem("role") || "Superadmin");

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch(`https://sensitivetechcrm.onrender.com/attendance/attendance-all/${employeeId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch attendance data.");
                }
                const data = await response.json();
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
                setAllAttendanceRecords(data);
    
                const today = new Date().toISOString().split("T")[0];
    
                if (role === "Superadmin") {
                    setAttendanceRecords(data.filter(record => 
                        new Date(record.createdAt).toISOString().split("T")[0] === today
                    ));
                } else {
                    setAttendanceRecords(data.filter(record => 
                        new Date(record.createdAt).toISOString().split("T")[0] === today
                    ));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAttendance();
    }, [role, employeeId]);


    const handleLogoutTimeUpdate = async (recordId) => {
        const record = attendanceRecords.find((rec) => String(rec._id) === String(recordId));

        if (!record) {
            alert("Unable to find the record. Please refresh the page and try again.");
            return;
        }

        if (record.logouttime) {
            alert("Logout time has already been set.");
            return;
        }

        const logoutTime = new Date().toLocaleTimeString();

        try {
            const response = await fetch(`https://sensitivetechcrm.onrender.com/attendance/logout/${recordId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ logouttime: logoutTime }),
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(`Failed to update logout time: ${message}`);
            }

            setAttendanceRecords((prevRecords) =>
                prevRecords.map((rec) =>
                    rec._id === recordId ? { ...rec, logouttime: logoutTime } : rec
                )
            );

            alert("Logout time updated successfully.");
        } catch (err) {
            alert("Failed to update logout time. Please try again.");
        }
    };

    const exportToExcel = () => {
        const exportData = attendanceRecords.map((record, index) => ({
            "S.No": index + 1,
            "Employee ID": record.empId,
            Name: record.employeeName,
            Status: record.createdAt ? "Present" : "Absent",
            Date: new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }).format(new Date(record.createdAt)),
            "Login Time": new Date(record.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            "Logout Time": record.logouttime || "Not Set",
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Records");
        XLSX.writeFile(workbook, `Attendance_Records_${new Date().toISOString().split("T")[0]}.xlsx`);
    };
    const handleDateFilterChange = () => {
        if (role !== "Superadmin") return;
    
        const filteredData = allAttendanceRecords.filter((record) => {
            const recordDate = new Date(record.createdAt).toISOString().split("T")[0];
            const start = startDate ? new Date(startDate).toISOString().split("T")[0] : null;
            const end = endDate ? new Date(endDate).toISOString().split("T")[0] : null;
    
            if (start && recordDate < start) return false;
            if (end && recordDate > end) return false;
    
            return true;
        });
    
        setAttendanceRecords(filteredData);
    };
    
    
    const handleSearch = (searchValue) => {
        if (role !== "Superadmin") return; 

        setGlobalFilter(searchValue);
    };


    const columns = useMemo(
        () => [
            {
                Header: "S.No",
                accessor: (row, index) => index + 1,
            },
            {
                Header: "Employee ID",
                accessor: "employeeId",
            },
            {
                Header: "Name",
                accessor: "employeeName",
            },
            {
                Header: "Photo",
                accessor: "photo",
                Cell: ({ row }) => (
                    <img
                        src={row.original.photo || "https://via.placeholder.com/150"}
                        alt="Employee"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                ),
            },
            {
                Header: "Status",
                accessor: (row) => (row.createdAt ? "Present" : "Absent"),
            },
            {
                Header: "Date",
                accessor: (row) =>
                    new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                    }).format(new Date(row.createdAt)),
            },
            {
                Header: "Login Time",
                accessor: (row) =>
                    new Date(row.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
            },
            {
                Header: "Logout Time",
                accessor: "logouttime",
                Cell: ({ value }) => value || "Not Set",
            },
            {
                Header: "Actions",
                accessor: "_id",
                Cell: ({ row }) =>
                    !row.original.logouttime ? (
                        <button
                            onClick={() => handleLogoutTimeUpdate(row.original._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Set Logout
                        </button>
                    ) : (
                        <span className="text-gray-500">Logout Time Set</span>
                    ),
            },
        ],
        [attendanceRecords]
    );

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
            initialState: { pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex } = state;

    if (loading) return <p className="text-center p-6">Loading attendance records...</p>;
    if (error) return <p className="text-center text-red-500 p-6">Error: {error}</p>;

    return (
        <div className=" mx-auto p-6">
            <h2 className="text-4xl font-bold mb-10 text-center mt-24">Attendance Records</h2>

            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <input
                        type="text"
                        value={globalFilter || ''}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search records..."
                        className="border border-blue-500 p-2 rounded w-64 pl-8"
                    />

                    <FaFilter className="absolute left-2 top-3 text-blue-500" />
                </div>
                <div className="flex space-x-4 items-center -mt-6">
                    {role === "Superadmin" && (
                        <>
                            <div>
                                <label htmlFor="startDate" className="block">Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}

                                    className="border border-blue-500 p-2 rounded w-32"
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block">End Date</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}

                                    className="border border-blue-500 p-2 rounded w-32"
                                />
                            </div>
                            <button
                                onClick={handleDateFilterChange}
                                className="bg-blue-500 text-white px-6 py-2 rounded h-10 w-auto text-sm mt-6"
                            >
                                Apply Filter
                            </button>
                        </>
                    )}
                </div>


                <div className="flex space-x-4">
                    {role === "Superadmin" && (
                        <button
                            onClick={exportToExcel}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 flex items-center w-auto sm:px-4 sm:py-2 sm:w-auto text-xs sm:text-base flex-shrink-0"
                        >
                            <FaFileDownload className="mr-1" />
                            Export
                        </button>
                    )}

                    <Link
                        to="/attendance-form"
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center w-auto sm:px-4 sm:py-2 sm:w-auto text-xs sm:text-base flex-shrink-0"
                    >
                        <FaPlus className="mr-1" />
                        Add Attendance
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table {...getTableProps()} className="w-full">
                    <thead className="bg-[#2563eb] text-white border-b">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="p-4">
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="border-b">
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} className="p-6">
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="flex justify-between p-4">
                    <span>
                        Page {pageIndex + 1} of {pageOptions.length}
                    </span>
                    <div>
                        <button onClick={previousPage} disabled={!canPreviousPage} className="px-4 py-2">
                            Previous
                        </button>
                        <button onClick={nextPage} disabled={!canNextPage} className="px-4 py-2">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceTable;
