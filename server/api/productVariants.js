const router = require('express').Router();
const { Product, ProductVariant } = require('../db');

router.get('/', (req, res, next) => {
  ProductVariant.findAll({
    include: [{ model: Product }],
  })
    .then(variants => res.send(variants))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  ProductVariant.findByPk(req.params.id, { include: [{ model: Product }] })
    .then(variant => res.send(variant))
    .catch(next);
});

module.exports = router;
