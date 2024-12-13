const express = require('express');
const multer = require('multer');
const { getAnnouncements, createAnnouncement } = require('../controllers/announcementController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Specify upload folder
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.get('/', getAnnouncements);
router.post('/', upload.single('file'), createAnnouncement);

module.exports = router;
