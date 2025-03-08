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
    if (payrollData.length > 0) {
      applyMonthFilter(activeFilter);
    }
  }, [payrollData, activeFilter]);

  const fetchPayrollData = async () => {
    try {
      const response = await axios.get('https://sensitivetechcrm.onrender.com/allemployeesdata');
      if (response.data.success) {
        console.log('Raw API data:', response.data.data);
        setPayrollData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching payroll data:', error);
    }
  };

  const applyMonthFilter = (filter) => {
    let result = [];

    if (filter === 'current') {
      result = payrollData
        .filter(employee => employee.currentMonth)
        .map((employee, index) => ({
          serial: index + 1,
          name: employee.name || '',
          empId: employee.empId || '',
          department: employee.department || '',
          totalDays: employee.currentMonth?.totalDays || 0,
          workingDays: employee.currentMonth?.workingDays || 0,
          salary: employee.salary || 0,
          present: employee.currentMonth?.present || 0,
          absent: employee.currentMonth?.absent || 0,
          lateDays: employee.currentMonth?.lateDays || 0,
          lateTime: employee.currentMonth?.lateTime || '0h 0m',
          allowances: employee.currentMonth?.totalAllowances || 0,
          deductions: employee.currentMonth?.totalDeductions || 0,
          advances: employee.currentMonth?.totalAdvances || 0,
          payable: employee.currentMonth?.payable || 0
        }));
    } else if (filter === 'previous') {
      result = payrollData
        .filter(employee => employee.previousMonth)
        .map((employee, index) => ({
          serial: index + 1,
          name: employee.name || '',
          empId: employee.empId || '',
          department: employee.department || '',
          totalDays: employee.previousMonth?.totalDays || 0,
          workingDays: employee.previousMonth?.workingDays || 0,
          salary: employee.salary || 0,
          present: employee.previousMonth?.present || 0,
          absent: employee.previousMonth?.absent || 0,
          lateDays: employee.previousMonth?.lateDays || 0,
          lateTime: employee.previousMonth?.lateTime || '0h 0m',
          allowances: employee.previousMonth?.totalAllowances || 0,
          deductions: employee.previousMonth?.totalDeductions || 0,
          advances: employee.previousMonth?.totalAdvances || 0,
          payable: employee.previousMonth?.payable || 0
        }));
    }

    console.log(`Filtered ${filter} month data:`, result);
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
    const monthLabel = activeFilter === 'current' ? 'Current' : 'Previous';
    
    const exportData = filteredData.map(item => ({
      'Name': item.name,
      'Employee ID': item.empId,
      'Department': item.department,
      'Working Days': item.workingDays || 0,
      'Total Days': item.totalDays || 0,
      'Salary': item.salary || 0,
      'Present': item.present || 0,
      'Absent': item.absent || 0,
      'Late Days': item.lateDays || 0,
      'Late Time': item.lateTime || '0h 0m',
      'Allowances': item.allowances || 0,
      'Deductions': item.deductions || 0,
      'Advance': item.advances || 0,
      'Payable': item.payable || 0
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${monthLabel} Month Payroll`);
    XLSX.writeFile(workbook, `Payroll_Data_${monthLabel}_Month_${new Date().toISOString().split('T')[0]}.xlsx`);
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
        <h1 className="text-2xl font-semibold text-gray-800">
          Payroll Table - {activeFilter === 'current' ? currentMonthName : previousMonthName}
        </h1>
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
          <button 
            onClick={exportToExcel} 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export Data
          </button>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-white">Late Time</th>
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
                  <td className="px-6 py-4 text-sm text-gray-900">{row.lateTime}</td>
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
              <tr>
                <td colSpan={14} className="px-6 py-4 text-center text-sm text-gray-500">
                  No data available for {activeFilter === 'current' ? 'current' : 'previous'} month
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white'
              }`}
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollEmployee;