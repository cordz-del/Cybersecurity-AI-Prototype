// src/api/incident.js
const express = require('express');
const router = express.Router();

router.post('/incident', (req, res) => {
  const { anomalyDetails } = req.body;
  if (!anomalyDetails) {
    return res.status(400).json({ error: 'Anomaly details are required.' });
  }
  // Trigger an automated response (e.g., log, alert message)
  console.log('Incident Response Triggered:', anomalyDetails);
  // Here you might integrate with an alerting system, e.g., send an email or Slack notification.
  res.json({ message: 'Incident response initiated successfully.' });
});

module.exports = router;
