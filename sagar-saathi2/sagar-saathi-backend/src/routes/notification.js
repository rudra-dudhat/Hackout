const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');

const notificationController = new NotificationController();

// Route to send SMS notification
router.post('/send', notificationController.sendNotification);

module.exports = router;