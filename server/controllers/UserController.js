const User = require("../models/UserModel");
const createToken = require("../helpers/create-token");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const new_user = await User.signup(email, password);
    const id = new_user._id;
    const token = createToken(new_user._id);

    res.cookie("jwt", token, { httpOnly: true, sameSite: "None", path: "" });
    res.header("Access-Control-Allow-Origin", process.env.FRONT_END_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.status(201).json({ id, email, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const login_user = await User.login(email, password);
    const id = login_user._id;
    const token = createToken(login_user._id);
    console.log({ token });

    res.cookie("jwt", token, { httpOnly: true, sameSite: "None", path: "" });
    res.header("Access-Control-Allow-Origin", process.env.FRONT_END_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.status(200).json({ id, email, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  signUp,
  logIn,
};
