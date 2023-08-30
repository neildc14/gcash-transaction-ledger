const validator = require("validator");

const validateUserInput = (req, res, next) => {
  const validationErrors = validateBody(req.body);

  if (validationErrors.length > 0) {
    console.log("error");
    return res.status(400).json({ validationErrors });
  } else if (validationErrors.length === 0) {
    console.log("next", validationErrors.length, validationErrors);
    next();
  }
};

function validateBody(body) {
  const validationErrors = [];

  if (!body.email || !validator.isEmail(body.email)) {
    validationErrors.push({ field: "email", message: "Invalid email address" });
  }

  if (!body.password || body.password.length < 8) {
    validationErrors.push({
      field: "password",
      message: "Password must be at least 8 characters long",
    });
  }

  return validationErrors;
}

module.exports = validateUserInput;
