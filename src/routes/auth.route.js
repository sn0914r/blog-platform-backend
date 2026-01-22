const express = require("express");
const { RegisterSchema, LoginSchema } = require("../validations/auth.schema");
const validateBody = require("../middlewares/validate.middleware");
const { registerUserController, loginUserController, logoutUserController } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", validateBody(RegisterSchema), registerUserController);
router.post("/login", validateBody(LoginSchema), loginUserController);
router.post("/logout", logoutUserController)

module.exports = router;
