const router = require('express').Router();
const { Review } = require('../db');

router.get('/:productId', (req, res, next) => {
    Review.findAll({
        where: {
            productId: req.params.productId
        }
    })
        .then(reviews => res.send(reviews))
        .catch(next);
});

module.export = router;
