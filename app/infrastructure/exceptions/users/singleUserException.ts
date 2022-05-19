class SingleUserException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'Single User Exception';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, SingleUserException);
    }
  }

export default SingleUserException;