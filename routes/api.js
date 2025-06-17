
const express = require("express");
const routes = express.Router();

const studentcontroller = require ("../Controller/studentcontroller");
// Get a list of students from the database
routes.get('/getStudents',studentcontroller.getAllStudents );
routes.get('/getStudent',studentcontroller.getStudent);
// Add a student to the database
routes.post('/addStudents',studentcontroller.addStudent);

// Update a student in the database
// routes.put('/students/:id', (req, res) => {
//     res.send({ type: 'Update Request' });
// });

// Delete a student from the database
routes.delete('/deleteStudents/:id',studentcontroller.deleteStudent);
routes.patch('/updateStudents/:id',studentcontroller.updateStudent );
module.exports = routes;


