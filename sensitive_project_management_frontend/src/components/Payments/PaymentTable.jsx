import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import * as XLSX from 'xlsx';
import { FaFileDownload, FaFilter } from 'react-icons/fa';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { getTotalPayments } from '../../api/services/projectServices';

const PaymentTable = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Initialize useNavigate hook

    // Fetch payment data
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                // Replace with your actual API call
                const response = await getTotalPayments();
                console.log("total payment fetched:", response);

                if (response.status === 200) {
                    // Ensure payments is an array
                    const paymentData = Array.isArray(response.data) ? response.data : response.data.payments || [];
                    setPayments(paymentData);
                } else {
                    console.error("Failed to fetch payment details:", response.status);
                }
            } catch (error) {
                console.error("Error fetching payment details:", error);
                setError('Failed to load payment data');
            } finally {
                setLoading(false);
            }
        };
        fetchPaymentData();
    }, []);

    // Download table as Excel file
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(payments); // Convert data to sheet
        const workbook = XLSX.utils.book_new(); // Create new workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payments"); // Add sheet to workbook
        XLSX.writeFile(workbook, "payments.xlsx"); // Download Excel file
    };

    // Define columns for react-table
    const columns = useMemo(() => [
        { Header: 'S.No', accessor: (row, index) => index + 1 },
        { Header: 'Project', accessor: 'project' },
        { Header: 'Payment Type', accessor: 'paymentType' },
        { Header: 'Amount', accessor: 'amount' },
        { Header: 'Mode', accessor: 'mode' },
        {
            Header: 'Date', accessor: 'date',
            Cell: ({ value }) => new Date(value).toLocaleDateString('en-GB') // Use 'en-GB' locale
        },
        { Header: 'TDS Applicable', accessor: 'tdsApplicable' },
        { Header: 'Tax Applicable', accessor: 'taxApplicable' },
        { Header: 'Payment Reference Number', accessor: 'paymentReferenceNumber' },
        { Header: 'Payment Quotation', accessor: 'paymentQuotation' },
        { Header: 'Payment Proof', accessor: 'paymentProof' },
        { Header: 'Notes', accessor: 'notes' }
    ], [payments]);

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
            data: payments,
            initialState: { pageSize: 10 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex } = state;

    // Ensure payments are loaded correctly
    console.log("Payments before rendering:", payments);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-6 mt-12">
            <h2 className="text-4xl font-bold mb-10 text-center mt-24">
                Add Payment
            </h2>

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
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate('/payments-form')} // Navigate to /payments-form on click
                            className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600"
                        >
                            Add Payment
                        </button>
                        <button onClick={downloadExcel} className="bg-green-500 text-white px-6 py-2 rounded flex items-center hover:bg-green-600">
                            <FaFileDownload className="mr-2" /> Export Data
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    {payments.length === 0 ? (
                        <p className="text-center p-6">No payment records found.</p>
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

export default PaymentTable;
