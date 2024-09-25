const crypto = require('crypto');

exports.generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

exports.generateExpiringToken = (expirationMinutes = 60) => {
  const token = this.generateToken();
  const expiresAt = new Date(Date.now() + expirationMinutes * 60000);
  return { token, expiresAt };
};

exports.verifyToken = (token, storedToken, expiresAt) => {
  if (!storedToken || !expiresAt) {
    return false;
  }
  const now = new Date();
  return token === storedToken && now < new Date(expiresAt);
};