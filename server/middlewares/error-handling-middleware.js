import httpStatus from "http-status";

class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode).send({
    status: "error",
    statusCode,
    message,
  });
};

export const convertToApiError = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;

    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message);
  }
  next(error);
};
