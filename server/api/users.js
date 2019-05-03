const router = require('express').Router();
const { User } = require('../db');

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

// TODO - for cart/order functionality:

// router.get(‘api/users/:id/orders’)
// router.post(‘api/users/:id/orders’)
// router.put(‘/api/users/:userId/orders/:id’)
// router.post(‘/api/users/:userId/orders/:id/orderItem’)
// router.put(‘/api/users/:userId/orders/:id/orderItem/:orderItemId’)
// router.delete(‘/api/users/:userId/orders/:id/orderItem/:orderItemId’)

module.exports = router;
