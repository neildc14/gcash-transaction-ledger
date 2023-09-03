const validator = require("validator");

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function validateBody(body) {
  const validationErrors = {};

  if (!body.email || !validator.isEmail(body.email)) {
    validationErrors["email"] = "Invalid email address";
  }

  if (!body.password || body.password.length < 8) {
    validationErrors["password"] = "Password must be 8 characters long.";
  }

  return validationErrors;
}

const validateUserInput = (req, res, next) => {
  const validationErrors = validateBody(req.body);

  if (!isEmptyObject(validationErrors))
    return res.status(400).json(validationErrors);

  if (isEmptyObject(validationErrors)) next();
};

module.exports = validateUserInput;
