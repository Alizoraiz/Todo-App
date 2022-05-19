class UpdateTodoException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'Update Todo Exception ';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, UpdateTodoException);
    }
  }

export default UpdateTodoException;