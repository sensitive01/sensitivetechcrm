const mongoose = require('mongoose');

// Define the schema for the attendance model
const attendanceSchema = new mongoose.Schema({
  photo: { type: String },                     // URL or path to the photo
  employeeId: { type: String }, // Employee ID
  employeeName: { type: String }, // Employee name
  date: { type: Date },         // Attendance date
  status: { type: String },     // Attendance status (e.g., Present, Absent, etc.)
  logintime: { type: String },                  // Login time
  logouttime: { type: String },                 // Logout time
  submissionDateTime: { type: String },         // Formatted submission datetime
}, { timestamps: true });                       // Automatically adds `createdAt` and `updatedAt` fields

module.exports = mongoose.model('AttendanceModel', attendanceSchema);
