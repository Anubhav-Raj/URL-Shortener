// cluster-server.js
/* eslint-disable no-undef */
const cluster = require("cluster");
const os = require("os");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/mongoose.js"); // Database connection module
const rateLimit = require("express-rate-limit");
const numCPUs = os.availableParallelism();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  keyGenerator: (req) => req.ip,
});

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died, starting a new worker`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(limiter);

  connectDB();
  app.set("trust proxy", 1);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, _, next) => {
    console.log("body: ", req.body);
    next();
  });

  // for parsing application/x-www-form-urlencoded
  // app.use(express.static(path.resolve(__dirname, "./dist")));

  // Routes

  app.use("/api/auth", require("./routes/authRoutes"));
  app.use("/api/url", require("./routes/urlRoutes"));
  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "/dist", "index.html"), (err) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     }
  //   });
  // });

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} is listening on port ${PORT}`);
  });
}
