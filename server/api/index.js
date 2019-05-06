const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/reviews', require('./reviews'));
router.use('/auth', require('./auth'));

// TO DO - router.use('/cart', require('./cart'));
// TO DO - router.use('/account', require('./account'));

module.exports = router;
