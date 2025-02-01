// controllers/meetingController.js
const Meeting = require('../models/momSchema');

// Create a new meeting
exports.createMeeting = async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    await newMeeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(500).json({ message: 'Error creating meeting', error: err });
  }
};

// Get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching meetings', error: err });
  }
};

// Get meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching meeting', error: err });
  }
};

// Update meeting by ID
exports.updateMeetingById = async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json(updatedMeeting);
  } catch (err) {
    res.status(500).json({ message: 'Error updating meeting', error: err });
  }
};

// Delete meeting by ID
exports.deleteMeetingById = async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting meeting', error: err });
  }
};
