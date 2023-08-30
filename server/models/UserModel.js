const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  let errorMessage = { message: "This email is already in use." };
  if (exists) {
    throw errorMessage;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    password: hash,
  });
  return user;
};

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  let errorMessage = { message: "User account not found." };
  if (!user) {
    throw errorMessage;
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  errorMessage = { message: "Incorrect password" };
  if (!matchPassword) {
    throw errorMessage;
  }

  return user;
};
module.exports = mongoose.model("User", UserSchema);
