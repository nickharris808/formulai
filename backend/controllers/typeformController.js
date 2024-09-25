const { v4: uuidv4 } = require('uuid');
const TypeformSubmission = require('../models/TypeformSubmission');
const encryption = require('../utils/encryption');
const validation = require('../utils/validation');
const config = require('../config');

exports.handleSubmission = async (req, res, next) => {
  try {
    // Validate incoming data
    const { email, geneticData, surveyResponses } = await validation.validateTypeformSubmission(req.body);

    // Generate a unique token
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Encrypt sensitive data
    const encryptedGeneticData = geneticData ? encryption.encrypt(JSON.stringify(geneticData)) : null;
    const encryptedSurveyResponses = encryption.encrypt(JSON.stringify(surveyResponses));

    // Save Typeform submission
    await TypeformSubmission.create({
      submission_id: uuidv4(),
      token,
      email,
      genetic_data: encryptedGeneticData,
      survey_responses: encryptedSurveyResponses,
      created_at: new Date(),
      expires_at: expiresAt,
      is_used: false,
    });

    // Generate Shopify account creation URL
    const shopifySignupURL = `https://${config.SHOPIFY_STORE}.myshopify.com/account/register?token=${token}`;

    // Redirect to Shopify account creation
    res.redirect(shopifySignupURL);
  } catch (error) {
    console.error('Error handling Typeform submission:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Invalid submission data' });
    }
    next(error);
  }
};

exports.handleWebhook = async (req, res, next) => {
  try {
    // Verify Typeform webhook signature
    if (!verifyTypeformWebhook(req)) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const { form_response } = req.body;

    // Extract and process form data
    const email = form_response.answers.find(answer => answer.field.type === 'email').email;
    const geneticData = extractGeneticData(form_response);
    const surveyResponses = extractSurveyResponses(form_response);

    // Process the submission
    await this.handleSubmission({ body: { email, geneticData, surveyResponses } }, res, next);
  } catch (error) {
    console.error('Error handling Typeform webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function verifyTypeformWebhook(req) {
  const signature = req.get('Typeform-Signature');
  // Implement signature verification logic here
  // Return true if valid, false otherwise
  return true; // Placeholder
}

function extractGeneticData(formResponse) {
  // Implement logic to extract genetic data from form response
  // Return null if no genetic data provided
  return null; // Placeholder
}

function extractSurveyResponses(formResponse) {
  // Implement logic to extract survey responses from form response
  return {}; // Placeholder
}