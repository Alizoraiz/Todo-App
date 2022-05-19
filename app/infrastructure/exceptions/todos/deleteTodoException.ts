class DeleteTodoException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'Delete Todo Exception ';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, DeleteTodoException);
    }
  }

export default DeleteTodoException;