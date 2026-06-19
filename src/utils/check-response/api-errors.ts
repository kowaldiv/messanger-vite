export class ApiError extends Error {
  public readonly userMessage: string;
  public readonly statusCode: number;

  constructor(
    userMessage: string,
    statusCode: number = 500,
  ) {
    super(userMessage);
    this.userMessage = userMessage;
    this.statusCode = statusCode;
    this.name = "ApiError";
  }

  static networkError(): ApiError {
    return new ApiError("Проверьте соединение с интернетом", 0);
  }

  static notFound(resource?: string): ApiError {
    return new ApiError(
      resource ? `${resource} не найден` : "Ресурс не найден",
      404
    );
  }

  static badRequest(message: string): ApiError {
    return new ApiError(message, 400);
  }

  static unauthorized(): ApiError {
    return new ApiError("Необходима авторизация", 401);
  }
}