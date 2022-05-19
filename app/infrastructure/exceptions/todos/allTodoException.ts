class AllTodoException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'AllTodoException';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, AllTodoException);
    }
  }

export default AllTodoException;