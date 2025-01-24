const Payment = require('../models/paymentSchema');
const { uploadImage } = require("../config/cloudinary");

// Create a new payment
exports.createPayment = async (req, res) => {
    try {
        // const { 
        //     project, paymentType, amount, mode, date, 
        //     tdsApplicable, taxApplicable, paymentReferenceNumber, 
        //     notes 
        // } = req.body;
        const paymentData = req.body;

        // Handle file uploads if needed
    if(req.files){
        if(req.files.paymentQuotation){
            paymentData.paymentQuotation = await uploadImage(req.files.paymentQuotation[0].buffer);
        }
        if(req.files.paymentProof){
            paymentData.paymentProof = await uploadImage(req.files.paymentProof[0].buffer);
        }
    }

        // const paymentQuotation = req.files?.paymentQuotation ? req.files.paymentQuotation[0].path : null;
        // const paymentProof = req.files?.paymentProof ? req.files.paymentProof[0].path : null;

        // const payment = new Payment({
        //     project, paymentType, amount, mode, date,
        //     tdsApplicable, taxApplicable, paymentReferenceNumber,
        //     paymentQuotation, paymentProof, notes
        // });
        const newPayment = new Payment(paymentData);

        await newPayment.save();
        res.status(201).json({ message: 'Payment created successfully!', newPayment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
};
