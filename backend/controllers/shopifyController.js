const shopifyService = require('../services/shopifyService');

exports.handleCustomerCreate = async (req, res, next) => {
  try {
    const customer = req.body;
    await shopifyService.handleCustomerCreation(customer);
    res.status(200).send('Customer processed successfully');
  } catch (error) {
    console.error('Error handling Shopify customer creation:', error);
    next(error);
  }
};

exports.handleCustomerUpdate = async (req, res, next) => {
  try {
    const customer = req.body;
    await shopifyService.handleCustomerUpdate(customer);
    res.status(200).send('Customer update processed successfully');
  } catch (error) {
    console.error('Error handling Shopify customer update:', error);
    next(error);
  }
};

exports.handleOrderCreate = async (req, res, next) => {
  try {
    const order = req.body;
    await shopifyService.handleOrderCreation(order);
    res.status(200).send('Order processed successfully');
  } catch (error) {
    console.error('Error handling Shopify order creation:', error);
    next(error);
  }
};