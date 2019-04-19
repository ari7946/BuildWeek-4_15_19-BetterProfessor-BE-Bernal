const request = require('supertest');
const server = require('../api/server.js');
const projects = require('./login-route.js');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

let token;
const pass = bcrypt.hashSync('pass', 12);
beforeAll(async (done) => {
  await db('users').truncate();
  request(server).post('/api/login').send({ username: "test", password: pass }).end((err, response) => {
    token = response.body.token; // save the token
    done();
  })
})

describe('Projects Route', () => {
  describe('GET /api/projects', () => {

    it('Route Restriction should return status code ', async () => {
      return request(server).get('/api/projects').then(res => {
        expect(res.statusCode).toBe(401);
      })
    })

    it('Route Restriction should return status code ', async () => {
      return request(server).get('/api/projects').set('Authorization', `${token}`).then(res => {
        expect(res.status).toBe(200);
      })
    })

    it('should return JSON', () => {
      return request(server).get('/').then(res => {
        expect(res.type).toBe('application/json')
      })
    })

  })
})