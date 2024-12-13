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

module.exports = mongoose.model('AttendanceModel', attendanceSchema);
