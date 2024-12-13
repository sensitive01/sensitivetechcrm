import React, { useState, useMemo, useEffect } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaFileDownload, FaFilter } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch employee data from an API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true); // Show loader
        const response = await axios.get(
          "http://localhost:3000/getallemployees"
        );
        setEmployees(response.data); // Assuming data is an array of employees
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchEmployees();
  }, []);

  // Define columns for react-table
  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Profile Picture",
        accessor: "imageUrl",
        Cell: ({ value }) => (
          <img src={value} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
        ),
      },
      {
        Header: "Emp ID",
        accessor: "empId",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Designation",
        accessor: "designation",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "DOB",
        accessor: "dob",
      },
      {
        Header: "DOJ",
        accessor: "doj",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              value === "Active"
                ? "bg-green-100 text-green-800"
                : value === "On Leave"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Created Date",
        accessor: "createdDate",
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ row }) => (
          <div className="flex justify-center space-x-2">
            <button
              className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
              title="View Details"
            >
              <Eye size={20} />
            </button>
            <button
              onClick={() => navigate(`/employee-edit/${row.original._id}`)}
              className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
              title="Edit Employee"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => handleEmployeeDelete(row.original._id)}
              className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
              title="Delete Employee"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

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
      data: employees,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  // Handle employee deletion
  const handleEmployeeDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteemployee/${id}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
      alert("Employee deleted successfully!");
    } catch (err) {
      alert("Failed to delete employee.");
    }
  };

  // Export data to Excel
  const exportToExcel = () => {
    const exportData = employees.map((employee, index) => ({
      "S.No": index + 1,
      "Emp ID": employee.empId,
      "Name": employee.contactPerson,
      "Designation": employee.designation,
      "Department": employee.department,
      "DOB": employee.dob,
      "DOJ": employee.doj,
      "Status": employee.status,
      "Created Date": employee.createdDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Records");
    XLSX.writeFile(workbook, `Employee_Records_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  if (loading) {
    return <div className="text-center mt-20">Loading employee data...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-10 text-center mt-20">Employee Details</h2>

      {/* Action Buttons Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search records..."
            className="border border-blue-500 p-2 rounded w-64 pl-8"
          />
          <FaFilter className="absolute left-2 top-3 text-blue-500" />
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
            to="/employee-form"
            className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600"
          >
            <FaPlus className="mr-2" />
            Add Employee
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border">
        <table {...getTableProps()} className="w-full table-auto">
          <thead className="bg-blue-50 border-b">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-4 text-left font-semibold text-gray-600"
                  >
                    <div className="flex items-center">
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b hover:bg-gray-50">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-4">
                      {cell.render("Cell")}
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
              Page{" "}
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
      </div>
    </div>
  );
};

export default EmployeeTable;
