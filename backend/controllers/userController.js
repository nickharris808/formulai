const userService = require('../services/userService');
const personalizationService = require('../services/personalizationService');

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is available from authentication middleware
    const profile = await userService.getUserProfile(userId);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body;
    await userService.updateUserProfile(userId, updatedData);
    
    // Trigger re-personalization after profile update
    await personalizationService.regeneratePersonalizedContent(userId);
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await userService.deleteUserAccount(userId);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getGeneticData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const geneticData = await userService.getUserGeneticData(userId);
    res.json(geneticData);
  } catch (error) {
    next(error);
  }
};

exports.updateGeneticData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newGeneticData = req.body.geneticData;
    await userService.updateUserGeneticData(userId, newGeneticData);
    
    // Trigger re-personalization after genetic data update
    await personalizationService.regeneratePersonalizedContent(userId);
    
    res.json({ message: 'Genetic data updated successfully' });
  } catch (error) {
    next(error);
  }
};