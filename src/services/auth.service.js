const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../modals/User");
const AppError = require("../errors/AppError");

/**
 * @desc Registers a new user
 *
 * Side Effects:
 *  - Creates a new user
 *  - Generates JWT
 *
 * Fails when:
 *  - User's email already exists
 * 
 * @returns {Promsie<string>} JWT
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
 * @desc Logs in a user
 * 
 * Side Effects:
 *  - Generates JWT
 * 
 * Fails when:
 *  - User does not exist
 *  - Password is incorrect
 * 
 * @returns {Promise<string>} JWT
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
