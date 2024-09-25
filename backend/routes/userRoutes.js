const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const { validateProfileUpdate } = require('../utils/validation');

// Get user profile
router.get('/profile', authenticate, userController.getProfile);

// Update user profile
router.put('/profile', authenticate, validateProfileUpdate, userController.updateProfile);

// Get personalized content for a user
router.get('/personalized-content', authenticate, userController.getPersonalizedContent);

// Refresh personalization for a user
router.post('/refresh-personalization', authenticate, userController.refreshPersonalization);

module.exports = router;