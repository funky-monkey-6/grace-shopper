const router = require('express').Router();
const { OrderItem } = require('../db');

router.get('/', (req, res, next) => {
  OrderItem.findAll()
    .then(orderItems => res.send(orderItems))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  OrderItem.findByPk(req.params.id)
    .then(item => item.update(req.body))
    .then(item => res.send(item))
    .catch(next);
});

module.exports = router;
