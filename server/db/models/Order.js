const conn = require('../conn');
const { Sequelize } = conn;

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
  shippingAddress: {
    type: Sequelize.STRING,
  },
  shippingCity: {
    type: Sequelize.STRING,
  },
  shippingState: {
    type: Sequelize.STRING,
    // validate: {
    //   len: {
    //     args: [2, 2],
    //     msg: 'Please enter a valid state',
    //   },
    // },
  },
  shippingZip: {
    type: Sequelize.STRING,
    // validate: {
    //   len: {
    //     args: [5],
    //     msg: 'Zip code must be at least 5 digits',
    //   },
    // },
  },
  // will probably want to include shipping address
  // payment info
});
