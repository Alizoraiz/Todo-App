class DeleteUserException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'Delete User Exception';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, DeleteUserException);
    }
  }

export default DeleteUserException;