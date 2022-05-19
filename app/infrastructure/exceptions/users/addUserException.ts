class AddUserException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'Add User Exception';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, AddUserException);
    }
  }

export default AddUserException;