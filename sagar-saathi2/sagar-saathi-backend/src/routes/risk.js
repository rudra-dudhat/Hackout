// src/routes/risk.js

const express = require('express');
const router = express.Router();
const RiskController = require('../controllers/riskController');

const riskController = new RiskController();

// Route to fetch risk level based on input data
router.post('/assess', riskController.assessRisk);

module.exports = router;