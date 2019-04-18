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
  console.log("generateToken Running")
  console.log("user: ", user);
  const payload = {
    subject: user.id
  }
  console.log("payload: ", payload);
  secret = secrets.jwtSecret;
  console.log("secret: ", secret);
  const options = {
    expiresIn: '1d', I
  }
  console.log("options: ", options);
  return jwt.sign(payload, secret, options);
}

module.exports = router;