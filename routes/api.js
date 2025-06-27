const express = require("express");
const routes = express.Router();
const { verifyAccessToken } = require("../helpers/jwtHelper");

const studentcontroller = require("../Controller/studentcontroller");

// Get all students
routes.get('/getStudents', studentcontroller.getAllStudents);

// ✅ FIXED: Get a student by ID
routes.get('/getStudent/:id',  studentcontroller.getStudent);

// Add a student
routes.post('/addStudent', studentcontroller.addStudent);

// Delete a student
routes.delete('/deleteStudent/:id', verifyAccessToken, studentcontroller.deleteStudent);

// Update a student
routes.patch('/updateStudent/:id', studentcontroller.updateStudent);

module.exports = routes;
