const express = require('express');
const logger = require('./middleware/logger');
const app = express();

app.use(logger);
// ... your routes here ...
