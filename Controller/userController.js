const User = require("../models/userModel");
const createError = require("http-errors");
const { authSchema } = require("../helpers/validationSchema");
const { signAccessToken } = require("../helpers/jwtHelper");

module.exports = {
  // ✅ REGISTER
  addUser: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const { email } = result;

      const exists = await User.findOne({ email });
      if (exists) {
        throw createError.Conflict(`${email} already exists`);
      }

      const user = new User(result);
      const savedUser = await user.save();

      // ✅ Generate token after saving
      const accessToken = await signAccessToken(savedUser.id);

      // ✅ Return accessToken like login route
      res.send({ accessToken });
    } catch (error) {
      if (error.isJoi === true) {
        error.status = 422;
      }
      next(error);
    }
  },

  // ✅ LOGIN
  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);

      const user = await User.findOne({ email: result.email });
      if (!user) {
        throw createError.NotFound("User not registered");
      }

      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch) {
        throw createError.Unauthorized("Invalid username or password");
      }

      const accessToken = await signAccessToken(user.id);

      res.send({ accessToken });
    } catch (error) {
      if (error.isJoi === true) {
        return next(createError.BadRequest("Invalid username/password"));
      }
      next(error);
    }
  }
};
