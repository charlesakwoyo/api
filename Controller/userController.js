const User = require("../models/userModel");
const createError = require("http-errors");
const { authSchema } = require("../helpers/validationSchema");

module.exports = {
  addUser: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);

      const { email } = result; 

      // Check if a user with this email already exists
      const exists = await User.findOne({ email });
      if (exists) {
        throw createError.Conflict(`${email} already exists`);
      }

      // Create and save the new user
      const user = new User(result);
      const savedUser = await user.save();

      // Send back the saved record
      res.send(savedUser);

    } catch (error) {
      // Improve Joi error handling
      if (error.isJoi === true) {
        error.status = 422;
      }
      next(error);
    }
  }
};
