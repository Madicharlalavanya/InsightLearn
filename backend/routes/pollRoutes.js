const express = require('express');
const router = express.Router();
const Poll = require('../models/poll');

// POST route to create a poll
router.post('/polls', async (req, res) => {
  try {
    const { question, options } = req.body;

    // Validate request body
    if (!question || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({ success: false, message: "Question and valid options are required" });
    }

    // Create a new poll
    const newPoll = new Poll({ question, options });
    await newPoll.save();

    res.status(201).json({ success: true, message: "Poll created successfully", poll: newPoll });
  } catch (error) {
    console.error("Error creating poll:", error.message);
    res.status(500).json({ success: false, message: "Failed to create poll", error: error.message });
  }
});

// GET route to fetch all polls
router.get('/polls', async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error.message);
    res.status(500).json({ message: "Error fetching polls", error: error.message });
  }
});

module.exports = router;
