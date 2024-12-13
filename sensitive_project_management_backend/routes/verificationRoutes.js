const express = require('express');
const router = express.Router(); // Use Router() for modular routing
const verificationControllers = require("../controllers/verificationControllers");

// Employee login route
router.post('/login', verificationControllers.employeeLogin); 

// Superadmin login route
router.post('/adminlogin', verificationControllers.superadminLogin);

module.exports = router;
