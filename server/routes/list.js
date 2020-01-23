const express = require("express");
const router = express.Router();
const controller = require("../controllers/listController");

router.get("/", controller.createHeap, controller.getHeap, (req, res) => {
  console.log("Messaged recieved chief");
  return res.status(200).send(JSON.stringify(res.locals.heap));
});
router.post("/", controller.updateHeap, controller.getHeap, (req, res) => {
  console.log("This is the body", req.body);
  res.send(req.body);
});

module.exports = router;
