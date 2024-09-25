const personalizationService = require('../services/personalizationService');

exports.getPersonalizedProductDescription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const personalizedDescription = await personalizationService.getPersonalizedProductDescription(userId, productId);
    res.json(personalizedDescription);
  } catch (error) {
    next(error);
  }
};

exports.getPersonalizedBlogPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const blogPostId = req.params.blogPostId;
    const personalizedBlogPost = await personalizationService.getPersonalizedBlogPost(userId, blogPostId);
    res.json(personalizedBlogPost);
  } catch (error) {
    next(error);
  }
};

exports.getPersonalizedProductScores = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productScores = await personalizationService.getPersonalizedProductScores(userId);
    res.json(productScores);
  } catch (error) {
    next(error);
  }
};

exports.regeneratePersonalizedContent = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await personalizationService.regeneratePersonalizedContent(userId);
    res.json({ message: 'Personalized content regenerated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getPersonalizationStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const status = await personalizationService.getPersonalizationStatus(userId);
    res.json(status);
  } catch (error) {
    next(error);
  }
};