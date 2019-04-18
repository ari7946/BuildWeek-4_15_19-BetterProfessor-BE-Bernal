let studentProjectList = [];

function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * Math.floor(max - 1));
}

for (let i = 1; i < 101; i++) {
  let studentProject = {};
  studentProject.student_id = getRandomInt(100);
  studentProject.project_id = getRandomInt(7);
  studentProject.professor_id = getRandomInt(10);
  studentProject.student_message = getRandomInt(200);
  studentProject.professor_message = getRandomInt(200);
  studentProjectList.push(studentProject);
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('student_project').insert(studentProjectList);
};
