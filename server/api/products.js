const router = require('express').Router();
const { Product } = require('../db');

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => res.send(product))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).send(product))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next);
});

module.exports = router;