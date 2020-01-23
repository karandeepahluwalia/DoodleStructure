const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const listRouter = require("./routes/list.js");
//const model = require("./models/DSmodel");
const PORT = 3000;
const app = express();

app.use(bodyParser.json(), (req, res, next) => {
  console.log("Body parser console log", req.body);
  next();
});
//more specific routes go up top

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/list", listRouter);
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"));
});
app.listen(PORT, () => {
  console.log("Listening on port 3000");
});

module.exports = app;
