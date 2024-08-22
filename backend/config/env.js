/* eslint-disable no-undef */
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  baseUrl: process.env.BASE_URL,
  jwttoken: process.env.JWT_SECRET,
};
