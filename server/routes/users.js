const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/UserController");
const validateUserInput = require("../middlewares/input-validator");
const corsHeaders = require("../middlewares/headers");

router.post("/signup", corsHeaders, validateUserInput, signUp);
router.post("/login", corsHeaders, logIn);

module.exports = router;
