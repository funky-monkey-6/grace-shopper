const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('productVariant', {
  // from associations: productId
  variationName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Variation Name must be provided',
      },
    },
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Quantity must be provided',
      },
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Price must be provided',
      },
    },
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Title must be provided',
      },
    },
  },
});
