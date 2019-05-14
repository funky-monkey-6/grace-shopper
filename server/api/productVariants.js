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
    .then(variant => console.log(variant.data))
    //.then(variant => res.send(variant))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  console.log(req.params.id);
  ProductVariant.update(req.body, {
    where: { id: req.params.id },
  })
    // (req.params.id)
    //   .then(variant => variant.update(req.body))
    .then(variant => console.log(variant.data))
    .catch(next);
});

module.exports = router;
