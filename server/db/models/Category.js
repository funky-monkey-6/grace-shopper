const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('category', {
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    // notEmpty: {
    // args: true,
    // msg: 'Category needs a name'
    // }
    // }
  },
});
