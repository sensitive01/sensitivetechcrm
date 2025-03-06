import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Edit } from 'lucide-react';

const PayrollEmployee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [payrollData, setPayrollData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('current'); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayrollData();
  }, []);

  useEffect(() => {
    applyMonthFilter(activeFilter);
  }, [payrollData, activeFilter]);

  const fetchPayrollData = async () => {
    try {
      const response = await axios.get('https://sensitivetechcrm.onrender.com/allemployeesdata');
      if (response.data.success) {
        setPayrollData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching payroll data:', error);
    }
  };

  const applyMonthFilter = (filter) => {
    let result = [];

    if (filter === 'current') {
      result = payrollData.map((employee, index) => ({
        serial: index + 1,
        ...employee,
        ...employee.currentMonth,
        allowances: employee.currentMonth.totalAllowances,
        deductions: employee.currentMonth.totalDeductions,
        advances: employee.currentMonth.totalAdvances,
      }));
    } else if (filter === 'previous') {
      result = payrollData.map((employee, index) => ({
        serial: index + 1,
        ...employee,
        ...employee.previousMonth,
        allowances: employee.previousMonth.totalAllowances,
        deductions: employee.previousMonth.totalDeductions,
        advances: employee.previousMonth.totalAdvances,
      }));
    }

    setFilteredData(result);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCurrentMonth = () => {
    setActiveFilter('current');
  };

  const handlePreviousMonth = () => {
    setActiveFilter('previous');
  };

  const exportToExcel = () => {
    const exportData = filteredData.map(item => ({
      'Name': item.name,
      'Employee ID': item.empId,
      'Department': item.department,
      'Working Days': item.workingDays,
      'Salary': item.salary,
      'Present': item.present,
      'Absent': item.absent,
      'Late Days': item.lateDays,
      'Late Mins': item.lateMins,
      'Allowances': item.allowances,
      'Deductions': item.deductions,
      'Advance': item.advances,
      'Payable': item.payable
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payroll Data');
    XLSX.writeFile(workbook, `Payroll_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
  };


  const getMonthName = (monthOffset = 0) => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthOffset);
    return date.toLocaleString('default', { month: 'long' });
  };

  const currentMonthName = getMonthName(0);
  const previousMonthName = getMonthName(1);

  const handleEdit = (empId) => {
    navigate(`/payroll-form/${empId}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4 mt-24">
        <h1 className="text-2xl font-semibold text-gray-800">Payroll Table</h1>
        <div className="flex space-x-2">
          <button 
            onClick={handlePreviousMonth} 
            className={`px-4 py-2 rounded ${activeFilter === 'previous' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {previousMonthName}
          </button>
          <button 
            onClick={handleCurrentMonth} 
            className={`px-4 py-2 rounded ${activeFilter === 'current' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {currentMonthName}
          </button>
                    <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded">Export Data</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Total Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Present</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Absent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Late Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Late Mins</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Allowances</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Advance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Payable</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.serial}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className="font-medium">{row.name}</span>
                    <br />
                    <span className="text-xs text-gray-700">EMPID: {row.empId}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.totalDays}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.salary}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.present}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.absent}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.lateDays}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.lateMins}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.allowances}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.deductions}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.advances}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.payable}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <button 
                      onClick={() => handleEdit(row.empId)} 
                      className="text-blue-600 hover:text-blue-900"
                    >
                       <Edit size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={11} className="px-6 py-4 text-center text-sm text-gray-500">No data available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollEmployee;