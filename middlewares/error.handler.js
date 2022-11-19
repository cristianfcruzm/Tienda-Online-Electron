const { ValidationError } = require("sequelize");

function logErrors(error, req, res, next) {
  console.error("logErrors"+error);
  next(error);
};

function errorHandler(error, req, res, next) {
  console.error("errorHandler"+error);
  res.status(500).json({
    error: error.message,
    stack: error.stack
  });
}

function ormErrorHandler(error, req, res, next) {
  console.error("ormErrorHandler"+error);
  if (error instanceof ValidationError){
    res.status(409).json({
      statusCode: 409,
      message: error.name,
      error: error.errors,
    })
  }
  next(error);
}

function boomErrorHandler(error, req, res, next) {
  console.error("boomErrorHandler"+error);
  if (error.isBoom){
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }
  next(error);
}

module.exports = {logErrors, errorHandler, boomErrorHandler,ormErrorHandler};
