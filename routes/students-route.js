const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const db = require('../data/dbConfig.js');

// get all students
router.get('/', async (req, res) => {
  try {
    const students = await db('students');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a student
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const student = await db('students').where({ id }).first()
    res.status(200).json(student)
  } catch (err) {
    res.status(500).json({ message: "Error trying to GET student!" })
  }
})

// create new student
router.post('/', async (req, res) => {
  try {
    let student = req.body;
    if (!student.firstname || !student.lastname || !student.email) {
      res.status(400).json({ message: "please fill in all fields" });
    } else {
      const id = await db('students').insert(student);
      res.status(201).json({ message: `${student.firstname} has been registered` })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
})


// destroy student
router.delete('/:id', async (req, res) => {
  try {
    console.log("delete Route")
    const id = req.params.id;
    console.log("id: ", id)
    const numDeleted = await db('students').where({ id }).del();
    console.log("numDeleted: ", numDeleted)
    if (numDeleted != 0) {
      console.log("if: true")
      res.status(201).json({ message: "User Deleted" });
    } else {
      console.log("if: false")
      res.status(404).json({ message: "No record found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
});

// update student
router.put('/:id', async (req, res) => {
  try {
    console.log('put');
    const id = req.params.id;
    console.log('id: ', id);
    const numUpdated = await db('students')
      .where({ id })
      .update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
      })
    console.log('numUpdated: ', numUpdated);
    if (numUpdated != 0) {
      console.log('status 201');
      res.status(201).json({ message: `You changed the student's info` })
    } else {
      res.status(404).json({ message: 'No record found' });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

module.exports = router;


// endpoints:
// /api/login -> sends token back
// /api/register -> sends back welcome message

// GET & POST & PUT & DEL /api/students -> CRUD functionality (/api/students/:id as well)
// GET & POST & PUT & DEL /api/users -> CRUD functionality (/api/users/:id as well)
// GET & POST & PUT & DEL /api/projects -> CRUD functionality (/api/projects/:id as well)

// GET /api/professor-students-info -> sends back object. 
//   example:
//     [
//       studentid: {
//         firstname: "john",
//         lastname: 'smith',
//         email: 'email',
//         projects: [
//           {
//             "id": 1,
//             "project_name": "Static Code Checker",
//             "project_deadline": "2019-05-08 12:00:00",
//             "feedback_deadline": "2019-05-10 12:00:00",
//             "recommendation_deadline": "2019-06-01 12:00:00",
//             "student_message": "Try reseting the monitor!",
//             "professor_message": "Project is not up to snuff, crack the whip"
//           },
//           {
//             "id": 2,
//             "project_name": "dynamic Hand Gesture Recognition using neural network",
//             "project_deadline": "2019-04-18 12:00:00",
//             "feedback_deadline": "2019-04-20 12:00:00",
//             "recommendation_deadline": "2019-05-01 12:00:00", 
//             "student_message": "Try reseting the monitor!",
//             "professor_message": "Project is great, still crack the whip"
//           }
//         ]  
//       }

//     ]