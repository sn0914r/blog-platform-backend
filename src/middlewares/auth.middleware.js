const { auth } = require("firebase-admin");
const AppError = require("../errors/AppError");

const verifyAuth = (req, res, next) => {
  if (!req.headers?.authorization?.startsWith("Bearer ")) {
    throw new AppError("Not authorized", 400);
  }

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = auth.verifyIdToken(token);
  req.user = decodedToken;

  next();
};

module.exports = verifyAuth;
