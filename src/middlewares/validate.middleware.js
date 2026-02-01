const AppError = require("../errors/AppError");

/**
 * @desc Validates request body
 *
 * Effects:
 *  - Attaches validated body to req.body
 *
 * Blocks When:
 *  - Validation fails
 */
const validateBody = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (error) {
    let errors = error.details.map((err) => err.message);
    throw new AppError(errors, 400);
  }

  req.body = value;
  next();
};

/**
 * @desc Validates request files
 *
 * Blocks When:
 *  - Files are not uploaded
 */
const validateFiles = (req, res, next) => {
  if (!req.files) {
    throw new AppError("files not uploaded", 400);
  }
  next();
};
module.exports = { validateBody, validateFiles };
