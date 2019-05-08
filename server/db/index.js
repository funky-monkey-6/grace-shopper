/* eslint-disable no-console */
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false });

const seedProducts = require('./seed/seedProducts');
const seedCategories = require('./seed/seedCategories');
const seedUsers = require('./seed/seedUsers');
const seedReviews = require('./seed/seedReviews');
const { seedOrders, seedOrderItems } = require('./seed/seedOrders');

// Models:

const Product = conn.define('product', {
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
  variationName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Variation Name must be provided',
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
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Quantity must be provided',
      },
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Price must be provided',
      },
    },
  },
  images: {
    type: Sequelize.STRING,
    defaultValue: 'image.png',
  },
});

const Category = conn.define('category', {
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

const User = conn.define('user', {
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

// TODO - plan how to configure Order model to handle guest session (authenticated vs non-authenticated)

// order and cart use same model
const Order = conn.define('order', {
  // from associations: userId
  type: {
    type: Sequelize.ENUM('pickup', 'delivery'),
  },
  subtotal: {
    type: Sequelize.FLOAT,
  },
  shipping: {
    type: Sequelize.FLOAT,
  },
  total: {
    type: Sequelize.FLOAT,
  },
  status: {
    type: Sequelize.ENUM(
      'cart',
      'processing',
      'on hold',
      'completed',
      'cancelled',
      'refunded',
      'failed',
    ),
  },
  date: {
    type: Sequelize.DATE,
  },
  // will probably want to include shipping address
  // payment info
});

const OrderItem = conn.define('orderitem', {
  // from associations: orderId, productId
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  // discount ?
});

const Review = conn.define('review', {
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

const updateProdCatId = (prods, seedProds, cats) => {
  return prods.map(prod => {
    const seedProdCat = seedProds.find(seedProd => seedProd.title === prod.title).category;

    const catId = cats.find(cat => {
      return cat.name === seedProdCat;
    }).id;

    return prod.update({ categoryId: catId });
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
      ]);
    })
    .then(([products, categories, users, orders]) => {
      return Promise.all([
        Promise.all(
          seedOrderItems.map(item => {
            // eslint-disable-next-line no-param-reassign
            item.price = products.find(prod => prod.id === item.productId).price;
            return OrderItem.create(item);
          }),
        ),
        Promise.all(updateProdCatId(products, seedProducts, categories)),
      ]);
    })
    .catch(err => console.log(err));
};

module.exports = {
  syncAndSeed,
  Product,
  Category,
  User,
  Order,
  OrderItem,
  Review,
};
