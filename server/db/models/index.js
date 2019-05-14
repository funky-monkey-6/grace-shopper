const Product = require('./Product');
const ProductVariant = require('./ProductVariant');
const Category = require('./Category');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Review = require('./Review');
const User = require('./User');

// Associations:

Product.belongsTo(Category);
Category.hasMany(Product);

ProductVariant.belongsTo(Product);
Product.hasMany(ProductVariant);

Order.belongsTo(User);
User.hasMany(Order);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
ProductVariant.hasOne(OrderItem);
OrderItem.belongsTo(ProductVariant);

Review.belongsTo(Product);
Review.belongsTo(User);

module.exports = { Product, Category, Order, OrderItem, Review, User, ProductVariant };
