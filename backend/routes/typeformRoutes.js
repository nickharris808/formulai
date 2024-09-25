const express = require('express');
const router = express.Router();
const typeformController = require('../controllers/typeformController');
const { validateTypeformSubmission } = require('../utils/validation');

// Handle Typeform submission
router.post('/submit', validateTypeformSubmission, typeformController.handleSubmission);

// Retrieve a specific Typeform submission by token (if needed)
router.get('/submission/:token', typeformController.getSubmissionByToken);

module.exports = router;