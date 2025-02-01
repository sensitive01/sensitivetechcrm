// routes/meetingRoutes.js
const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/momController');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes for meeting operations
router.post('/mompage', upload.fields([
    { name: "agendaFile", maxCount: 1 },
    { name: "discussionFile", maxCount: 1 },
    { name: "actionFile", maxCount: 1 }
]), meetingController.createMeeting); // Create a new meeting
router.get('/getallmom', meetingController.getAllMeetings); // Get all meetings
router.get('/getmombyid/:id', meetingController.getMeetingById); // Get meeting by ID
router.put('/updatemom/:id', upload.fields([
    { name: "agendaFile", maxCount: 1 },
    { name: "discussionFile", maxCount: 1 },
    { name: "actionFile", maxCount: 1 }
]), meetingController.updateMeetingById); // Update meeting by ID
router.delete('/deletemom/:id', meetingController.deleteMeetingById); // Delete meeting by ID

module.exports = router;
