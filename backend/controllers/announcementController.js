const Announcement = require('../models/announcement');

// Get all announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements." });
  }
};

// Create a new announcement
const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newAnnouncement = new Announcement({ title, content });
    await newAnnouncement.save();

    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create announcement" });
  }
};

module.exports = { getAnnouncements, createAnnouncement };
