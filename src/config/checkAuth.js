require("dotenv").config();
const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (models) => {
  //   const authHeader = models.req.headers.authorization;
  throw new Error(`Authorization header ${models.req.headers}`);

  if (authHeader) {
    // Bearer ....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
