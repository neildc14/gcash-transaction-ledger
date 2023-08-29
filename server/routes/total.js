const express = require("express");
const router = express.Router();
const { getAllTotal } = require("../controllers/totalController");

router.get("/", getAllTotal);

module.exports = router;
