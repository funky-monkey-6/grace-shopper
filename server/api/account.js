const router = require('express').Router();
const { User } = require('../db');

router.get('/', (req, res, next) => {
<<<<<<< HEAD
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

module.exports = router;
=======
    User.findAll()
        .then(users => res.send(users))
        .catch(next);
});

module.exports = router
>>>>>>> 26aae8974568fbdd9f70ef38ade8def97a3ca82c
