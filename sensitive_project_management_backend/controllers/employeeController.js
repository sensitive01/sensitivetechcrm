const Employee = require("../models/employeeSchema");
const { uploadImage } = require("../config/cloudinary");
const axios = require('axios');

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


// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific employee
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById({_id:id});
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee
// const updateEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;
    // const updatedEmployee = await Employee.findByIdAndUpdate({_id:id}, updatedData, { new: true });
    // if (!updatedEmployee) {
    //   return res.status(404).json({ error: "Employee not found" });
    // }
//     res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
    const deletedEmployee = await Employee.findByIdAndDelete({_id:id});
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully", employee: deletedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeNames = async (req, res) => {
  try {
    const employees = await Employee.find({role:"employee"});
    res.json(employees);
  }catch (error) {
    res.status(500).json({message: "Error fetching employees"});
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
    console.log(response.data); // Log the entire response to inspect the structure
    if (response.data && response.data.places && response.data.places.length > 0) {
      const { placeName: area, state, country } = response.data.places[0];
      const city = state || area; // Fallback if state is missing
      return { area, city, state, country };
    } else {
      return null;
    }
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message); // Log API-specific error response
    throw new Error("Invalid Pincode or API Error");
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
};
