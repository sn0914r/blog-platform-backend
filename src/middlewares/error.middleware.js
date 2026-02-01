/**
 * @desc Global error handler
 */
const errorMiddleware = (error, _req, res, _next) => {
  const status = error.status || 500;
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    console.error(error);
    return res.status(status).json({
      message: status === 500 ? "Something went wrong" : error.message,
    });
  }

  return res.status(status).json({
    message: error.message,
    status,
    stack: error.stack,
  });
};

module.exports = errorMiddleware;
