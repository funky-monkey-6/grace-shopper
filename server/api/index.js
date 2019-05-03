const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/categories', require('./categories'));
router.use('/reviews', require('./reviews'));

// TO DO - router.use('/cart', require('./cart'));
// TO DO - router.use('/account', require('./account'));

module.exports = router;
