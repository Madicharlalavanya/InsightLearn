require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const announcementRoutes = require('./routes/announcementRoutes');

const app = express();
connectDB();

// Middleware
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/announcements', announcementRoutes);

// Error handler
app.use(require('./middleware/errorHandler'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
