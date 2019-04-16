const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const db = require('../data/dbConfig.js');

// Routes
const loginRouter = require('../routes/login-route.js');
const registerRouter = require('../routes/register-route.js');

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
// server.use('/api/students', studentsRouter)
// server.use('/api/projects', projectsRouter)

server.get('/users', async (req, res) => {
  const users = await db('users');
  res.status(200).json(users);
})
// server.get('/api/projects', async (req, res) => {
//   const projects = await db('projects');
//   res.status(200).json(projects);
// })
// server.get('/api/students', async (req, res) => {
//   const students = await db('students');
//   res.status(200).json(students);
// })
// server.get('/api/messages', async (req, res) => {
//   const messages = await db('messages');
//   res.status(200).json(messages);
// })
// server.get('/api/student-projects', async (req, res) => {
//   const studentsProjects = await db('student_project');
//   res.status(200).json(studentsProjects);
// })



module.exports = server;