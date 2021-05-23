const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateLoginInput } = require("../../config/validators");
const { User } = require("../../models");

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = async (_, { username, password }) => {
  const { valid, errors } = validateLoginInput(username, password);

  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  const user = await User.findOne({ username });

  if (!user) {
    errors.general = "user not found";
    throw new UserInputError("user not found", { errors });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    errors.general = "wrong credentials";
    throw new UserInputError("wrong credentials", { errors });
  }

  const token = generateToken(user);

  return {
    ...user._doc,
    id: user._id,
    token,
  };
};
