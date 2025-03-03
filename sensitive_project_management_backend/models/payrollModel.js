const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema({
    empId: { 
      type: String, required: true
    },
    type: { type: String, required: true },
    amount: { type: String, required: true },
    note: { type: String },
 }, { timestamps: true });

module.exports = mongoose.model("Payroll", PayrollSchema);
