const express = require("express");
const routes = express.Router();
const userController = require ("../Controller/userController");




routes.post('/register',userController.addUser)
module.exports = routes;