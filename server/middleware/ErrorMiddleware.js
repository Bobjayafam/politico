class ErrorMiddleware {
  static notFound(req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
  }

  /* eslint-disable no-unused-vars */
  static errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    res.status(statusCode);

    res.json({
      status: statusCode,
      error: err.message,
    });
  }
}

export default ErrorMiddleware;
