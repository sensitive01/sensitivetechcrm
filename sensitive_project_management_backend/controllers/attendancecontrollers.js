const attendanceModel = require("../models/attendanceModel");


exports.createAttendance = async (req, res) => {
    try {
      console.log("CREATE Attendance", req.body);
      const attendance = new attendanceModel(req.body);
      await attendance.save();
      res.status(201).json({ message: "Attendance record created successfully", attendance });
    } catch (error) {
      console.error("Error creating attendance record:", error);
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all attendance records
  exports.getAllAttendance = async (req, res) => {
    try {
      const attendanceRecords = await attendanceModel.find();
      console.log("GET all attendance records", attendanceRecords);
      res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      res.status(500).json({ message: error.message });
    }
  };
  exports.logoutAttendance = async (req, res) => {
    try {
      const attendanceRecords = await attendanceModel.find();
      console.log("GET all attendance records", attendanceRecords);
      res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      res.status(500).json({ message: error.message });
    }
  };