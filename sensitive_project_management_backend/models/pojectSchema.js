const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
  },
  type: {
    type: String,
  },
  requirements: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  techStack: {
    type: String,
  },
  domain: {
    type: String,
  },
  designation: {
    type: String,
  },
  addOnServices: {
    type: String,
  },
  duration: {
    type: String,
  },
  quotedValue: {
    type: Number,
  },
  approvedValue: {
    type: Number,
  },
  paymentTerms: {
    type: String,
  },
  finalQuotation: {
    type: String,
  },
  taxTerms: {
    type: String,
  },
  dependencies: {
    type: String,
  },
  projectDocument: {
    type: String,
  },
  nda: {
    type: String, 
  },
  msa: {
    type: String, 
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"], 
    default: "Pending",
  },
}, { timestamps: true }); 

module.exports = mongoose.model("Project", projectSchema);
