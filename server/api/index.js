const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/auth', require('./auth'));
module.exports = router;
