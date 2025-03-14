// src/api/anomaly.js
const express = require('express');
const router = express.Router();

router.post('/anomaly', (req, res) => {
  const { logData } = req.body;
  if (!logData) {
    return res.status(400).json({ error: 'Log data is required.' });
  }
  // Simple anomaly detection: flag if "error" or "failed" appears in the log.
  const anomalies = logData.filter(line => /error|failed/i.test(line));
  if (anomalies.length > 0) {
    return res.json({ anomalyDetected: true, details: anomalies });
  }
  return res.json({ anomalyDetected: false });
});

module.exports = router;
