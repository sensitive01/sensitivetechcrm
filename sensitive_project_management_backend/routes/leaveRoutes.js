const express = require('express');
const {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequestById,
  deleteLeaveRequestById,
  updateLeaveRequestStatus,
} = require('../controllers/leaveControllers');

const router = express.Router(); // Use Router() for modular routing

// Define routes for leave operations
router.post('/create', createLeaveRequest); // Create a new leave request
router.get('/get-all', getAllLeaveRequests); // Get all leave requests
router.get('/get/:id', getLeaveRequestById); // Get a leave request by ID
router.put('/update/:id', updateLeaveRequestById); // Update a leave request by ID
router.delete('/delete/:id', deleteLeaveRequestById); // Delete a leave request by ID
router.put('/update-status/:id', updateLeaveRequestStatus); // Update the leave status

module.exports = router;
