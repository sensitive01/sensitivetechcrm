const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../controllers/paymentController");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

paymentRouter.post('/createpayment', upload.fields([{ name: 'paymentQuotation', maxCount: 1 }, { name: 'paymentProof', maxCount: 1 }]), paymentController.createPayment);
module.exports = paymentRouter;
