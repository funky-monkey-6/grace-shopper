/* eslint-disable no-console */

const conn = require('./conn');

const seed = require('./seed');
const {
  seedCategories,
  seedOrders,
  seedOrderItems,
  seedProducts,
  seedReviews,
  seedUsers,
  seedProductVariants,
} = seed;

const { Category, Order, OrderItem, Product, Review, User, ProductVariant } = require('./models');

const updateProdCatId = (prods, seedProds, cats) => {
  return prods.map(prod => {
    const seedProdCat = seedProds.find(seedProd => seedProd.title === prod.title).category;

    const catId = cats.find(cat => {
      return cat.name === seedProdCat;
    }).id;

    return prod.update({ categoryId: catId });
  });
};

const updateVariantProdId = (variants, prods) => {
  return variants.map(variant => {
    const product = prods.find(prod => prod.title === variant.productName);
    const productId = product ? product.id : null;
    return variant.update({ productId });
  });
};

// sync models and seed data
const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() => {
      return Promise.all([
        Promise.all(seedProducts.map(prod => Product.create(prod))),
        Promise.all(seedCategories.map(cat => Category.create(cat))),
        Promise.all(seedUsers.map(user => User.create(user))),
        Promise.all(seedOrders.map(order => Order.create(order))),
        Promise.all(seedReviews.map(review => Review.create(review))),
        Promise.all(seedProductVariants.map(variant => ProductVariant.create(variant))),
      ]);
    })
    .then(([products, categories, users, orders, reviews, productVariants]) => {
      return Promise.all([
        Promise.all(
          seedOrderItems.map(item => {
            // eslint-disable-next-line no-param-reassign
            item.price = products.find(prod => prod.id === item.productId).price;
            return OrderItem.create(item);
          }),
        ),
        Promise.all(updateProdCatId(products, seedProducts, categories)),
        Promise.all(updateVariantProdId(productVariants, products)),
      ]);
    })
  // .catch(err => console.log(err));
};

module.exports = {
  syncAndSeed,
  Category,
  Order,
  OrderItem,
  Product,
  Review,
  User,
  ProductVariant,
};
