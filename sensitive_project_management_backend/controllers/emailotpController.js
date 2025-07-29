// otpController.js
const employeeSchema = require("../models/employeeSchema");
const nodemailer = require('nodemailer');

// In-memory store for OTPs (in production, use Redis or database)
const otpStore = new Map();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to email
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if employee exists
    const empData = await employeeSchema.findOne({ email });
    if (!empData) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

    // Store OTP temporarily
    otpStore.set(email, { otp, expiry: otpExpiry });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Login OTP',
      text: `Your OTP for login is: ${otp}. This OTP is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      message: "OTP sent successfully",
      email: email // Optional: return the email for client-side reference
    });

  } catch (err) {
    console.error("Error in sending OTP:", err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if OTP exists for this email
    const storedOtpData = otpStore.get(email);
    if (!storedOtpData) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // Check if OTP is expired
    if (Date.now() > storedOtpData.expiry) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    // Verify OTP
    if (storedOtpData.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // OTP is valid - get employee data
    const empData = await employeeSchema.findOne({ email });
    if (!empData) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Clear OTP from store after successful verification
    otpStore.delete(email);

    return res.status(200).json({
      message: "Employee login successful",
      employee: empData,
    });

  } catch (err) {
    console.error("Error in OTP verification:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
};