const conn = require('../conn');
const { Sequelize } = conn;
<<<<<<< HEAD
const OrderItem = require('./OrderItem');
=======
const OrderItem = require('./OrderItem')
>>>>>>> c2de50ef30d1eb0516a07e882c18d6017a04b307

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
  // will probably want to include shipping address
  // payment info
});

Order.findOrCreateCart = function (userId) {
  return this.findAll({
    where: {
      userId,
    },
<<<<<<< HEAD
    include: [
      {
        model: OrderItem,
      },
    ],
  }).then(async orders => {
    let cart = orders.find(order => order.status === 'cart');
    if (cart) {
      return orders;
    }
    cart = await this.create({
      userId,
    });
    const orderItem = await OrderItem.create({
      orderId: cart.id,
      //
    });
    cart = await this.findByPk(cart.id, {
      include: [conn.OrderItem],
    });
    return cart;
  });
=======
    include: [{
      model: OrderItem,
    }]
  })
    .then(async (orders) => {
      let cart = orders.find(order => order.status === 'cart');
      if (cart) {
        return orders;
      }
      cart = await this.create({
        userId: userId
      });
      const orderItem = await OrderItem.create({
        orderId: cart.id
        // 
      })
      cart = await this.findByPk(cart.id, {
        include: [conn.OrderItem]
      });
      return cart;
    })
>>>>>>> c2de50ef30d1eb0516a07e882c18d6017a04b307
};

module.exports = {
  Order,
};
