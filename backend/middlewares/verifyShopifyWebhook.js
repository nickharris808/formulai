const crypto = require('crypto');
const { SHOPIFY_WEBHOOK_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const body = req.rawBody; // Express needs to be configured to access raw body

  const generatedHash = crypto
    .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');

  if (generatedHash === hmac) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};