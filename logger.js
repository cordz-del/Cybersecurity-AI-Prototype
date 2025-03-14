// src/middleware/logger.js
const morgan = require('morgan');

const logger = morgan('combined'); // Using the 'combined' log format

module.exports = logger;
