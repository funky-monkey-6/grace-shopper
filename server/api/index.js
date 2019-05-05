const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
<<<<<<< HEAD
router.use('/reviews', require('./reviews'));

// TO DO - router.use('/cart', require('./cart'));
// TO DO - router.use('/account', require('./account'));

=======
router.use('/auth', require('./auth'));
>>>>>>> Sessions set up
module.exports = router;
