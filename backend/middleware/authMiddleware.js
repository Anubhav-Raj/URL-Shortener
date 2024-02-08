/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("gvgbkj", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, keys.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.userId;
    next();
  });
};
