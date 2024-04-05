const fs = require("fs");
const os = require("os");
const path = require("path");
const cors = require("cors");
const https = require("https");
const express = require("express");
const cluster = require("cluster");
const bodyParser = require("body-parser");

const connectDB = require("./dbConnection");
const userDetails = require("./routes/user");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = https.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  },
  app,
);

connectDB();

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/get-details", userDetails);
  app.post("/submit-details", userDetails);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker is running on port ${PORT}`);
  });
}
