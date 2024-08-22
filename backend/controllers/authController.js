/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");

exports.register = async (req, res) => {
  try {
    console.log(`Worker Register ${process.pid} is handling request`);

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(`Worker Login ${process.pid} is handling request`);

    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      console.log(isMatch);
      if (isMatch) {
        const token = jwt.sign({ userId: user._id }, keys.JWT_SECRET, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          user: {
            email: user.email,
            _id: user._id,
            name: user.name,
            token: token,
          },
          message: "Login Sucessfully",
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
