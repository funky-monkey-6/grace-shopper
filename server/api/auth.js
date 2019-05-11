const router = require('express').Router();
const { User } = require('../db/index');
module.exports = router;

router.delete('/logout', (req, res) => {
  req.session.destroy(() => res.sendStatus(204).end());
});

// router.get('/', (req, res, next) => {
//   if (!req.session.userId) {
//     const error = new Error('not logged in');
//     error.status = 401;
//     return next(error);
//   }
//   res.send(req.session.userId);
// });

const userNotFound = next => {
  const err = new Error('User not found');
  err.tatus = 404;
  next(err);
};

router.get('/user', (req, res, next) => {
  if (!req.session.userId) {
    userNotFound(next);
  }
  User.findByPk(Number(req.session.userId))
    .then(user => (user ? res.json(user) : userNotFound(next)))
    .catch(next);
});

router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
    .then(user => {
      if (!user) {
        const error = new Error('Incorrect email or password');
        error.status = 401;
        throw error;
      }
      req.session.userId = user.id;
      res.send(user);
    })
    .catch(next);
});
