const express = require("express");
const {
  registerController,
  loginController,
  googleController,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/google", googleController);

module.exports = router;
