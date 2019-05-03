const router = require('express').Router();
const { User, Order, OrderItem } = require('../db');

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

// get all orders for specific user
router.get('api/users/:id/orders', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.id,
    },
  })
    .then(orders => res.send(orders))
    .catch(next);
});

// adding an order for a user (creating a new cart when user adds first item to order)
router.post('api/users/:id/orders', (req, res, next) => {
  Order.create(req.body)
    .then(order => order.update({ userId: req.params.id }))
    .then(order => res.status(201).send(order))
    .catch(next);
});

// updating an order a whole (e.g updating order status)
router.put('/api/users/:userId/orders/:id', (req, res, next) => {
  Order.update(req.body, {
    where: {
      userId: req.params.userId,
      id: req.params.id,
    },
  })
    .then(order => res.status(201).send(order))
    .catch(next);
});

// deleting an order when user removes everything from cart
router.delete('/api/users/:userId/orders/:id', (req, res, next) => {
  Order.destroy({
    where: {
      userId: req.params.userId,
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

// get all the order items from within an order
router.get('/api/users/:userId/orders/:orderId', (req, res, next) => {
  OrderItem.get({
    where: {
      orderId: req.params.orderId,
    },
  })
    .then(orderItems => res.send(orderItems))
    .catch(next);
});

// adding an order item to a specific order
router.post('/api/users/:userId/orders/:orderId/orderItem', (req, res, next) => {
  OrderItem.create(req.body)
    .then(orderItem => orderItem.update({ orderId: req.params.orderId }))
    .then(orderItem => res.status(201).send(orderItem))
    .catch(next);
});

// updating an order item within an order (e.g. updating quantity in cart)
router.put('/api/users/:userId/orders/:orderId/orderItem/:id', (req, res, next) => {
  OrderItem.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(orderItem => res.status(201).send(orderItem))
    .catch(next);
});

// delete order item from order
router.delete('/api/users/:userId/orders/:orderId/orderItem/:id', (req, res, next) => {
  OrderItem.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
