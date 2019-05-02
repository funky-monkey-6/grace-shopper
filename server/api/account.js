const router = require('express').Router();
const { User } = require('../db');

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(user))
        .catch(next);
});

module.exports = router