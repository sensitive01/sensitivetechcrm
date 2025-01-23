import React, { useState, useMemo, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { FaPlus, FaFileDownload, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';

const LeadTable = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('https://sensitivetechcrm.onrender.com/leads/get-all');
                setLeads(response.data);
            } catch (err) {
                console.error("Error fetching leads:", err);
                setError('Failed to load lead data');
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    const handleDelete = async (leadId) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                const response = await axios.delete(`https://sensitivetechcrm.onrender.com/leads/delete/${leadId}`);
                if (response.status === 200) {
                    setLeads(leads.filter((lead) => lead._id !== leadId));
                }
            } catch (err) {
                console.error("Error deleting lead:", err);
                setError('Failed to delete lead');
            }
        }
    };

    // Edit lead function (redirect to the lead edit form)
    const handleEdit = (leadId) => {
        navigate(`/lead-edit/${leadId}`);
    };

    // Export data to Excel
    const exportToExcel = () => {
        const exportData = leads.map((lead, index) => ({
            'S.No': index + 1,
            'Name': lead.name,
            'Contact': lead.contact,
            'Email': lead.email,
            'Requirements': lead.requirements,
            'Company': lead.company,
            'Location': lead.location,
            'Links': lead.links,
            'Comments': lead.comments,
            'Status': lead.status,
            'Created Date-Time': new Date(lead.createdAt).toLocaleString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Lead Records');
        XLSX.writeFile(workbook, `Lead_Records_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // Define columns for react-table
    const columns = useMemo(() => [
        { Header: 'S.No', accessor: (row, index) => index + 1 },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Contact', accessor: 'contact' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Requirements', accessor: 'requirements' },
        { Header: 'Company', accessor: 'company' },
        { Header: 'Location', accessor: 'location' },
        { Header: 'Links', accessor: 'links' },
        { Header: 'Comments', accessor: 'comments' },
        { Header: 'Status', accessor: 'status' },
        {
            Header: 'Update Log', 
            accessor: 'updateLog',
            Cell: ({ row }) => (
                <Link 
                    to={`/lead-edit/${row.original._id}`} // Link to Update Log page with leadId
                    className="text-center truncate hover:bg-blue-600 mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Update Log
                </Link>
            )
        },
        
        {
            Header: 'Actions',
            accessor: '_id',
            Cell: ({ row }) => (
                <div className="flex justify-center space-x-2">
                    {/* <button className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors" onClick={() => handleEdit(row.original._id)}>
                        <Edit size={20} />
                    </button> */}
                    <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors" onClick={() => handleDelete(row.original._id)}>
                        <Trash2 size={20} />
                    </button>
                </div>
            )
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-bold mb-10 text-center mt-24">Lead Details</h2>

            {/* Action Buttons Section */}
            <div className="flex justify-between items-center mb-4">
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
                <div className="flex space-x-4">
                    <button onClick={exportToExcel} className="bg-green-500 text-white px-6 py-2 rounded flex items-center hover:bg-green-600">
                        <FaFileDownload className="mr-2" /> Export Data
                    </button>
                    <Link to="/lead-form" className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600">
                        <FaPlus className="mr-2" /> Add Lead
                    </Link>
                </div>
            </div>

            {/* Table Container */}
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
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())} className="p-6 text-left cursor-pointer">
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

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center p-4">
                            <div>
                                <span>
                                    Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                                </span>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
                                    Previous
                                </button>
                                <button onClick={() => nextPage()} disabled={!canNextPage} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
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

export default LeadTable;
