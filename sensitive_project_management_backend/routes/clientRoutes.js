const express = require('express');
const {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
  updateClientStatus,
} = require('../controllers/clientController');

const router = express.Router(); // Use Router() for modular routing

// Define routes for client operations
router.post('/create', createClient); // Create a new client
router.get('/get-all', getAllClients); // Get all clients
router.get('/get/:id', getClientById); // Get a client by ID
router.put('/update/:id', updateClientById); // Update a client by ID
router.delete('/delete/:id', deleteClientById); // Delete a client by ID
router.put('/update-status/:id',updateClientStatus); // Define the route for updating employee status


module.exports = router;
