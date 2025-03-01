// controllers/employeeController.js
const Employee = require("../models/employeeSchema");
const LeaveModel = require("../models/leaveModel");
const Payroll = require('../models/payrollModel');
const AttendanceModel = require('../models/attendanceModel');
const { uploadImage } = require("../config/cloudinary");
const axios = require('axios');

// Create Employee
const createEmployee = async (req, res) => {
  try {
    console.log("Creating employee", req.body);

    const employeeData = req.body;

    // Process uploaded files
    if (req.files) {
      if (req.files.profileImage) {
        employeeData.profileImage = await uploadImage(req.files.profileImage[0].buffer);
      }
      if (req.files.addressProofFile) {
        employeeData.addressProofFile = await uploadImage(req.files.addressProofFile[0].buffer);
      }
      if (req.files.idProofFile) {
        employeeData.idProofFile = await uploadImage(req.files.idProofFile[0].buffer);
      }
      if (req.files.resume) {
        employeeData.resume = await uploadImage(req.files.resume[0].buffer);
      }
    }

    const newEmployee = new Employee(employeeData);
    await newEmployee.save();

    res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      // role: { $nin: ['Superadmin', 'Lead'] }
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Process uploaded files
    if (req.files) {
      if (req.files.profileImage) {
        updatedData.profileImage = await uploadImage(req.files.profileImage[0].buffer);
      }
      if (req.files.addressProofFile) {
        updatedData.addressProofFile = await uploadImage(req.files.addressProofFile[0].buffer);
      }
      if (req.files.idProofFile) {
        updatedData.idProofFile = await uploadImage(req.files.idProofFile[0].buffer);
      }
      if (req.files.resume) {
        updatedData.resume = await uploadImage(req.files.resume[0].buffer);
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete({ _id: id });
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully", employee: deletedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get employee names with role "employee"
const getEmployeeNames = async (req, res) => {
  try {
    const employees = await Employee.find({ role: "employee" }).select("name");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// Get total employee count
const getTotalEmployees = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    res.status(200).json({ TotalEmployee: totalEmployees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch address details by pincode
const fetchAddressDetailsByPincode = async (pincode) => {
  try {
    const response = await axios.get(`https://api.zippopotam.us/in/${pincode}`);

    // Validate response structure
    if (response.data && Array.isArray(response.data.places) && response.data.places.length > 0) {
      const { "place name": area, state, country } = response.data.places[0];
      const city = state || area;

      return {
        area: area || "Unknown Area",
        city,
        state: state || "Unknown State",
        country: country || "India",
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 404) {
      throw new Error("Invalid Pincode: Address details not found.");
    } else {
      throw new Error("Failed to fetch address details. Please try again later.");
    }
  }
};

// Get employee details by ID
const getEmployeeDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id, 'name email password empId');

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to get the current month's date range
const getCurrentMonthDateRange = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { firstDay, lastDay };
};

// Get all employees with comprehensive data
const getAllEmployeesWithData = async (req, res) => {
  try {
    // Get current month date range
    const { firstDay, lastDay } = getCurrentMonthDateRange();
    
    // Fetch all employees
    const employees = await Employee.find({});
    
    // Prepare response array
    const results = await Promise.all(employees.map(async (employee) => {
      // Get employee base info
      const employeeData = {
        name: employee.name,
        empId: employee.empId,
        department: employee.department,
      };
      
      // Get attendance data for current month
      const attendanceRecords = await AttendanceModel.find({
        employeeId: employee.empId,
        date: { $gte: firstDay, $lte: lastDay }
      });
      
      // Calculate attendance metrics
      const present = attendanceRecords.filter(record => record.status === 'Present').length;
      const absent = attendanceRecords.filter(record => record.status === 'Absent').length;
      
      // Calculate late days and minutes
      let lateDays = 0;
      let lateMins = 0;
      
      attendanceRecords.forEach(record => {
        if (record.status === 'Present' && record.logintime) {
          const loginTime = record.logintime;
          // Assuming company start time is 9:00 AM, adjust as needed
          const startTime = "09:00";
          
          if (loginTime > startTime) {
            lateDays++;
            
            // Calculate late minutes (simplified version)
            const loginHour = parseInt(loginTime.split(':')[0]);
            const loginMin = parseInt(loginTime.split(':')[1]);
            const startHour = parseInt(startTime.split(':')[0]);
            const startMin = parseInt(startTime.split(':')[1]);
            
            lateMins += (loginHour - startHour) * 60 + (loginMin - startMin);
          }
        }
      });
      
      // Calculate working days
      const workingDays = present + absent;
      
      // Get payroll adjustments
      const allowances = await Payroll.find({
        empId: employee.empId,
        type: 'Allowance'
      });
      
      const deductions = await Payroll.find({
        empId: employee.empId,
        type: 'Deduction'
      });
      
      const advances = await Payroll.find({
        empId: employee.empId,
        type: 'Advance'
      });
      
      // Calculate total amounts
      const totalAllowances = allowances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
      const totalDeductions = deductions.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
      const totalAdvances = advances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
      
      // Get leave information
      const leaves = await LeaveModel.find({
        employee: employee.empId,
        startDate: { $gte: firstDay, $lte: lastDay }
      });
      
      // Calculate base salary (placeholder - adjust as needed)
      const baseSalary = 0; // This would come from your salary structure or configuration
      
      // Calculate payable amount
      const payable = baseSalary + totalAllowances - totalDeductions - totalAdvances;
      
      // Combine all data
      return {
        ...employeeData,
        workingDays,
        baseSalary,
        present,
        absent,
        lateDays,
        lateMins,
        allowances: totalAllowances,
        deductions: totalDeductions,
        advances: totalAdvances,
        payable,
        leaves: leaves.length
      };
    }));
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
    
  } catch (error) {
    console.error('Error fetching employee data:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeNames,
  getTotalEmployees,
  fetchAddressDetailsByPincode,
  getEmployeeDetailsById,
  getAllEmployeesWithData
};