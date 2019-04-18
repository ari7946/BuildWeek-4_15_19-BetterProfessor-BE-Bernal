const faker = require('faker');

const studentList = [];
for (let i = 1; i < 101; i++) {
  const newStudent = {}
  newStudent.id = i;
  newStudent.firstname = faker.name.firstName();
  newStudent.lastname = faker.name.lastName();
  newStudent.email = faker.internet.email();
  studentList.push(newStudent);
}


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('students').insert(studentList);
};