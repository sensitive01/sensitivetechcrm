const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema(
    {
        empId: { type: String, },
        type: { type: String, },
        amount: { type: String, },
        note: { type: String },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("Payroll", PayrollSchema);
