const Sequelize = require('sequelize');
const { conn } = require('../index.js');

module.exports = conn.define('orderitem', {
  // from associations: orderId, productId
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  // discount ?
});
