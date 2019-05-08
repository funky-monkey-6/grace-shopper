const Sequelize = require('sequelize');
const { conn } = require('../index.js');

// TODO - plan how to configure Order model to handle guest session (authenticated vs non-authenticated)

// order and cart use same model
module.exports = conn.define('order', {
  // from associations: userId
  type: {
    type: Sequelize.ENUM('pickup', 'delivery'),
  },
  subtotal: {
    type: Sequelize.FLOAT,
  },
  shipping: {
    type: Sequelize.FLOAT,
  },
  total: {
    type: Sequelize.FLOAT,
  },
  status: {
    type: Sequelize.ENUM(
      'cart',
      'processing',
      'on hold',
      'completed',
      'cancelled',
      'refunded',
      'failed',
    ),
  },
  date: {
    type: Sequelize.DATE,
  },
  // will probably want to include shipping address
  // payment info
});
