class AddTodoException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'AddTodoException';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, AddTodoException);
    }
  }

export default AddTodoException;