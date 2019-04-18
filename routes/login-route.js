const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const db = require('../data/dbConfig.js');

router.post('/', async (req, res) => {
  console.log('Login Route')
  try {
    let { username, password } = req.body;
    console.log('Username: ', username);
    console.log('password: ', password);
    const user = await db('users').where({ username }).first();
    console.log('user: ', user);
    if (user && bcrypt.compareSync(password, user.password)) {
      console.log('true');
      const token = generateToken(user);
      console.log('token: ', token);
      res.status(200).json({ token })
    } else {
      console.log('error 401');
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    console.log('error 500');
    res.status(500).json({ message: "internal server error" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id
  },
    secret = secrets.jwtSecret;
  const options = {
    expiresIn: '1d', I
  }
  return jwt.sign(payload, secret, options);
}

module.exports = router;