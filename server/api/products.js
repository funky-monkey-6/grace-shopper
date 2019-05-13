const router = require('express').Router();
const { Product, ProductVariant } = require('../db');

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{ model: ProductVariant }],
  })
    .then(products => res.send(products))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id, { include: [{ model: ProductVariant }] })
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

router.delete('/:id', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
