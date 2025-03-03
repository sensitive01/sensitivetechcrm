const express = require('express');
const { 
    createQuotation, 
    getAllQuotations, 
    getQuotationById, 
    updateQuotation, 
    deleteQuotation 
} = require('../controllers/quotationController');

const router = express.Router();

router.post('/quotationcreate', createQuotation);
router.get('/allquotation', getAllQuotations);
router.get('/quotationbyid/:id', getQuotationById);
router.put('/quotationupdate/:id', updateQuotation);
router.delete('/quotationdelete/:id', deleteQuotation);

module.exports = router;
