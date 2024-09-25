const express = require('express');
const router = express.Router();
const shopifyController = require('../controllers/shopifyController');
const verifyShopifyWebhook = require('../middlewares/verifyShopifyWebhook');

// Handle Shopify customer creation webhook
router.post('/webhook/customers/create', verifyShopifyWebhook, shopifyController.handleCustomerCreate);

// Handle Shopify order creation webhook (if needed)
router.post('/webhook/orders/create', verifyShopifyWebhook, shopifyController.handleOrderCreate);

// Endpoint to install the Shopify app (if needed)
router.get('/install', shopifyController.installApp);

module.exports = router;