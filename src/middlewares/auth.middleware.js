const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const verifyAuth = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) throw new AppError("Not authorized", 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;

  next();
};

module.exports = verifyAuth;
