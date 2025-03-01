// models/attendanceModel.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  photo: { type: String },                     
  employeeId: { type: String },                
  employeeName: { type: String },             
  date: { type: Date },                      
  status: { type: String },                    
  logintime: { type: String },                
  logouttime: { type: String },                
}, { timestamps: true });                     

// Check if model already exists to prevent the OverwriteModelError
module.exports = mongoose.models.AttendanceModel || mongoose.model('AttendanceModel', attendanceSchema);