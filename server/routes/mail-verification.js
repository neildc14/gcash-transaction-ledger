const express = require("express");

const { postEmail } = require("../controllers/mailVerificationController");
const router = express.Router();

router.post("/send-verification-email", postEmail);

module.exports = router;
