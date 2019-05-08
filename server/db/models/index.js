const Product = require('./Product');
const Category = require('./Category');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Review = require('./Review');
const User = require('./User');

// Associations:

Product.belongsTo(Category);
Category.hasMany(Product);

Order.belongsTo(User);
User.hasMany(Order);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
Product.hasOne(OrderItem);

Review.belongsTo(Product);
Review.belongsTo(User);

module.exports = { Product, Category, Order, OrderItem, Review, User };
