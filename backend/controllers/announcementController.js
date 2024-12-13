const Announcement = require('../models/announcement');

// Get all announcements
const getAnnouncements = async (req, res) => {
    try {
      const announcements = await Announcement.find().sort({ createdAt: -1 });
      res.status(200).json(announcements); // Ensure createdAt is included in the response
    } catch (error) {
      res.status(500).json({ message: "Error fetching announcements." });
    }
  };
  
  

// Create a new announcement
const createAnnouncement = async (req, res) => {
    try {
      const { title, content } = req.body;
  
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
      }
  
      const file = req.file ? req.file.filename : null; // Handle file upload
      const newAnnouncement = new Announcement({ title, content, file });
  
      const savedAnnouncement = await newAnnouncement.save();
      console.log("Saved Announcement:", savedAnnouncement); // Log the saved announcement
  
      res.status(201).json(savedAnnouncement);
    } catch (error) {
      console.error("Error saving announcement:", error.message);
      res.status(500).json({ message: "Error saving announcement." });
    }
  };
  

module.exports = { getAnnouncements, createAnnouncement };
