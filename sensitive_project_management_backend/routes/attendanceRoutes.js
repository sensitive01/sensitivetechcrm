const express = require('express');
const {
    createAttendance,
    getAllAttendance,
    logoutAttendance,
} = require('../controllers/attendancecontrollers')
const router = express.Router();

// Routes
router.post('/create',createAttendance);
router.get('/attendance-all',getAllAttendance);
router.put('/logout/:id',logoutAttendance)

module.exports = router;

