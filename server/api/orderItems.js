const router = require('express').Router();
const { OrderItem } = require('../db');

router.get('/', (req, res, next) => {
  OrderItem.findAll()
    .then(orderItems => res.send(orderItems))
    .catch(next);
});

module.exports = router;
