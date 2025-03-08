const Employee = require("../models/employeeSchema");
const LeaveModel = require("../models/leaveModel");
const Payroll = require('../models/payrollModel');
const AttendanceModel = require('../models/attendanceModel');
const { uploadImage } = require("../config/cloudinary");
const axios = require('axios');

const createEmployee = async (req, res) => {
  try {
    console.log("Creating employee", req.body);

    const employeeData = req.body;

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

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
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
// const getEmployeeNames = async (req, res) => {
//   try {
//     const employees = await Employee.find({ role: "employee" }).select("name");
//     res.json(employees);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching employees" });
//   }
// };


const getEmployeeNames = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("User ID:", id);
    const empdata = await Employee.findOne({ _id: id }, { role: 1, name: 1 });

    if (!empdata) {
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("Employee Data:", empdata);

    let employees;
    if (empdata.role === "Superadmin") {
      employees = await Employee.find({}, "name");
    } else {
      employees = [{ name: empdata.name }];
    }

    console.log("Employee Names:", employees);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

const getTotalEmployees = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    res.status(200).json({ TotalEmployee: totalEmployees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAddressDetailsByPincode = async (pincode) => {
  try {
    const response = await axios.get(`https://api.zippopotam.us/in/${pincode}`);

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


const getMonthDateRange = (monthOffset = 0) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + monthOffset;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();

  return { firstDay, lastDay, totalDays };
};

const getAllEmployeesWithData = async (req, res) => {
  try {
    const currentMonthData = getMonthDateRange(0);
    const prevMonthData = getMonthDateRange(-1);

    const employees = await Employee.find({}, 'name empId department salary shiftStartTime shiftEndTime');

    // Debug logging to check date ranges
    console.log("Current Month Date Range:", {
      first: currentMonthData.firstDay.toISOString(),
      last: currentMonthData.lastDay.toISOString()
    });
    console.log("Previous Month Date Range:", {
      first: prevMonthData.firstDay.toISOString(),
      last: prevMonthData.lastDay.toISOString()
    });

    const convertTo24HourFormat = (timeStr) => {
      if (!timeStr) return null;
      
      // Check if already in 24-hour format
      if (!timeStr.includes(" ")) return timeStr;
      
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes, seconds] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };

    const results = await Promise.all(employees.map(async (employee) => {
      const employeeData = {
        name: employee.name,
        empId: employee.empId,
        department: employee.department,
        salary: employee.salary,
      };

      const fetchAttendanceData = async ({ firstDay, lastDay, totalDays }) => {
        const attendanceRecords = await AttendanceModel.find({
          employeeId: employee.empId,
          date: { $gte: firstDay, $lte: lastDay }
        });

        const present = attendanceRecords.filter(record => record.status === 'Present').length;
        const absent = totalDays - present;

        let lateDays = 0, lateMins = 0;
        attendanceRecords.forEach(record => {
          if (record.status === 'Present' && record.logintime) {
            const loginTime = convertTo24HourFormat(record.logintime);
            const shiftStartTime = employee.shiftStartTime || "09:30"; // Default if not set

            if (loginTime && loginTime > shiftStartTime) {
              lateDays++;

              const [loginHour, loginMin] = loginTime.split(':').map(Number);
              const [startHour, startMin] = shiftStartTime.split(':').map(Number);
              let minutesLate = (loginHour * 60 + loginMin) - (startHour * 60 + startMin);

              lateMins += Math.abs(minutesLate);
            }
          }
        });

        const lateHours = Math.floor(lateMins / 60);
        const remainingMins = lateMins % 60;
        const formattedLateTime = lateMins > 0 ? `${lateHours}h ${remainingMins}m` : "0h 0m";

        return {
          totalDays,
          present,
          absent,
          lateDays,
          lateTime: formattedLateTime,
          workingDays: present + absent
        };
      };

      const fetchPayrollData = async (firstDay, lastDay) => {
        try {
          const allowances = await Payroll.find({ 
            empId: employee.name,  // FIXED: Use correct empId
            type: "Allowances",
            createdAt: { $gte: firstDay, $lte: lastDay }
          });
      
          const deductions = await Payroll.find({ 
            empId: employee.name,  // FIXED: Use correct empId
            type: "Deductions",
            createdAt: { $gte: firstDay, $lte: lastDay }
          });
      
          const advances = await Payroll.find({ 
            empId: employee.name,  // FIXED: Use correct empId
            type: "Advance",
            createdAt: { $gte: firstDay, $lte: lastDay }
          });
      
          // Convert amounts to numbers for calculations
          const totalAllowances = allowances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
          const totalDeductions = deductions.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
          const totalAdvances = advances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
      
          let payable = parseFloat(employee.salary || 0);
      
          // Apply deduction first
          payable -= totalDeductions;
      
          // Then apply advances (which should be added to salary)
          payable += totalAdvances;
      
          // Finally, add allowances (bonuses, incentives, etc.)
          payable += totalAllowances;
      
          return { totalAllowances, totalDeductions, totalAdvances, payable };
        } catch (error) {
          console.error("Error fetching payroll data:", error);
          return { totalAllowances: 0, totalDeductions: 0, totalAdvances: 0, payable: parseFloat(employee.salary || 0) };
        }
      };

      const fetchLeaveData = async (firstDay, lastDay) => {
        const leaves = await LeaveModel.find({ 
          employee: employee.empId, 
          startDate: { $gte: firstDay, $lte: lastDay } 
        });
        return leaves.length;
      };

      // Execute all data fetching in parallel for better performance
      const [currentAttendance, prevAttendance, currentPayroll, prevPayroll, currentLeaves, prevLeaves] = 
        await Promise.all([
          fetchAttendanceData(currentMonthData),
          fetchAttendanceData(prevMonthData),
          fetchPayrollData(currentMonthData.firstDay, currentMonthData.lastDay),
          fetchPayrollData(prevMonthData.firstDay, prevMonthData.lastDay),
          fetchLeaveData(currentMonthData.firstDay, currentMonthData.lastDay),
          fetchLeaveData(prevMonthData.firstDay, prevMonthData.lastDay)
        ]);

      return {
        ...employeeData,
        currentMonth: {
          ...currentAttendance,
          ...currentPayroll,
          leaves: currentLeaves
        },
        previousMonth: {
          ...prevAttendance,
          ...prevPayroll,
          leaves: prevLeaves
        }
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

const getEmployeeDataById = async (req, res) => {
  try {
    const { empId } = req.params;
    if (!empId) {
      return res.status(400).json({ success: false, error: "Employee ID is required" });
    }

    const currentMonthData = getMonthDateRange(0);
    const prevMonthData = getMonthDateRange(-1);

    const employee = await Employee.findOne(
      { empId },
      "name empId department salary shiftStartTime shiftEndTime"
    );
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const convertTo24HourFormat = (timeStr) => {
      if (!timeStr) return null;
      
      // Check if already in 24-hour format
      if (!timeStr.includes(" ")) return timeStr;
      
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes, seconds] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };

    const fetchAttendanceData = async ({ firstDay, lastDay, totalDays }, employee) => {
      const attendanceRecords = await AttendanceModel.find({
        employeeId: employee.empId,
        date: { $gte: firstDay, $lte: lastDay },
      });

      const present = attendanceRecords.filter((record) => record.status === "Present").length;
      const absent = totalDays - present;

      let lateDays = 0, lateMins = 0;

      attendanceRecords.forEach((record) => {
        if (record.status === "Present" && record.logintime) {
          const loginTime = convertTo24HourFormat(record.logintime);
          const shiftStartTime = employee.shiftStartTime || "09:30"; // Default if not set

          if (loginTime && loginTime > shiftStartTime) {
            lateDays++;

            const [loginHour, loginMin] = loginTime.split(":").map(Number);
            const [startHour, startMin] = shiftStartTime.split(":").map(Number);
            let minutesLate = (loginHour * 60 + loginMin) - (startHour * 60 + startMin);

            lateMins += Math.abs(minutesLate);
          }
        }
      });

      const lateHours = Math.floor(lateMins / 60);
      const remainingMins = lateMins % 60;
      const formattedLateTime = lateMins > 0 ? `${lateHours}h ${remainingMins}m` : "0h 0m";

      return {
        totalDays,
        present,
        absent,
        lateDays,
        lateTime: formattedLateTime,
        workingDays: present + absent,
      };
    };

    const fetchPayrollData = async (firstDay, lastDay) => {
      try {
        const allowances = await Payroll.find({ 
          empId: employee.name,  // FIXED: Use correct empId
          type: "Allowances",
          createdAt: { $gte: firstDay, $lte: lastDay }
        });
    
        const deductions = await Payroll.find({ 
          empId: employee.name,  // FIXED: Use correct empId
          type: "Deductions",
          createdAt: { $gte: firstDay, $lte: lastDay }
        });
    
        const advances = await Payroll.find({ 
          empId: employee.name,  // FIXED: Use correct empId
          type: "Advance",
          createdAt: { $gte: firstDay, $lte: lastDay }
        });
    
        // Convert amounts to numbers for calculations
        const totalAllowances = allowances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        const totalDeductions = deductions.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        const totalAdvances = advances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    
        let payable = parseFloat(employee.salary || 0);
    
        // Apply deduction first
        payable -= totalDeductions;
    
        // Then apply advances (which should be added to salary)
        payable += totalAdvances;
    
        // Finally, add allowances (bonuses, incentives, etc.)
        payable += totalAllowances;
    
        return { totalAllowances, totalDeductions, totalAdvances, payable };
      } catch (error) {
        console.error("Error fetching payroll data:", error);
        return { totalAllowances: 0, totalDeductions: 0, totalAdvances: 0, payable: parseFloat(employee.salary || 0) };
      }
    };
    

    const fetchLeaveData = async (firstDay, lastDay) => {
      const leaves = await LeaveModel.find({ 
        employee: empId, 
        startDate: { $gte: firstDay, $lte: lastDay } 
      });
      return leaves.length;
    };

    // Execute all data fetching in parallel for better performance
    const [currentAttendance, prevAttendance, currentPayroll, prevPayroll, currentLeaves, prevLeaves] = 
      await Promise.all([
        fetchAttendanceData(currentMonthData, employee),
        fetchAttendanceData(prevMonthData, employee),
        fetchPayrollData(currentMonthData.firstDay, currentMonthData.lastDay),
        fetchPayrollData(prevMonthData.firstDay, prevMonthData.lastDay),
        fetchLeaveData(currentMonthData.firstDay, currentMonthData.lastDay),
        fetchLeaveData(prevMonthData.firstDay, prevMonthData.lastDay)
      ]);

    // Debug logging to check what data is being fetched
    console.log("Current Month Date Range:", {
      first: currentMonthData.firstDay.toISOString(),
      last: currentMonthData.lastDay.toISOString()
    });
    console.log("Previous Month Date Range:", {
      first: prevMonthData.firstDay.toISOString(),
      last: prevMonthData.lastDay.toISOString()
    });
    console.log("Current Month Payroll:", currentPayroll);
    console.log("Previous Month Payroll:", prevPayroll);

    res.status(200).json({
      success: true,
      data: {
        name: employee.name,
        empId: employee.empId,
        department: employee.department,
        salary: employee.salary,
        currentMonth: {
          ...currentAttendance,
          ...currentPayroll,
          leaves: currentLeaves,
        },
        previousMonth: {
          ...prevAttendance,
          ...prevPayroll,
          leaves: prevLeaves,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const updateEmployeeDataById = async (req, res) => {
  try {
    const { empId } = req.params;
    const { 
      name, department, salary, shiftStartTime,
      allowances, deductions, advance,
      attendanceDate, attendanceStatus, logintime, logouttime,
      leaveData
    } = req.body;

    if (!empId) {
      return res.status(400).json({ success: false, error: 'Employee ID is required' });
    }

    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

    // Update basic employee info
    const employeeUpdateData = {};
    if (name !== undefined) employeeUpdateData.name = name;
    if (department !== undefined) employeeUpdateData.department = department;
    if (salary !== undefined) employeeUpdateData.salary = salary;
    if (shiftStartTime !== undefined) employeeUpdateData.shiftStartTime = shiftStartTime;

    if (Object.keys(employeeUpdateData).length > 0) {
      await Employee.findOneAndUpdate({ empId }, employeeUpdateData, { new: true });
    }

    const payrollDate = new Date().toISOString().split('T')[0];

    // Update payroll records (allowances, deductions, advances)
    const updatePayroll = async (type, amount) => {
      if (amount !== undefined) {
        const existingRecord = await Payroll.findOne({ empId: employee.name, type });
        if (existingRecord) {
          existingRecord.amount = amount;
          await existingRecord.save();
        } else if (parseFloat(amount) > 0) {
          await Payroll.create({ empId: employee.name, type, amount, date: payrollDate, description: 'Updated via API' });
        }
      }
    };

    await Promise.all([
      updatePayroll("Allowance", allowances),
      updatePayroll("Deductions", deductions),
      updatePayroll("Advance", advance),
    ]);

    // Update attendance
    if (attendanceDate && attendanceStatus) {
      const attendanceQuery = { employeeId: empId, date: new Date(attendanceDate) };
      const attendanceData = { status: attendanceStatus, logintime, logouttime };

      await AttendanceModel.findOneAndUpdate(attendanceQuery, attendanceData, { upsert: true, new: true });
    }

    // Update leave data
    if (leaveData) {
      if (leaveData._id) {
        await LeaveModel.findByIdAndUpdate(leaveData._id, leaveData, { new: true });
      } else {
        await LeaveModel.create({ ...leaveData, employee: empId });
      }
    }

    // Fetch updated employee details (like in `getEmployeeDataById`)
    const updatedEmployeeData = await getEmployeeDataById({ params: { empId } }, res, true); // Pass `true` to return data instead of sending response

    if (!updatedEmployeeData) {
      return res.status(500).json({ success: false, error: 'Failed to retrieve updated employee data' });
    }

    res.status(200).json({
      success: true,
      message: 'Employee data updated successfully',
      data: updatedEmployeeData.data
    });

  } catch (error) {
    console.error('Error updating employee data:', error);
    res.status(500).json({ success: false, error: 'Server Error', message: error.message });
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
  getAllEmployeesWithData,
  getEmployeeDataById,
  updateEmployeeDataById
};