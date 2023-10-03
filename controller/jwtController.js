require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = { createToken, verifyToken };
