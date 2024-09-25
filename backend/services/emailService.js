const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: config.EMAIL_SECURE,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (to, token) => {
  try {
    const info = await transporter.sendMail({
      from: '"Your App" <noreply@yourapp.com>',
      to: to,
      subject: 'Verify Your Email',
      text: `Please verify your email by clicking on this link: ${config.APP_URL}/verify?token=${token}`,
      html: `<p>Please verify your email by clicking on this link: <a href="${config.APP_URL}/verify?token=${token}">Verify Email</a></p>`,
    });
    console.log('Verification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

exports.sendPersonalizationUpdateEmail = async (to, productIds) => {
  try {
    const info = await transporter.sendMail({
      from: '"Your App" <noreply@yourapp.com>',
      to: to,
      subject: 'Your Personalized Recommendations Have Been Updated',
      text: `We've updated your personalized recommendations for the following products: ${productIds.join(', ')}. Visit our store to see your new recommendations!`,
      html: `<p>We've updated your personalized recommendations for the following products: ${productIds.join(', ')}. <a href="${config.SHOP_URL}">Visit our store</a> to see your new recommendations!</p>`,
    });
    console.log('Personalization update email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending personalization update email:', error);
    throw error;
  }
};