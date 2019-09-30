export default class AppError extends Error {

  public errorCode: string;

  constructor(message, errorCode) {
    super();
    this.message = message;
    this.errorCode = errorCode;
  }
}
