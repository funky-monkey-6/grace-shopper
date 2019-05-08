const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: 'Valid email must be provided',
      },
      notEmpty: {
        args: true,
        msg: 'Email must be provided',
      },
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  userType: {
    type: Sequelize.ENUM('customer', 'admin'),
    allowNull: false,
    defaultValue: 'customer',
    validate: {
      notEmpty: {
        args: true,
        msg: 'User type must be selected',
      },
    },
  },
  // address ?
});
