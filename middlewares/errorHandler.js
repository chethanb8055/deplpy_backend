// class ErrorHandler extends Error {
//   constructor(
//     statusCode,
//     message = "Something went wrong",
//     errors = [],
//     stack = ""
//   ) {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.message = message;
//     this.success = false;
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export default ErrorHandler;

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // console.log(Error);
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // console.log(err, "this is error i got from the middle ware");

  (err.message = err.message || "Internal server error"),
    (err.statusCode = err.statusCode || 500);
  if (err.name == "CaseError") {
    const message = `resource not found Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code == "11000") {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name == "JsonWebTokenError") {
    const message = `Json web token is Invalid, Try Again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name == "TokenExpiredError") {
    const message = `Json web Token is Expaired . Try Again`;
    err = new ErrorHandler(message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
