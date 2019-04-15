const bcrypt = require('bcryptjs');
const faker = require('faker');

const userList = [];
for (let i = 0; i < 10; i++) {
  const newUser = {}
  newUser.id = i;
  newUser.username = `${faker.name.lastName()}.${faker.name.firstName()}`;
  newUser.password = bcrypt.hashSync("pass", 12);
  userList.push(newUser);
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').insert(userList);
};

