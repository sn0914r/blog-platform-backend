const joi = require("joi");

const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string(),
  tags: joi.array().items(joi.string()).required(),
  status: joi.string().valid("draft", "published").default("draft"),
});

const postSchemaUPDATE = joi.object({
  title: joi.string().optional(),
  content: joi.string().optional(),
  tags: joi.array().items(joi.string()).optional(),
  status: joi.string().valid("draft", "published").default("draft"),
});

module.exports = { postSchema, postSchemaUPDATE };
