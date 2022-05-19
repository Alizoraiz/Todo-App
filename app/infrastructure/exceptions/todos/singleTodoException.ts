class SingleTodoException extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'Single Todo Exception';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, SingleTodoException);
    }
  }

export default SingleTodoException;