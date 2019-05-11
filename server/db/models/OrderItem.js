const conn = require('../conn');
const { Sequelize } = conn;

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