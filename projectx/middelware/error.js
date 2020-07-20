const ErrorRespone = require('../utils/errorresponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log to console for dev
  console.log(err);
  //Mongoose bad Object id
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value} at the database`;
    error = new ErrorRespone(message, 404);
  }
  console.log(error.name);
  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field  value entered of code ${err.code} `;
    error = new ErrorRespone(message, 400);
  }

  // mongoose validatioon error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorRespone(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};
module.exports = errorHandler;
