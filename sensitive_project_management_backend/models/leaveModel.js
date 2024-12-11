const mongoose = require('mongoose');

// Define the schema for the leave model
const leaveSchema = new mongoose.Schema({
  employee: { type: String },
  leaveCategory: { type: String },  // Tracks if the user selects Leave or Permission
  leaveType: { type: String },      // Tracks the selected leave type
  permissionDate: { type: Date },   // Added for permission date
  startDate: { type: Date },        // Start Date for Leave
  endDate: { type: Date },          // End Date for Leave
  timeRange: { type: String },      // Tracks the selected time range for permission
  remarks: { type: String },
  attachment: { type: String },     // URL or path for the attachment
  status: { type: String },         // Tracks the leave status
  startTime: { type: String },      // Time when leave starts
  endTime: { type: String },        // Time when leave ends
}, { timestamps: true });           // Automatically adds `createdAt` and `updatedAt` fields

module.exports = mongoose.model('LeaveModel', leaveSchema);
