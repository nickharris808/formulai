const axios = require('axios');
const config = require('../config');

const shopifyApi = axios.create({
  baseURL: `https://${config.SHOPIFY_STORE}.myshopify.com/admin/api/2023-04`,
  headers: {
    'X-Shopify-Access-Token': config.SHOPIFY_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
});

exports.createCustomer = async (customerData) => {
  try {
    const response = await shopifyApi.post('/customers.json', {
      customer: customerData,
    });
    return response.data.customer;
  } catch (error) {
    console.error('Error creating Shopify customer:', error);
    throw error;
  }
};

exports.getProduct = async (productId) => {
  try {
    const response = await shopifyApi.get(`/products/${productId}.json`);
    return response.data.product;
  } catch (error) {
    console.error('Error fetching Shopify product:', error);
    throw error;
  }
};

exports.updateProductMetafields = async (productId, metafields) => {
  try {
    const response = await shopifyApi.post(`/products/${productId}/metafields.json`, {
      metafield: metafields,
    });
    return response.data.metafield;
  } catch (error) {
    console.error('Error updating Shopify product metafields:', error);
    throw error;
  }
};

exports.getAllProducts = async () => {
  try {
    const response = await shopifyApi.get('/products.json');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching all Shopify products:', error);
    throw error;
  }
};