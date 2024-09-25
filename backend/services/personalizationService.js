const openaiService = require('./openaiService');
const shopifyService = require('./shopifyService');
const PersonalizedContent = require('../models/PersonalizedContent');
const { v4: uuidv4 } = require('uuid');

exports.generatePersonalizedContent = async (user, surveyResponses, geneticContext) => {
  try {
    const products = await shopifyService.getAllProducts();
    const personalizedContents = [];

    for (const product of products) {
      const personalizedDescription = await openaiService.generateProductDescription(
        user,
        surveyResponses,
        geneticContext,
        product
      );

      const personalizedContent = {
        content_id: uuidv4(),
        user_id: user.user_id,
        product_id: product.id,
        content_type: 'product',
        personalized_benefits: JSON.stringify(personalizedDescription.potential_benefits),
        personalized_side_effects: JSON.stringify(personalizedDescription.potential_side_effects),
        score: personalizedDescription.score,
        generated_at: new Date(),
      };

      personalizedContents.push(personalizedContent);

      // Update product metafields with personalized content
      await shopifyService.updateProductMetafields(product.id, {
        namespace: 'personalization',
        key: `user_${user.user_id}`,
        value: JSON.stringify(personalizedDescription),
        type: 'json',
      });
    }

    // Bulk create personalized content in the database
    await PersonalizedContent.bulkCreate(personalizedContents);

    return personalizedContents;
  } catch (error) {
    console.error('Error generating personalized content:', error);
    throw error;
  }
};

exports.getPersonalizedContentForUser = async (userId, productId = null) => {
  try {
    const query = { user_id: userId };
    if (productId) {
      query.product_id = productId;
    }

    const personalizedContents = await PersonalizedContent.findAll({ where: query });
    return personalizedContents;
  } catch (error) {
    console.error('Error fetching personalized content:', error);
    throw error;
  }
};

exports.updatePersonalizedContent = async (user, surveyResponses, geneticContext) => {
  try {
    // Delete existing personalized content for the user
    await PersonalizedContent.destroy({ where: { user_id: user.user_id } });

    // Generate new personalized content
    const newPersonalizedContents = await this.generatePersonalizedContent(user, surveyResponses, geneticContext);

    return newPersonalizedContents;
  } catch (error) {
    console.error('Error updating personalized content:', error);
    throw error;
  }
};