const express = require('express');
const bodyParser = require('body-parser');
const riskRoutes = require('./routes/risk');
const notificationRoutes = require('./routes/notification');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/risk', riskRoutes);
app.use('/api/notification', notificationRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});