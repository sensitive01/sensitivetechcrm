const Lead = require('../models/leadModel');

// leadController.js

exports.createLead = (req, res) => {
    // Logic for creating a new lead
    const { name, contact, email, requirements, company, location, links, comments, status } = req.body;
    
    // Add validation if necessary
    // Save the lead in the database
    // Example: Lead.create({ name, contact, email, ... })
    
    res.status(201).json({ message: 'Lead created successfully' });
  };
  
//   exports.getAllLeads = async (req, res) => {
//     try {
//       // Logic for fetching all leads from database
//       // Example: const leads = await Lead.find();
//       res.status(200).json({ message: 'Leads fetched successfully', data: leads });
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching leads', error });
//     }
//   };

  exports. getAllLeads = async (req, res) => {
    try {
      const leads = await Lead.find(); // Querying the database for leads
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: 'Error fetching leads', error });
    }
  };
  
  
  exports.getLeadById = async (req, res) => {
    try {
      const lead = await Lead.findById(req.params.id); // Example using MongoDB
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
      res.status(200).json({ message: 'Lead fetched successfully', data: lead });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching lead', error });
    }
  };
  
  exports.updateLeadById = async (req, res) => {
    try {
      const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
      res.status(200).json({ message: 'Lead updated successfully', data: lead });
    } catch (error) {
      res.status(500).json({ message: 'Error updating lead', error });
    }
  };
  
  exports.deleteLeadById = async (req, res) => {
    try {
      const lead = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
      res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting lead', error });
    }
  };
  
  exports.updateLeadStatus = async (req, res) => {
    try {
      const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
      res.status(200).json({ message: 'Lead status updated successfully', data: lead });
    } catch (error) {
      res.status(500).json({ message: 'Error updating lead status', error });
    }
  };
  