const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const config = require('../config');

const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateProductDescription = async (user, surveyResponses, geneticContext, product) => {
  try {
    let prompt = `Generate a personalized product description based on the following information:\n\n`;
    prompt += `User Survey Responses: ${JSON.stringify(surveyResponses)}\n\n`;
    prompt += `Genetic Context: ${JSON.stringify(geneticContext)}\n\n`;
    prompt += `Product Information: ${JSON.stringify(product)}\n\n`;
    prompt += `Please provide a JSON response with the following structure:
    {
      "potential_benefits": ["benefit1", "benefit2", ...],
      "potential_side_effects": ["side_effect1", "side_effect2", ...],
      "score": (a number between 0 and 10)
    }`;

    const response = await openai.createCompletion({
      model: "gpt-40-mini",
      prompt: prompt,
      max_tokens: 1500,
      temperature: 0.7,
      response_format: {
        type: "json_schema",
        json_schema: {
          type: "object",
          properties: {
            potential_benefits: { type: "array", items: { type: "string" } },
            potential_side_effects: { type: "array", items: { type: "string" } },
            score: { type: "number" }
          },
          required: ["potential_benefits", "potential_side_effects", "score"],
          additionalProperties: false
        },
        strict: true
      }
    });

    const generatedContent = response.choices[0].message.parsed;
    return generatedContent;
  } catch (error) {
    console.error('Error generating product description:', error);
    throw error;
  }
};

exports.generateGeneticContext = async (geneticData) => {
  try {
    let prompt = `Generate context for the following genetic data:\n\n${JSON.stringify(geneticData)}\n\n`;
    prompt += `Please provide a JSON response with the following structure:
    [
      {
        "gene": "geneName",
        "variant": "variantName",
        "context": "Detailed explanation of the variant's significance"
      },
      ...
    ]`;

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const geneticContext = JSON.parse(response.data.choices[0].text.trim());
    return geneticContext;
  } catch (error) {
    console.error('Error generating genetic context:', error);
    throw error;
  }
};