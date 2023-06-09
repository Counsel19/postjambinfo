import { StatusCodes } from "http-status-codes";

const Errorhandler = (error) => {
  const defaultError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "Something went wrong, try again later",
  };

  if (error.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.msg = error.message
    defaultError.msg = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (error.code && error.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(error.keyValue)} field must be unique`;
  }

  return new Response(
    { msg: defaultError.msg },
    {
      status: defaultError.statusCode,
    }
  );
};

export default Errorhandler;
