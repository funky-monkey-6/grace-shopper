const Sequelize = require('sequelize');
const { conn } = require('../index.js');

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
