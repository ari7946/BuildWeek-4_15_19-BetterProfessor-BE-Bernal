const bcrypt = require('bcryptjs');
const faker = require('faker');

const testPass = bcrypt.hashSync('pass', 12);

const userList = [{ id: 1, username: "test", password: testPass },];

for (let i = 2; i < 9; i++) {
  const newUser = {}
  newUser.id = i;
  newUser.username = `${faker.name.lastName()}.${faker.name.firstName()}@school.edu`;
  newUser.password = bcrypt.hashSync("pass", 12);
  userList.push(newUser);
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      knex('users').insert(userList);
    })
}
