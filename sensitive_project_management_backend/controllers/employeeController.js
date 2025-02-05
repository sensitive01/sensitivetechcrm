const Employee = require("../models/employeeSchema");
const leaveModel = require("../models/leaveModel");
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
// const getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      role: { $nin: ['Superadmin', 'Lead'] }  // Excludes superadmin and lead roles
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific employee
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
    const deletedEmployee = await Employee.findByIdAndDelete({ _id: id });
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
    const employees = await Employee.find({ role: "employee" }).select("name");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// const getEmployeeNames = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("User ID", id);
//     const empdata = await Employee.findOne({ _id: id }, { role: 1, empId: 1, name: 1 });
//     if (!empdata) {
//       return res.status(404).json({ message: "Employee not found" });

//     }
//     console.log("Employee Data:", empdata);
//     let employees;
//     if (empdata.role === "Superadmin") {
//       employees = await Employee.find()

//     } else {
//       leaves = await leaveModel.find({
//         "employee": empdata.name
//       });
//     }
//     console.log("Employees:", leaves);
//     res.status(200).json(leaves);
//   } catch (error) {
//     console.error("Error fetching Employees:", error);
//     res.status(500).json({ message: "Error fetching Employees" });
//   }
// };


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

    // Validate response structure
    if (response.data && Array.isArray(response.data.places) && response.data.places.length > 0) {
      const { "place name": area, state, country } = response.data.places[0]; // Access place name correctly
      const city = state || area; // Fallback to area if state is not available

      return {
        area: area || "Unknown Area", // Default value if area is missing
        city,
        state: state || "Unknown State", // Default value for state
        country: country || "India", // Default value for country
      };
    } else {
      // No address details found
      return null;
    }
  } catch (error) {
    // Log the error with more details
    console.error("API Error:", error.response?.data || error.message);

    // Throw a more meaningful error
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
    const employee = await Employee.findById(id, 'name email password empId'); // Fields to fetch

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
};
