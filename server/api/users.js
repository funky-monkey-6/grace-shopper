const router = require('express').Router();
const { User, Order, OrderItem } = require('../db');

// get all users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

// get cart for specific user (if exists)
router.get('/:userId/cart', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
      status: 'cart'
    },
  })
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
  Order.update(req.body, {
    returning: true,
    where: {
      userId: req.params.userId,
      id: req.params.orderId,
    },
  })
    .then(([rowsUpdated, [updatedOrder]]) => res.send(updatedOrder))
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
router.get('/:userId/orders/:orderId/orderItems', (req, res, next) => {
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

// delete order item from order
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
