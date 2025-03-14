// src/api/anomaly_advanced.js
const express = require('express');
const router = express.Router();

router.post('/anomaly', (req, res) => {
  const { metricValues } = req.body; // e.g., an array of response times or error counts
  if (!metricValues || !Array.isArray(metricValues)) {
    return res.status(400).json({ error: 'Metric values must be provided as an array.' });
  }
  // Define a threshold for anomaly (example: any metric > 1000 is anomalous)
  const threshold = 1000;
  const anomalies = metricValues.filter(value => value > threshold);
  res.json({
    anomalyDetected: anomalies.length > 0,
    anomalies: anomalies,
    threshold: threshold
  });
});

module.exports = router;
