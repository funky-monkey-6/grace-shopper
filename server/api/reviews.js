const router = require('express').Router();
const { Review, User } = require('../db');

// api/reviews: get all reviews
router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.send(reviews))
    .catch(next);
});

// api/reviews/productId: get all reviews for a product
router.get('/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId,
    },
  })
    .then(reviews => res.send(reviews))
    .catch(next);
});

// api/reviews: create review
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(201).send(review))
    .catch(next);
});

module.exports = router;
