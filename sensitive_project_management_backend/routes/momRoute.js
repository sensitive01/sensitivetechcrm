// routes/meetingRoutes.js
const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/momController');

// Routes for meeting operations
router.post('/mompage', meetingController.createMeeting); // Create a new meeting
router.get('/getallmom', meetingController.getAllMeetings); // Get all meetings
router.get('/getmombyid/:id', meetingController.getMeetingById); // Get meeting by ID
router.put('/updatemom/:id', meetingController.updateMeetingById); // Update meeting by ID
router.delete('/deletemom/:id', meetingController.deleteMeetingById); // Delete meeting by ID

module.exports = router;
