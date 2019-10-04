import AppError from '../AppError';

export class ErrorService {
  public static generateError(source: string, message: string, errorCode: number): AppError {
    return new AppError(
      `Source: ${source}  message: ${message}`,
      errorCode
    );
  }
}
