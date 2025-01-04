const express = require('express');
const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLeadById,
  deleteLeadById,
  updateLeadStatus,
} = require('../controllers/leadController');

const router = express.Router(); 


router.post('/create', createLead);

router.get('/get-all', getAllLeads); 


router.get('/:id', getLeadById); 

router.put('/update/:id', updateLeadById);

router.delete('/delete/:id', deleteLeadById); 

router.put('/update-status/:id', updateLeadStatus); 

module.exports = router;
