const Poll = require('../models/poll');

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching polls" });
  }
};

exports.createPoll = async (req, res) => {
  const { question, options } = req.body;
  try {
    if (!question || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({ message: "Invalid poll data" });
    }

    const newPoll = new Poll({ question, options });
    await newPoll.save();

    res.status(201).json(newPoll);
  } catch (error) {
    res.status(500).json({ message: "Error saving poll" });
  }
};
