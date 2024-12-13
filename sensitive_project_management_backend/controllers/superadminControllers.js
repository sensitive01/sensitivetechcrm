const SuperAdminModel = require('../models/superadminModel'); // Ensure the correct model path

// Get all superadmins
exports.getAllSuperAdmins = async (req, res) => {
  try {
    const superadmins = await SuperAdminModel.find();
    res.status(200).json(superadmins);  // Return all superadmins
  } catch (err) {
    res.status(500).json({ message: 'Error fetching superadmins', error: err });
  }
};

// Create a new superadmin
exports.createSuperAdmin = async (req, res) => {
  const { name, officeEmail, password, adminType } = req.body;

  // Validate if all fields are provided
  if (!name || !officeEmail || !password || !adminType) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new superadmin
    const newSuperAdmin = new SuperAdminModel({
      name,
      officeEmail,
      password,
      adminType,
    });

    // Save to the database
    await newSuperAdmin.save();
    res.status(201).json({ message: 'Superadmin created successfully', superadmin: newSuperAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Error creating superadmin', error: err });
  }
};

// Update an existing superadmin by ID
exports.updateSuperAdmin = async (req, res) => {
  const { id } = req.params; // Get the superadmin ID from the URL params
  const { name, officeEmail, password, adminType } = req.body; // Get the updated data from the request body

  // Validate if any fields are provided for update
  if (!name && !officeEmail && !password && !adminType) {
    return res.status(400).json({ message: 'At least one field is required to update' });
  }

  try {
    // Find the superadmin by ID and update with new data
    const updatedSuperAdmin = await SuperAdminModel.findByIdAndUpdate(
      id,
      { name, officeEmail, password, adminType },
      { new: true } // Return the updated document
    );

    if (!updatedSuperAdmin) {
      return res.status(404).json({ message: 'Superadmin not found' });
    }

    res.status(200).json({
      message: 'Superadmin updated successfully',
      superadmin: updatedSuperAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating superadmin', error: err });
  }
};
