const seedCategories = require('./seedCategories');
const { seedOrders } = require('./seedOrders');
const { seedOrderItems } = require('./seedOrders');
const seedProducts = require('./seedProducts');
const seedReviews = require('./seedReviews');
const seedUsers = require('./seedUsers');
const seedProductVariants = require('./seedProductVariants');

module.exports = {
  seedCategories,
  seedOrders,
  seedOrderItems,
  seedProducts,
  seedReviews,
  seedUsers,
  seedProductVariants,
};
