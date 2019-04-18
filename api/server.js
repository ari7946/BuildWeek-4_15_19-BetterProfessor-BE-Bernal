const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const db = require('../data/dbConfig.js');

// Routes
const loginRouter = require('../routes/login-route.js');
const registerRouter = require('../routes/register-route.js');
const studentsRouter = require('../routes/students-route.js');
const projectsRouter = require('../routes/projects-route.js');
const studentsProjectsRouter = require('../routes/students-projects-route.js');
const profStudentInfoRouter = require('../routes/professor-student-route.js');

require('dotenv').config();

server.use(helmet());
server.use(express.json());
server.use(cors());

const faker = require('faker');

server.get('/', (req, res) => {
  res.send(`${faker.hacker.phrase()}`);
})

// '/api/login'
server.use('/api/login', loginRouter)
server.use('/api/register', registerRouter)
// server.use('/api/logout', logoutRouter)
server.use('/api/students', studentsRouter)
server.use('/api/projects', projectsRouter)
server.use('/api/students-projects', studentsProjectsRouter)
server.use('/api/professor-student-info', profStudentInfoRouter)

server.get('/users', async (req, res) => {
  const users = await db('users');
  res.status(200).json(users);
})

module.exports = server;