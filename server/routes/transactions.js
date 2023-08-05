const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "hello" });
});

router.get("/:id", (req, res) => {
  res.send({ message: "hello id" });
});

router.post("/", (req, res) => {
  res.send({ message: "hello" });
});

router.put("/:id", (req, res) => {
  res.send({ message: "hello" });
});

router.delete("/:id", (req, res) => {
  res.send({ message: "hello" });
});

module.exports = router;
