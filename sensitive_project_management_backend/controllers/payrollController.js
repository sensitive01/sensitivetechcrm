const Payroll = require("../models/payrollModel");

// Create Payroll Entry
exports.createPayroll = async (req, res) => {
    try {
        const { empId, type, amount, note } = req.body;
        const payroll = new Payroll({ empId, type, amount, note });
        await payroll.save();
        res.status(201).json({ message: "Payroll entry created successfully", payroll });
    } catch (error) {
        res.status(500).json({ message: "Error creating payroll", error });
    }
};

// Get All Payrolls
exports.getPayrolls = async (req, res) => {
    try {
        const payrolls = await Payroll.find().populate("empId", "name");
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payrolls", error });
    }
};

// Get Payroll by ID
exports.getPayrollById = async (req, res) => {
    try {
        const payroll = await Payroll.findById(req.params.id).populate("empId", "name");
        if (!payroll) return res.status(404).json({ message: "Payroll not found" });
        res.json(payroll);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payroll", error });
    }
};



exports.deletePayroll = async (req, res) => {
  const { id } = req.params;
  try {
    const payroll = await Payroll.findByIdAndDelete(id); // Use the correct model here
    if (!payroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }
    res.status(200).json({ message: "Payroll deleted successfully" });
  } catch (error) {
    console.error("Error deleting Payroll:", error);
    res.status(500).json({ message: "Error deleting Payroll" });
  }
};

// Update Payroll Entry
exports.updatePayroll = async (req, res) => {
    const { id } = req.params;
    const { empId, type, amount, note } = req.body;

    try {
        // Find payroll by ID and update
        const payroll = await Payroll.findByIdAndUpdate(
            id,
            { empId, type, amount, note },
            { new: true } // This option returns the updated document
        ).populate("empId", "name");

        if (!payroll) {
            return res.status(404).json({ message: "Payroll not found" });
        }

        res.status(200).json({ message: "Payroll updated successfully", payroll });
    } catch (error) {
        console.error("Error updating payroll:", error);
        res.status(500).json({ message: "Error updating payroll", error });
    }
};
