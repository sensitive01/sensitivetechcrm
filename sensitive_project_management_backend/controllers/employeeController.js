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

    const employees = await Employee.find({}, 'name empId department salary');

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
            const loginTime = record.logintime;
            const startTime = "09:30";

            if (loginTime > startTime) {
              lateDays++;

              const [loginHour, loginMin] = loginTime.split(':').map(Number);
              const [startHour, startMin] = startTime.split(':').map(Number);
              let minutesLate = (loginHour * 60 + loginMin) - (startHour * 60 + startMin);

              lateMins += Math.abs(minutesLate);
            }
          }
        });

        const lateHours = Math.floor(lateMins / 60);
        const remainingMins = lateMins % 60;
        const formattedLateTime = `${lateHours}h ${remainingMins}m`;

        return {
          totalDays,
          present,
          absent,
          lateDays,
          lateTime: formattedLateTime,
          workingDays: present + absent
        };
      };




      const currentAttendance = await fetchAttendanceData(currentMonthData);
      const prevAttendance = await fetchAttendanceData(prevMonthData);

      const fetchPayrollData = async (firstDay, lastDay) => {
        const allowances = await Payroll.find({ empId: employee.name, type: 'Allowance' });
        const deductions = await Payroll.find({ empId: employee.name, type: 'Deductions' });
        const advances = await Payroll.find({ empId: employee.name, type: 'Advance' });

        const totalAllowances = allowances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        const totalDeductions = deductions.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        const totalAdvances = advances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

        const payable = employee.salary + totalAllowances - totalDeductions - totalAdvances;

        return { totalAllowances, totalDeductions, totalAdvances, payable };
      };

      const currentPayroll = await fetchPayrollData(currentMonthData.firstDay, currentMonthData.lastDay);
      const prevPayroll = await fetchPayrollData(prevMonthData.firstDay, prevMonthData.lastDay);


      const fetchLeaveData = async (firstDay, lastDay) => {
        const leaves = await LeaveModel.find({ employee: employee.empId, startDate: { $gte: firstDay, $lte: lastDay } });
        return leaves.length;
      };

      const currentLeaves = await fetchLeaveData(currentMonthData.firstDay, currentMonthData.lastDay);
      const prevLeaves = await fetchLeaveData(prevMonthData.firstDay, prevMonthData.lastDay);

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
      // Filter payroll records by createdAt timestamp
      const allowances = await Payroll.find({ 
        empId: employee.name, 
        type: "Allowance",
        createdAt: { $gte: firstDay, $lte: lastDay }
      });
      
      const deductions = await Payroll.find({ 
        empId: employee.name, 
        type: "Deductions",
        createdAt: { $gte: firstDay, $lte: lastDay }
      });
      
      const advances = await Payroll.find({ 
        empId: employee.name, 
        type: "Advance",
        createdAt: { $gte: firstDay, $lte: lastDay }
      });

      const totalAllowances = allowances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
      const totalDeductions = deductions.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
      const totalAdvances = advances.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

      const payable = parseFloat(employee.salary || 0) + totalAllowances - totalDeductions - totalAdvances;

      return { totalAllowances, totalDeductions, totalAdvances, payable };
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

// const updateEmployeeDataById = async (req, res) => {
//   try {
//     const { empId } = req.params; // Get empId from URL parameters
//     const updateData = req.body; // Get data to update from request body

//     if (!empId) {
//       return res.status(400).json({ success: false, error: 'Employee ID is required' });
//     }

//     let updatedResponse = {};

//     // Update Employee Basic Info
//     if (updateData.name || updateData.department || updateData.salary) {
//       const updatedEmployee = await Employee.findOneAndUpdate(
//         { empId },
//         { $set: updateData },
//         { new: true, runValidators: true }
//       );
//       updatedResponse.employee = updatedEmployee;
//     }

//     // Update Attendance Data
//     if (updateData.attendance) {
//       await AttendanceModel.updateMany(
//         { employeeId: empId, date: { $gte: updateData.startDate, $lte: updateData.endDate } },
//         { $set: updateData.attendance }
//       );
//       updatedResponse.attendance = 'Updated successfully';
//     }

//     // Update Payroll Data
//     if (updateData.payroll) {
//       await Payroll.updateMany(
//         { empId },
//         { $set: updateData.payroll }
//       );
//       updatedResponse.payroll = 'Updated successfully';
//     }

//     // Update Leave Data
//     if (updateData.leave) {
//       await LeaveModel.updateMany(
//         { employee: empId },
//         { $set: updateData.leave }
//       );
//       updatedResponse.leave = 'Updated successfully';
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Employee data updated successfully',
//       data: updatedResponse
//     });

//   } catch (error) {
//     console.error('Error updating employee data:', error);
//     res.status(500).json({ success: false, error: 'Server Error' });
//   }
// };

const updateEmployeeDataById = async (req, res) => {
  try {
    const { empId } = req.params;
    const { 
      name,
      department,
      salary,
      allowances,
      deductions,
      advance,
      attendanceDate,
      attendanceStatus,
      logintime,
      logouttime,
      leaveData,

      shiftStartTime = "09:30"
    } = req.body;

    if (!empId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Employee ID is required' 
      });
    }
    const employee = await Employee.findOne({ empId });
    
    if (!employee) {
      return res.status(404).json({ 
        success: false, 
        error: 'Employee not found' 
      });
    }
    const employeeUpdateData = {};
    
    if (name !== undefined) employeeUpdateData.name = name;
    if (department !== undefined) employeeUpdateData.department = department;
    if (salary !== undefined) employeeUpdateData.salary = salary;
    if (shiftStartTime !== undefined) employeeUpdateData.shiftStartTime = shiftStartTime;
    
    if (Object.keys(employeeUpdateData).length > 0) {
      await Employee.findOneAndUpdate(
        { empId }, 
        employeeUpdateData,
        { new: true, runValidators: true }
      );
    }
    const currentDate = new Date();
    const payrollDate = currentDate.toISOString().split('T')[0]; 
    let payrollUpdates = {};

    if (allowances !== undefined) {
      const existingAllowance = await Payroll.findOne({ 
        empId: employee.name, 
        type: 'Allowance'
      });

      if (existingAllowance) {
        existingAllowance.amount = allowances;
        await existingAllowance.save();
      } else if (parseFloat(allowances) > 0) {
        await Payroll.create({
          empId: employee.name,
          type: 'Allowance',
          amount: allowances,
          date: payrollDate,
          description: 'Updated via API'
        });
      }
      payrollUpdates.totalAllowances = allowances;
    }

    if (deductions !== undefined) {
      const existingDeduction = await Payroll.findOne({ 
        empId: employee.name, 
        type: 'Deductions'
      });

      if (existingDeduction) {
        existingDeduction.amount = deductions;
        await existingDeduction.save();
      } else if (parseFloat(deductions) > 0) {
        await Payroll.create({
          empId: employee.name,
          type: 'Deductions',
          amount: deductions,
          date: payrollDate,
          description: 'Updated via API'
        });
      }
      payrollUpdates.totalDeductions = deductions;
    }

    if (advance !== undefined) {
      const existingAdvance = await Payroll.findOne({ 
        empId: employee.name, 
        type: 'Advance'
      });

      if (existingAdvance) {
        existingAdvance.amount = advance;
        await existingAdvance.save();
      } else if (parseFloat(advance) > 0) {
        await Payroll.create({
          empId: employee.name,
          type: 'Advance',
          amount: advance,
          date: payrollDate,
          description: 'Updated via API'
        });
      }
      payrollUpdates.totalAdvances = advance;
    }

    // Update attendance if provided
    let attendanceUpdates = {};
    if (attendanceDate && attendanceStatus) {
      const existingAttendance = await AttendanceModel.findOne({
        employeeId: empId,
        date: new Date(attendanceDate)
      });

      const attendanceData = {
        employeeId: empId,
        status: attendanceStatus,
        date: new Date(attendanceDate)
      };
      
      if (logintime) attendanceData.logintime = logintime;
      if (logouttime) attendanceData.logouttime = logouttime;

      if (existingAttendance) {
        await AttendanceModel.findByIdAndUpdate(
          existingAttendance._id,
          attendanceData,
          { new: true, runValidators: true }
        );
      } else {
        await AttendanceModel.create(attendanceData);
      }
      
      attendanceUpdates = {
        date: attendanceDate,
        status: attendanceStatus,
        logintime: logintime || null,
        logouttime: logouttime || null
      };
    }

    // Update leave data if provided
    let leaveUpdates = {};
    if (leaveData) {
      if (leaveData._id) {
        // Update existing leave
        await LeaveModel.findByIdAndUpdate(
          leaveData._id,
          leaveData,
          { new: true, runValidators: true }
        );
      } else {
        // Create new leave
        const newLeave = await LeaveModel.create({
          ...leaveData,
          employee: empId
        });
        leaveUpdates = newLeave;
      }
    }

    // Calculate current payable amount if salary or any payroll component was updated
    let payable;
    if (salary !== undefined || allowances !== undefined || deductions !== undefined || advance !== undefined) {
      const currentSalary = salary !== undefined ? parseFloat(salary) : parseFloat(employee.salary || 0);
      const currentAllowances = allowances !== undefined ? parseFloat(allowances) : 0;
      const currentDeductions = deductions !== undefined ? parseFloat(deductions) : 0;
      const currentAdvances = advance !== undefined ? parseFloat(advance) : 0;
      
      payable = currentSalary + currentAllowances - currentDeductions - currentAdvances;
      payrollUpdates.payable = payable;
    }

    // Prepare the response data
    const responseData = {
      empId,
      name: employee.name
    };
    
    if (Object.keys(employeeUpdateData).length > 0) {
      responseData.basicInfo = employeeUpdateData;
    }
    
    if (Object.keys(payrollUpdates).length > 0) {
      responseData.payroll = payrollUpdates;
    }
    
    if (Object.keys(attendanceUpdates).length > 0) {
      responseData.attendance = attendanceUpdates;
    }
    
    if (Object.keys(leaveUpdates).length > 0) {
      responseData.leave = leaveUpdates;
    }

    // Return success response with updated data
    res.status(200).json({
      success: true,
      message: 'Employee data updated successfully',
      data: responseData
    });

  } catch (error) {
    console.error('Error updating employee data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server Error',
      message: error.message 
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
  getAllEmployeesWithData,
  getEmployeeDataById,
  updateEmployeeDataById
};