// src/api/incident_email.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/incident', async (req, res) => {
  const { anomalyDetails } = req.body;
  if (!anomalyDetails) {
    return res.status(400).json({ error: 'Anomaly details are required.' });
  }
  
  // Configure nodemailer transport (using Gmail as an example)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ALERT_EMAIL,
      pass: process.env.ALERT_EMAIL_PASSWORD
    }
  });
  
  const mailOptions = {
    from: process.env.ALERT_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: 'Cybersecurity Incident Alert',
    text: `An incident has been detected:\n\n${JSON.stringify(anomalyDetails, null, 2)}`
  };
  
  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Incident alert sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send incident alert.' });
  }
});

module.exports = router;
