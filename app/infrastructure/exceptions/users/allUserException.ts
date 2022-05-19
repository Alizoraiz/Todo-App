class AllUserException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'All User Exception';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, AllUserException);
    }
  }

export default AllUserException;