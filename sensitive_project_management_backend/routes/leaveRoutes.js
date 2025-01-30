const express = require('express');
const {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequestById,
  deleteLeaveRequestById,
  updateLeaveRequestStatus,
  getTotalLeaveRequests,
} = require('../controllers/leaveControllers');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router(); // Use Router() for modular routing

// Define routes for leave operations
router.post('/create',  upload.single("attachment"),  createLeaveRequest); // Create a new leave request
router.get('/get-all', getAllLeaveRequests); // Get all leave requests
router.get('/get/:id', getLeaveRequestById); // Get a leave request by ID
router.put('/update/:id',  upload.single("attachment"), updateLeaveRequestById); // Update a leave request by ID
router.delete('/delete/:id', deleteLeaveRequestById); // Delete a leave request by ID
router.put('/update-status/:id', updateLeaveRequestStatus); // Update the leave status
router.get('/totalleaverequests', getTotalLeaveRequests);


module.exports = router;
