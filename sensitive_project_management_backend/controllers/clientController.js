const clientModel = require("../models/clientModel");


// Create a new client
exports.createClient = async (req, res) => {
  try {
    console.log("CREATE",req.body)
    const client = new clientModel(req.body);
    await client.save();
    res.status(201).json({ message: 'Client created successfully', client });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(400).json({ message: error.message });   
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientModel.find();
    console.log("get all",clients)
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a client by ID
exports.getClientById = async (req, res) => {
  try {
    console.log("welcome toedit",req.params.id)
    const client = await clientModel.findById(req.params.id);
    console.log(client)
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a client by ID
exports.updateClientById = async (req, res) => {
  try {
    const client = await clientModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document
    );
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client updated successfully', client });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a client by ID
exports.deleteClientById = async (req, res) => {
  try {
    const client = await clientModel.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update the status of a client by ID
exports.updateClientStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const client = await clientModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Status updated successfully', client });
  } catch (error) {
    console.error('Error updating client status:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get total clients count
exports.getTotalClients = async (req, res) => {
  try {
    // Count the total number of client records
    const totalClients = await clientModel.countDocuments();

    console.log("Total clients count:", totalClients);

    // Return the total clients count as a response
    res.status(200).json({ TotalClients: totalClients });
  } catch (error) {
    console.error("Error fetching total clients:", error);
    res.status(500).json({ message: error.message });
  }
};
