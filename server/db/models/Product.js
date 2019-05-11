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
  images: {
    type: Sequelize.STRING,
    defaultValue: 'image.png',
  },
});
