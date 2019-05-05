const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
<<<<<<< HEAD
<<<<<<< HEAD
router.use('/reviews', require('./reviews'));

// TO DO - router.use('/cart', require('./cart'));
// TO DO - router.use('/account', require('./account'));

=======
router.use('/auth', require('./auth'));
>>>>>>> Sessions set up
=======
router.use('/auth', require('./auth'));
>>>>>>> ee587033d55d06221bfcf4441abfea73caa00a72
module.exports = router;
