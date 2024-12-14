const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Announcement', announcementSchema);
