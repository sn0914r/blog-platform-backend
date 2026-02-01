const { registerUser, loginUser } = require("../services/auth.service");

/**
 * @desc Registers a new user and sets JWT in httpOnly cookie
 *
 * @route POST /auth/register
 * @access Public
 */
const registerUserController = async (req, res) => {
  const { email, password, username } = req.body;

  const token = await registerUser({ email, password, username });

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Registered successfully" });
};

/**
 * @desc Logs in a user and sets JWT in httpOnly cookie
 *
 * @route POST /auth/login
 * @access Public
 */
const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const token = await loginUser({ email, password });

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Logged in successfully" });
};

/**
 * @desc Logs out a user and clears httpOnly cookie
 *
 * @route POST /auth/logout
 * @access Public
 */
const logoutUserController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
};
