const registerController = (req, res) => {
  res.send("Register");
};

const loginController = (req, res) => {
  res.send("Login");
};

const googleController = (req, res) => {
  res.send("Google");
};

module.exports = {
  registerController,
  loginController,
  googleController,
};
