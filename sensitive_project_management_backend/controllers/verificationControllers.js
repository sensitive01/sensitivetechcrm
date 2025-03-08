const employeeSchema = require("../models/employeeSchema");
const superadminSchema = require("../models/superadminModel"); 
const employeeLogin = async (req, res) => {
    try {
        console.log("Welcome to employee login verification", req.body);
        const { username, password } = req.body;
        const empData = await employeeSchema.findOne({ email: username, password: password });
        if (!empData) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        console.log(empData);
        return res.status(200).json({
            message: "Employee login successful",
            employee: empData,
        });
    } catch (err) {
        console.log("Error in employee login verification", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const superadminLogin = async (req, res) => {
    try {
        console.log("Welcome to superadmin login verification", req.body);
        const { username, password } = req.body;
        const superadminData = await superadminSchema.findOne({ officeEmail: username, password: password});
        if (!superadminData) {
            return res.status(401).json({ message: "Invalid username or password or not a Superadmin" });
        }

        console.log(superadminData);
        return res.status(200).json({
            message: "Superadmin login successful",
            superadmin: superadminData,  
        });
    } catch (err) {
        console.log("Error in superadmin login verification", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    employeeLogin,
    superadminLogin
};
