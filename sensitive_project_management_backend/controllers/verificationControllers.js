const employeeSchema = require("../models/employeeSchema");
const superadminSchema = require("../models/superadminModel"); // Assuming you have a schema for superadmins

// Employee login logic
const employeeLogin = async (req, res) => {
    try {
        console.log("Welcome to employee login verification", req.body);
        const { username, password } = req.body;

        // Find the employee by email (username) and password
        const empData = await employeeSchema.findOne({ email: username, password: password });

        // Check if employee data was found
        if (!empData) {
            // If no employee found, send a failure response
            return res.status(401).json({ message: "Invalid username or password" });
        }

        console.log(empData);

        // If employee is found, send a success response with employee data
        return res.status(200).json({
            message: "Employee login successful",
            employee: empData,  // You can send relevant data like employee name or ID instead of the whole object
        });
    } catch (err) {
        console.log("Error in employee login verification", err);
        // Send an error response in case of an exception
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Superadmin login logic
const superadminLogin = async (req, res) => {
    try {
        console.log("Welcome to superadmin login verification", req.body);
        const { username, password } = req.body;

        // Find the superadmin by email (username) and password
        const superadminData = await superadminSchema.findOne({ email: username, password: password});

        // Check if superadmin data was found
        if (!superadminData) {
            // If no superadmin found, send a failure response
            return res.status(401).json({ message: "Invalid username or password or not a Superadmin" });
        }

        console.log(superadminData);

        // If superadmin is found, send a success response with superadmin data
        return res.status(200).json({
            message: "Superadmin login successful",
            superadmin: superadminData,  // You can send relevant data like superadmin name or ID instead of the whole object
        });
    } catch (err) {
        console.log("Error in superadmin login verification", err);
        // Send an error response in case of an exception
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    employeeLogin,
    superadminLogin
};
