const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const listRouter = require("./routes/list.js");
//const model = require("./models/DSmodel");
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
//more specific routes go up top

app.use("/list", listRouter);
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"));
});
app.listen(PORT, () => {
  console.log("Listening on port 3000");
});

module.exports = app;
