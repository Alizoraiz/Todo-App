class CustomError extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = 'CustomError';
      this.statusCode = statusCode;
      Error.captureStackTrace(this, CustomError);
    }
  }

export default CustomError;