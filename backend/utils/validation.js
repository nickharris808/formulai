const { z } = require('zod');

const surveyResponseSchema = z.object({
  age: z.number().int().min(18).max(120),
  gender: z.enum(['male', 'female', 'other']),
  healthGoals: z.array(z.string()).min(1),
  // Add more fields as needed
});

const geneticDataSchema = z.object({
  // Define the structure of your genetic data
  // This is a placeholder and should be adjusted based on your actual data structure
  data: z.string(),
});

exports.validateSurveyResponses = (data) => {
  return surveyResponseSchema.parse(data);
};

exports.validateGeneticData = (data) => {
  return geneticDataSchema.parse(data);
};

exports.validateEmail = (email) => {
  return z.string().email().parse(email);
};

exports.validateShopifyCustomer = (customer) => {
  const shopifyCustomerSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    // Add more fields as needed
  });

  return shopifyCustomerSchema.parse(customer);
};

exports.validatePersonalizedContent = (content) => {
  const personalizedContentSchema = z.object({
    potential_benefits: z.array(z.string()),
    potential_side_effects: z.array(z.string()),
    score: z.number().int().min(0).max(10),
  });

  return personalizedContentSchema.parse(content);
};