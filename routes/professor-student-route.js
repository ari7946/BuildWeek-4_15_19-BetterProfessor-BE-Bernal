const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const db = require('../data/dbConfig.js');

// get all projects
// router.get('/', async (req, res) => {
// const list = [];

// list -> list of students

// list[0].


// });

module.exports = router;