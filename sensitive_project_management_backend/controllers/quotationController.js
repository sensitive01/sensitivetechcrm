const Quotation = require('../models/quotationmodel');

// Create a new quotation
exports.createQuotation = async (req, res) => {
    try {
        const quotation = new Quotation(req.body);
        await quotation.save();
        res.status(201).json({ message: 'Quotation created successfully', quotation });
    } catch (error) {
        res.status(500).json({ error: 'Error creating quotation', details: error.message });
    }
};

// Get all quotations
exports.getAllQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find();
        res.status(200).json(quotations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching quotations', details: error.message });
    }
};

// Get a single quotation by ID
exports.getQuotationById = async (req, res) => {
    try {
        const quotation = await Quotation.findById(req.params.id);
        if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
        res.status(200).json(quotation);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching quotation', details: error.message });
    }
};

// Update a quotation
exports.updateQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
        res.status(200).json({ message: 'Quotation updated successfully', quotation });
    } catch (error) {
        res.status(500).json({ error: 'Error updating quotation', details: error.message });
    }
};

// Delete a quotation
exports.deleteQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndDelete(req.params.id);
        if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
        res.status(200).json({ message: 'Quotation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting quotation', details: error.message });
    }
};
