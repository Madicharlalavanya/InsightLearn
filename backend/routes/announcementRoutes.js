const express = require('express');
const { getAnnouncements, createAnnouncement } = require('../controllers/announcementController');

const router = express.Router();

router.get('/', getAnnouncements);
router.post('/', createAnnouncement); // No file upload middleware if unnecessary

module.exports = router;
