const express = require('express');
const superadminRouter = express.Router();
const superadminController = require('../controllers/superadminControllers'); // Update to use the correct controller

// Define routes for superadmin management
superadminRouter.get('/getallsuperadmins', superadminController.getAllSuperAdmins); // Get all superadmins
superadminRouter.post('/createsuperadmin', superadminController.createSuperAdmin); // Create a new superadmin
superadminRouter.put('/updatesuperadmin', superadminController.updateSuperAdmin); // Create a new superadmin


module.exports = superadminRouter;
