const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const typeformRoutes = require('./routes/typeformRoutes');
const shopifyRoutes = require('./routes/shopifyRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/typeform', typeformRoutes);
app.use('/api/shopify', shopifyRoutes);
app.use('/api/user', userRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;