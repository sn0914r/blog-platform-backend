const { registerUser, loginUser } = require("../services/auth.service");

/**
 * Register a new user and log them in by setting JWT in httpOnly cookie.
 *
 * Flow:
 *  1. Read email, password, username from request body.
 *  2. Create user (service handles hashing + DB save).
 *  3. Generate JWT token.
 *  4. Set token in httpOnly cookie and return success response
 */
const registerUserController = async (req, res) => {
  const { email, password, username } = req.body;

  const token = await registerUser({ email, password, username });

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Registered successfully" });
};

/**
 * Login a user and log them in by setting JWT in httpOnly cookie.
 *
 * Flow:
 *  1. Read email, password from request body.
 *  2. Generate JWT token.
 *  3. Set token in httpOnly cookie and return success response
 */
const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const token = await loginUser({ email, password });

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Logged in successfully" });
};

/**
 * Log out a user by clearing httpOnly cookie.
 *
 * Flow:
 *  1. Clear httpOnly cookie
 *  2. Return success response
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