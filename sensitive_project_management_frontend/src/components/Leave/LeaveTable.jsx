import React, { useState, useMemo, useEffect } from 'react';
import {
    useTable,
    useGlobalFilter,
    useSortBy,
    usePagination
} from 'react-table';
import { Edit, Trash2 } from 'lucide-react';
import { FaPlus, FaFileDownload, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const LeaveTable = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('https://sensitivetechcrm.onrender.com/leaves/get-all');
                setLeaves(response.data);
            } catch (err) {
                setError("Failed to load leave data");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaves();
    }, []);

    const handleStatusChange = async (leaveId, newStatus) => {
        try {
            const response = await axios.put(`https://sensitivetechcrm.onrender.com/leaves/update-status/${leaveId}`, {
                status: newStatus,
                statusChangeDate: new Date().toISOString()
            });

            if (response.status === 200) {
                setLeaves(leaves.map(leave =>
                    leave._id === leaveId
                        ? { ...leave, status: newStatus, statusChangeDate: new Date().toISOString() }
                        : leave
                ));
            }
        } catch (err) {
            setError('Failed to update status');
        }
    };

    const handleDelete = async (leaveId) => {
        if (window.confirm('Are you sure you want to delete this leave?')) {
            try {
                const response = await axios.delete(`https://sensitivetechcrm.onrender.com/leaves/delete/${leaveId}`);
                if (response.status === 200) {
                    setLeaves(leaves.filter((leave) => leave._id !== leaveId));
                }
            } catch (err) {
                setError('Failed to delete leave');
            }
        }
    };

    const handleEdit = (leaveId) => {
        navigate(`/leave-edit/${leaveId}`);
    };

    const exportToExcel = () => {
        const exportData = leaves.map((leave, index) => ({
            'S.No': index + 1,
            'Leave ID': leave.leaveId,
            'Name': leave.employee,
            'Running Projects': leave.runningProjects,
            'Leave Dates': leave.leaveDates,
            'Notes': leave.notes,
            'Status': leave.status,
            'Approved By': leave.approvedBy,
            'Status Change Date': leave.statusChangeDate,
            'Leave Applied On': leave.leaveAppliedOn
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Records");
        XLSX.writeFile(workbook, `Leave_Records_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const columns = useMemo(() => [
        {
            Header: 'S.No',
            accessor: (row, index) => index + 1,
        },
        {
            Header: 'Leave ID',
            accessor: 'leaveId',
        },
        {
            Header: 'Name',
            accessor: 'employee',
        },
        {
            Header: 'Running Projects',
            accessor: 'runningProjects',
        },
        {
            Header: 'Leave Dates',
            accessor: 'leaveDates',
        },
        {
            Header: 'Notes',
            accessor: 'notes',
        },
        {
            Header: 'Attachment',
            accessor: 'attachment',
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => (
                <select
                    value={row.original.status}
                    onChange={(e) => handleStatusChange(row.original._id, e.target.value)}
                    className={`
                        px-3 py-1 rounded text-sm border
                        ${row.original.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
                            row.original.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                'bg-red-100 text-red-800 border-red-200'}
                    `}
                >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            )
        },
        {
            Header: 'Approved By',
            accessor: 'approvedBy',
        },
        {
            Header: 'Status Change Date',
            accessor: 'statusChangeDate',
        },
        {
            Header: 'Leave Applied On',
            accessor: 'leaveAppliedOn',
        },
        {
            Header: 'Actions',
            accessor: '_id',
            Cell: ({ row }) => (
                <div className="flex justify-center space-x-2">
                    <button
                        className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
                        title="Edit Leave"
                        onClick={() => handleEdit(row.original._id)}
                    >
                        <Edit size={20} />
                    </button>
                    <button
                        className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                        title="Delete Leave"
                        onClick={() => handleDelete(row.original._id)}
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
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
            data: leaves,
            initialState: { pageSize: 10 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex } = state;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-bold mb-10 text-center mt-24">Leave Details</h2>

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
                        to="/leave"
                        className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600"
                    >
                        <FaPlus className="mr-2" />
                        Add Leave
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                {leaves.length === 0 ? (
                    <p className="text-center p-4">No leave records found.</p>
                ) : (
                    <>
                        <table {...getTableProps()} className="w-full">
                            <thead className="bg-[#2563eb] text-white border-b">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="p-4 text-left cursor-pointer whitespace-nowrap" // Added whitespace-nowrap
                                            >
                                                <div className="flex items-center">
                                                    {column.render("Header")}
                                                    <span>
                                                        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
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
                                                    className="p-4"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

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

export default LeaveTable;