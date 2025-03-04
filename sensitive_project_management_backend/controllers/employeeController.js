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