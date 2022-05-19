class UpdateUserException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'Update User Exception';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, UpdateUserException);
    }
  }

export default UpdateUserException;