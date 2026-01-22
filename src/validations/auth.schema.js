const joi = require("joi");

const RegisterSchema = joi.object({
  username: joi.string().required().min(3),
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
});

const LoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
});

module.exports = { RegisterSchema, LoginSchema };