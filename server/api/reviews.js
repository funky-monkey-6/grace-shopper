
const router = require('express').Router();
const { Review } = require('../db');

// api/reviews: get all reviews
router.get('/', (req, res, next) => {
    Review.findAll()
        .then(reviews => res.send(reviews))
        .catch(next)
})

// api/reviews/productId: get all reviews for a product
router.get('/:productId', (req, res, next) => {
    Review.findAll({
        where: {
            productId: req.params.productId
        }
    })
        .then(reviews => res.send(reviews))
        .catch(next);
});

module.exports = router;
