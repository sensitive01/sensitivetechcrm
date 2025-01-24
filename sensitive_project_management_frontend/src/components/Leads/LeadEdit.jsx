import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { FaFileDownload, FaFilter } from 'react-icons/fa';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';

const LeadEdit = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lead, setLead] = useState({
    disposition: "",
    notes: "",
  });

  const dispositionOptions = [
    "No requirements", "Callback", "Busy", "Disconnected", "RNR / Voicemail",
    "Not interested", "Request Quote", "Quotation Sent", "Follow up",
    "Invalid Number", "Taken outside", "Requirement on hold", "Escalated",
    "Schedule Meeting", "Deal Closed", "Others"
  ];

  // Fetch lead data
  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axios.get(
          "https://sensitivetechcrm.onrender.com/updatelog/getdispositions"
        );
        if (response.status === 200) {
          setLeads(response.data);
        } else {
          console.error("Failed to fetch lead details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching lead details:", error);
        setError('Failed to load lead data');
      } finally {
        setLoading(false);
      }
    };
    fetchLeadData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const leadWithDateTime = { ...lead }; // Let the server handle the date and time.

    try {
      const response = await axios.post(
        "https://sensitivetechcrm.onrender.com/updatelog/disposition",
        leadWithDateTime
      );

      if (response.status === 201) {
        alert("Lead data submitted successfully!");
        setLead({ disposition: "", notes: "" });
        setLeads((prev) => [...prev, response.data]);
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting lead data:", error);
      alert(`Submission failed: ${error.message}`);
    }
  };



  // Download table as Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads); // Convert data to sheet
    const workbook = XLSX.utils.book_new(); // Create new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads"); // Add sheet to workbook
    XLSX.writeFile(workbook, "leads.xlsx"); // Download Excel file
  };

  // Define columns for react-table
  const columns = useMemo(() => [
    { Header: 'S.No', accessor: (row, index) => index + 1 },
    { Header: 'Disposition', accessor: 'disposition' },
    { Header: 'Notes', accessor: 'notes' },
    {
      Header: 'Date',
      accessor: 'createdAt',
      Cell: ({ value }) => new Date(value).toLocaleDateString('en-GB'), // Use 'en-GB' locale
      id: 'date'
    },
    {
      Header: 'Time',
      accessor: 'createdAt',
      Cell: ({ value }) => new Date(value).toLocaleTimeString(),
      id: 'time' // Unique identifier for the time column
    }
  ], [leads]);




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
    pageOptions
  } = useTable(
    {
      columns,
      data: leads,
      initialState: { pageSize: 10 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6 mt-12">
      <h2 className="text-4xl font-bold mb-10 text-center mt-24">
        Call Logs
      </h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-6 p-4 rounded bg-[#eff6ff] shadow-lg border border-gray-300 hover:border-gray-500 transition-all"
      >
        <div className="flex-1">
          <label className="block text-sm font-medium pb-2">Disposition:</label>
          <select
            name="disposition"
            value={lead.disposition}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="">Select Disposition</option>
            {dispositionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium pb-2">Notes:</label>
          <textarea
            name="notes"
            value={lead.notes}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 transition-all"
            placeholder="Enter notes here..."
          />
        </div>

        <div className="flex items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Data Table Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
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
          <button onClick={downloadExcel} className="bg-green-500 text-white px-6 py-2 rounded flex items-center hover:bg-green-600">
            <FaFileDownload className="mr-2" /> Export Data
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {leads.length === 0 ? (
            <p className="text-center p-6">No lead records found.</p>
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
                            <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
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
                      <tr {...row.getRowProps()} className="border-b hover:bg-gray-50 transition-colors">
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()} className="p-6">{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-between items-center p-4">
                <div>
                  <span>
                    Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
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
    </div>

  );
};

export default LeadEdit;
