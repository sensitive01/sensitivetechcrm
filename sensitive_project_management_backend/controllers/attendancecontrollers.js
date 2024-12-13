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

// Update logout time for a specific attendance record
exports.logoutAttendance = async (req, res) => {
  try {
    const { id } = req.params;  // Get the record ID from the URL params
    const { logouttime } = req.body;  // Get the logout time from the request body

    // Validate the logout time
    if (!logouttime) {
      return res.status(400).json({ message: "Logout time is required" });
    }

    // Find and update the attendance record with the given ID
    const updatedAttendance = await attendanceModel.findByIdAndUpdate(
      id, 
      { logouttime: logouttime }, 
      { new: true } // Return the updated document
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    console.log("Updated logout time for attendance record:", updatedAttendance);
    res.status(200).json({ message: "Logout time updated successfully", updatedAttendance });
  } catch (error) {
    console.error("Error updating logout time:", error);
    res.status(500).json({ message: error.message });
  }
};
