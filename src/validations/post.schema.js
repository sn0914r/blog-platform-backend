const joi = require("joi");

const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string(),
  tags: joi.array().items(joi.string()).optional(),
  status: joi.string().valid("draft", "published").default("draft"),
});

const postSchemaUPDATE = joi
  .object({
    title: joi.string(),
    content: joi.string(),
    tags: joi.array().items(joi.string()),
    status: joi.string().valid("draft", "published"),
  })
  .min(1);

module.exports = { postSchema, postSchemaUPDATE };
