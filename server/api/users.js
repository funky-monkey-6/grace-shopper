const router = require('express').Router();
const { User, Order, OrderItem, Product } = require('../db');

// get all users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

//add user
router.post('/adduser/', (req, res, next) => {
  User.create(req.body)
    .then(newUser => res.send(newUser))
    .catch(next);
});

// get cart for specific user (if exists), otherwise create
router.get('/cart', (req, res, next) => {
  console.log('session id:', req.session.userId)
  return Order.findOrCreate({
    where: {
      userId: req.session.userId,
      status: 'cart',
    },
    include: [{
      model: OrderItem,
    }]
  })
    .then(async ([order, created]) => {
      console.log({ created })

      // if (created) {
      const newItem = await OrderItem.create({ where: { orderId: order.id } })
      order.orderItems = newItem
      // res.send(order)
      // }
      // console.log(order.orderItems)
      return order;
      // return order.findAll({
      //   where: {
      //     orderId: order.id
      //   },
      //   include: [{
      //     model: OrderItem,
      //   }]
      // })
    })
    .then(async order => {
      const _order = await Order.findByPk(order.id);
      const _orderWithIncl = await OrderItem.findAll({ where: { orderId: order.id } })
      return _orderWithIncl;

    })
    .then(order => res.send(order))

    // .then(orderWithIncl => {

    //   res.send(orderWithIncl)
    // })

    // Order.findOne({
    //   where: {
    //     userId: req.params.userId,
    //     status: 'cart',
    //   },
    // })
    // .then(cart => res.send(cart))
    .catch(next);
});

// get cart for specific user (if exists), otherwise create
router.get('/:userId/cart', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
    },
    include: [{
      model: OrderItem,
    }]
  })
    .then(async (orders) => {
      let cart = orders.find(order => order.status === 'cart');
      if (cart) {
        return orders;
      }
      cart = await Order.create({
        userId: req.params.userId,
      });
      cart = await Order.findByPk(cart.id, {
        include: [{
          model: OrderItem,
        }]
      });
      return cart;
    })
    // Order.findOne({
    //   where: {
    //     userId: req.params.userId,
    //     status: 'cart',
    //   },
    // })
    .then(cart => res.send(cart))
    .catch(next);
});

// get all orders for specific user
router.get('/:userId/orders', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
    },
  })
    .then(orders => res.send(orders))
    .catch(next);
});

// adding an order for a user (creating a new cart when user adds first item to order)
router.post('/:userId/orders', (req, res, next) => {
  Order.create(req.body)
    .then(order => order.update({ userId: req.params.userId }))
    .then(order => res.send(order))
    .catch(next);
});

// updating an order itself (not order items) (e.g updating order status)
router.put('/:userId/orders/:orderId', (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.send(updatedOrder))
    .catch(next);
});

// deleting an order when user removes everything from cart
router.delete('/:userId/orders/:orderId', (req, res, next) => {
  Order.destroy({
    where: {
      userId: req.params.userId,
      id: req.params.orderId,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

// get all the order items from within an order
router.get('/orders/:orderId/orderItems', (req, res, next) => {
  OrderItem.findAll({
    where: {
      orderId: req.params.orderId,
    },
  })
    .then(orderItems => res.send(orderItems))
    .catch(next);
});

// adding an order item to a specific order
router.post('/:userId/orders/:orderId/orderItem', (req, res, next) => {
  OrderItem.create(req.body)
    .then(orderItem => orderItem.update({ orderId: req.params.orderId }))
    .then(orderItem => res.send(orderItem))
    .catch(next);
});

// updating an order item within an order (e.g. updating quantity in cart)
router.put('/:userId/orders/:orderId/orderItem/:orderItemId', (req, res, next) => {
  OrderItem.update(req.body, {
    returning: true,
    where: {
      id: req.params.orderItemId,
    },
  })
    .then(([rowsUpdated, [updatedOrderItem]]) => res.send(updatedOrderItem))
    .catch(next);
});

// delete orderItem from order
router.delete('/:userId/orders/:orderId/orderItem/:orderItemId', (req, res, next) => {
  OrderItem.destroy({
    where: {
      id: req.params.orderItemId,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
