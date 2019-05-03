const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: true });

const { seedProducts, seedCategories, seedUsers } = require('./seed');

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
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Description must be provided',
      },
    },
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
    // 	notEmpty: {
    // 		args: true,
    // 		msg: 'Category needs a name'
    // 	}
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
Product.hasOne(OrderItem); // ? OrderItem.belongsTo(Product)

Review.belongsTo(Product);
Review.belongsTo(User);

// sync models and seed data
const syncAndSeed = () => {
  return (
    conn
      .sync({ force: true })
      .then(() => {
        return Promise.all([
          Promise.all(seedProducts.map(prod => Product.create(prod))),
          Promise.all(seedCategories.map(cat => Category.create(cat))),
          Promise.all(seedUsers.map(user => User.create(user))),
        ]);
      })
      .then(([products, categories]) => {
        return Promise.all([
          products[0].update({ categoryId: categories[1].id }),
          products[1].update({ categoryId: categories[1].id }),
          products[2].update({ categoryId: categories[0].id }),
          products[3].update({ categoryId: categories[0].id }),
        ]);
      })
      // })
      .catch(err => console.log(err))
  );
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
