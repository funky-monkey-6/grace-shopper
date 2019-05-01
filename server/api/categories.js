const router = require('express').Router();
const { Category, Product } = require('../db');

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
});

router.get('/:categoryId', (req, res, next) => {
  Product.findAll({
    where: {
      categoryId: req.params.categoryId,
    },
  })
    .then(products => res.send(products))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.status(201).send(category))
    .catch(next);
});

router.delete('/:categoryId', (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.categoryId,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
