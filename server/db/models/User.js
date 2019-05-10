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
  phone: {
    type: Sequelize.INTEGER,
    allowNull: true,
    // validate: {
    //   len: {
    //     args: [10, 10],
    //     msg: 'Invalid phone number',
    //   },
    // },
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
    type: Sequelize.INTEGER,
    // validate: {
    //   len: {
    //     args: [5],
    //     msg: 'Zip code must be at least 5 digits',
    //   },
    // },
  },
  billingFirstName: {
    type: Sequelize.STRING,
  },
  billingLastName: {
    type: Sequelize.STRING,
  },
  billingAddress: {
    type: Sequelize.STRING,
  },
  billingCity: {
    type: Sequelize.STRING,
  },
  billingState: {
    type: Sequelize.STRING,
    // validate: {
    //   len: {
    //     args: [2],
    //     msg: 'Please enter a valid state',
    //   },
    // },
  },
  billingZip: {
    type: Sequelize.INTEGER,
    // validate: {
    //   len: {
    //     args: [5],
    //     msg: 'Zip code must be at least 5 digits',
    //   },
    // },
  },
  ccNumber: {
    type: Sequelize.INTEGER,
  },
});
