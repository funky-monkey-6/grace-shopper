const conn = require('../conn');
const { Sequelize } = conn;
const OrderItem = require('./OrderItem');
const ProductVariant = require('./ProductVariant');

// TODO - plan how to configure Order model to handle guest session (authenticated vs non-authenticated)

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
    type: Sequelize.STRING,
    // validate: {
    //   len: {
    //     args: [5],
    //     msg: 'Zip code must be at least 5 digits',
    //   },
    // },
  },
  // will probably want to include shipping address
  // payment info
});

Order.findOrCreateCart = function (userId) {
  return this.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: OrderItem,
        include: [{ model: ProductVariant }],
      },
    ],
  }).then(async orders => {
    let cart = orders.find(order => order.status === 'cart');
    if (cart) {
      return cart;
    }
    cart = await this.create({
      userId,
    });
    const orderItem = await OrderItem.create({
      orderId: cart.id,
      //
    });
    cart = await this.findByPk(cart.id, {
      include: [OrderItem],
    });
    return cart;
  });
};

module.exports = {
  Order,
};
