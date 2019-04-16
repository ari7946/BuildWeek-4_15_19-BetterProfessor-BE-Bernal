const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const db = require('../data/dbConfig.js');

router.post('/', async (req, res) => {
  try {
    let user = req.body;
    if (!user.username || !user.password) {
      res.status(400).json({ message: "please fill in all fields" });
    } else {
      console.log("else");
      user.password = bcrypt.hashSync(user.password, 12);
      console.log("bcrypt");
      const id = await db('users').insert(user);
      console.log("id: ", id);
      const token = await generateToken(user);
      console.log("token: ", token);
      res.status(201).json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id
  },
    secret = secrets.jwtSecret;
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options);
}

module.exports = router;