// 1 touch controllers/auth.js

// 2 require user model
const User = require('../models/user');

// 5 require jwt pkg
const jwt = require('jsonwebtoken');

// 6 we also need a secret
// const secret = require('../config/environment').secret;
const { secret } = require('../config/environment');


function registerRoute(req, res, next) {
  User
  .create(req.body)
  .then(() => res.json({ message: 'Registration Successful'}))
  .catch(next);
}


function loginRoute(req, res, next) {
  User
  .findOne({ email: req.body.email})
  .then((user) => {
    if(!user || !user.validatePassword(req.body.password)) return res.unauthorized();

    // 3 to generate our jwt: npm i --save jsonwebtoken
    // 4 npm i --save bcrypt
    // 7 lets make out token
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
    res.json({ token, message: `Welcome back ${user.username}`});
  })
  .catch(next);
}

module.exports = {
  register: registerRoute,
  login: loginRoute
};

// we need to create a routes now --> config/routes.js
