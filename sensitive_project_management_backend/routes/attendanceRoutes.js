const express = require('express');
const {
    createAttendance,
    getAllAttendance,
    logoutAttendance,
    getTotalAttendance,
} = require('../controllers/attendancecontrollers')
const router = express.Router();
router.post('/create',createAttendance);
router.get('/attendance-all/:id',getAllAttendance);
router.put('/logout/:id',logoutAttendance)
router.get('/totalattendance', getTotalAttendance);

module.exports = router;

