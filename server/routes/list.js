const express = require("express");
const router = express.Router();
const controller = require("../controllers/listController");

router.get("/", controller.createHeap, controller.getHeap, (req, res) => {
  console.log("Messaged recieved chief");
  return res.status(200).send("Reponse heard chief");
});
router.post("/", controller.updateHeap, controller.getHeap, (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify(req.body));
});

module.exports = router;
