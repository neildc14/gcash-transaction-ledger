const express = require("express");
const router = express.Router();
const { getAllTotal } = require("../controllers/totalController");
const requireAuth = require("../middlewares/auth");

router.use(requireAuth);

router.get("/", getAllTotal);

module.exports = router;
