const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('product', {
  // from associations: categoryId
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Title must be provided',
      },
    },
  },
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
  description: {
    type: Sequelize.TEXT,
    // allowNull: false,
    // validate: {
    // notEmpty: {
    // args: true,
    // msg: 'Description must be provided'
    // }
    // }
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
  images: {
    type: Sequelize.STRING,
    defaultValue: 'image.png',
  },
});
