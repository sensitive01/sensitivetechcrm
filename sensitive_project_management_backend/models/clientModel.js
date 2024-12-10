const mongoose = require('mongoose');

// Define the schema for the client model
const clientSchema = new mongoose.Schema({
  organization: { type: String },
  contactPerson: { type: String },
  contactNumber: { type: String },
  alternateContact: { type: String },
  emailId: { type: String },
  alternateMailId: { type: String },
  businessCategory: { type: String },
  officeLocation: {
    addressLine: { type: String },
    area: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    landmark: { type: String },
  },
  registeredAddress: {
    addressLine: { type: String },
    area: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    landmark: { type: String },
  },
  status: { type: String, default: 'Pending' },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields

module.exports = mongoose.model('Clientmodel', clientSchema);
