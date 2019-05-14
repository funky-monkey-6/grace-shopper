const router = require('express').Router();
const { Order, OrderItem } = require('../db');

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findByPk(req.params.id, { include: [{ model: OrderItem }] })
    .then(order => res.send(order))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Order.findByPk(req.params.id)
    .then(order => order.update(req.body))
    .then(order => res.send(order))
    .catch(next);
});

module.exports = router;
