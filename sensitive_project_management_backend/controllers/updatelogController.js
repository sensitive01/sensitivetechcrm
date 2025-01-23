const Disposition = require('../models/updatelogSchema');

// Controller function to create or update a disposition
const createOrUpdateDisposition = async (req, res) => {
    const { disposition, notes } = req.body;
    const { id } = req.params; // ID will be used if updating, else it will be undefined (for create)

    try {
        if (id) {
            // Update Disposition if id is provided
            const updatedDisposition = await Disposition.findByIdAndUpdate(id, { disposition, notes }, { new: true });

            if (!updatedDisposition) {
                return res.status(404).json({ message: 'Disposition not found' });
            }

            return res.status(200).json(updatedDisposition);
        } else {
            // Create new Disposition if no id is provided
            const newDisposition = new Disposition({ disposition, notes });
            await newDisposition.save();
            return res.status(201).json(newDisposition);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller function to fetch all dispositions
const getAllDispositions = async (req, res) => {
    try {
        const dispositions = await Disposition.find();  // Fetch all records
        return res.status(200).json(dispositions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller function to fetch a single disposition by ID
const getDispositionById = async (req, res) => {
    const { id } = req.params; // Get the ID from URL params

    try {
        const disposition = await Disposition.findById(id); // Fetch the disposition by ID

        if (!disposition) {
            return res.status(404).json({ message: 'Disposition not found' });
        }

        return res.status(200).json(disposition);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrUpdateDisposition, getAllDispositions, getDispositionById };
