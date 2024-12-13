const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  file: { type: String },
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('Announcement', announcementSchema);
