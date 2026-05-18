const jwt = require("jsonwebtoken");
const ApiError = require("../helper/apiError");
const messages = require("../constants/messages").messages;

async function generateToken(user) {
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
}

module.exports = generateToken;
