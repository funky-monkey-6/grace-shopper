const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('review', {
  // from associations: productId, userId
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: {
        args: 1,
        msg: 'Rating must be between 1 and 5',
      },
      max: {
        args: 5,
        msg: 'Rating must be between 1 and 5',
      },
    },
  },
  comment: {
    type: Sequelize.TEXT,
    validate: {
      len: {
        args: 20,
        msg: 'Your review must be at least 20 characters long.',
      },
    },
  },
});
