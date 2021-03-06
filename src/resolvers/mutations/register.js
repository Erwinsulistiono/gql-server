const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateRegisterInput } = require("../../config/validators");
const { User } = require("../../models/");

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

module.exports = async (
  _,
  { registerInput: { username, email, password, confirmPassword } }
) => {
  const { valid, errors } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  );
  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }
  const user = await User.findOne({ username });
  if (user) {
    throw new UserInputError("Username is Taken", {
      errors: {
        username: "This username is taken",
      },
    });
  }

  password = await bcrypt.hash(password, 12);

  const newUser = new User({
    email,
    username,
    password,
    createdAt: new Date().toISOString(),
  });

  const res = await newUser.save();

  const token = generateToken(res);

  return {
    ...res._doc,
    id: res._id,
    token,
  };
};
