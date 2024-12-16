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

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchTasks = async () => {
          try {
              const response = await axios.get('http://localhost:3000/task/getalltask');
              // Adjust timeline and date fields
              const updatedTasks = response.data.tasks.map(task => {
                  // Set timeline to current date/time only if it's not already set
                  if (!task.timeline) {
                      task.timeline = new Date().toLocaleString();
                  }
  
                  // Format timeline to show only the time (HH:mm)
                  if (task.timeline) {
                      const timeObj = new Date(task.timeline);
                      task.timeline = timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  }
  
                  // Format date to dd/mm/yy
                  if (task.date) {
                      const dateObj = new Date(task.date);
                      task.date = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear().toString().slice(-2)}`;
                  }
  
                  return task;
              });
  
              setTasks(updatedTasks); // Accessing the tasks array
          } catch (err) {
              setError("Failed to load task data");
          } finally {
              setLoading(false);
          }
      };
  
      fetchTasks();
  }, []);
  



    // Delete task
    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await axios.delete(`http://localhost:3000/task/deletetask/${taskId}`);
                if (response.status === 200) {
                    // Successfully deleted, update the state
                    setTasks(tasks.filter((task) => task._id !== taskId));
                }
            } catch (err) {
                setError('Failed to delete task');
            }
        }
    };

    // Edit task function (redirect to the task edit form)
    const handleEdit = (taskId) => {
        navigate(`/task-edit/${taskId}`);
    };

    // Export to Excel
    const exportToExcel = () => {
        const exportData = tasks.map((task, index) => ({
            'S.No': index + 1,
            'Task ID': task._id,
            'Task Name': task.task,
            'Project': task.project,
            'Employee': task.empId,
            'Description': task.description,
            'Timeline': task.timeline,
            'Date': task.date,
            'Status': task.status
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Task Records");
        XLSX.writeFile(workbook, `Task_Records_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // Define columns for react-table
    const columns = useMemo(() => [
        {
            Header: 'S.No',
            accessor: (row, index) => index + 1,
        },
        {
            Header: 'Task Name',
            accessor: 'task',
        },
        {
            Header: 'Project',
            accessor: 'project',
        },
        {
            Header: 'Employee',
            accessor: 'empId',
        },
        {
            Header: 'Description',
            accessor: 'description',
        },
        {
            Header: 'Timeline',
            accessor: 'timeline',
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Actions',
            accessor: '_id',
            Cell: ({ row }) => (
                <div className="flex justify-center space-x-2">
                    <button
                        className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
                        title="Edit Task"
                        onClick={() => handleEdit(row.original._id)}
                    >
                        <Edit size={20} />
                    </button>
                    <button
                        className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                        title="Delete Task"
                        onClick={() => handleDelete(row.original._id)}
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            )
        }
    ], [tasks]);

    // Initialize react-table
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
            data: tasks,
            initialState: { pageSize: 10 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex } = state;

    // Loading and Error States
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
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-bold mb-10 text-center mt-24">Task Details</h2>

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
                        to="/task-form"
                        className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600"
                    >
                        <FaPlus className="mr-2" />
                        Add Task
                    </Link>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                {tasks.length === 0 ? (
                    <p className="text-center p-6">No task records found.</p>
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

export default TaskList;
