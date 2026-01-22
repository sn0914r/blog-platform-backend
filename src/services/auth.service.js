const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../modals/User");
const AppError = require("../errors/AppError");

/**
 * Registers new User
 *
 * Flow:
 *  1. Check if email already exists
 *  2. Hash password
 *  3. Create new user
 *  4. Create JWT
 *
 * @returns {string} JWT
 */
const registerUser = async ({ email, password, username }) => {
  const existingUser = await UserModel.exists({ email });
  if (existingUser) throw new AppError("Email already exists", 400);

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    email,
    password: hashedPass,
    username,
  });

  const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

/**
 * Logins in User
 *
 * Flow:
 *  1. Check if user exists
 *  2. Check if password is correct
 *  3. Create JWT
 *
 * @returns {string} JWT
 */
const loginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Invalid credentials", 400);

  const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

module.exports = { registerUser, loginUser };
