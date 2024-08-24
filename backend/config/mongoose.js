/* eslint-disable no-undef */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", true);
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })

    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => console.log(err.message));

  //   mongoose.connection.on("connected", () => {
  //     console.log("Mongoose Connected to db");
  //   });
};
module.exports = connectDB;
// export default connectDB;
