export class AppError extends Error {
  constructor(
    public code: string,
    public userMessage: string,           // ✅ Это то, что видит пользователь
    public technicalMessage?: string,     // ✅ Это то, что логируется для разработчика
  ) {
    // ✅ ВАЖНО: super() получает ТОЛЬКО userMessage — чтобы UI и стек ошибок были дружелюбными
    super(userMessage);

    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const AppErrors = {
  // 🚫 400 — Bad Request
  invalidInput: (detail?: string) =>
    new AppError(
      "INVALID_INPUT",
      "Проверьте введённые данные и попробуйте снова",
      detail ? `400 Bad Request — ${detail}` : "400 Bad Request",
    ),

  // 🚫 401 — Unauthorized
  unauthorized: (detail?: string) =>
    new AppError(
      "UNAUTHORIZED",
      "Сессия истекла или вход не выполнен",
      detail ? `401 Unauthorized — ${detail}` : "401 Unauthorized",
    ),

  // 🚫 403 — Forbidden
  forbidden: (detail?: string) =>
    new AppError(
      "FORBIDDEN",
      "У вас нет прав для этого действия",
      detail ? `403 Forbidden — ${detail}` : "403 Forbidden",
    ),

  // 🚫 404 — Not Found
  notFound: (detail?: string) =>
    new AppError(
      "NOT_FOUND",
      "Ресурс не найден",
      detail ? `404 Not Found — ${detail}` : "404 Not Found",
    ),

  // 🚫 409 — Conflict
  conflict: (detail?: string) =>
    new AppError(
      "CONFLICT",
      "Такая запись уже существует или данные конфликтуют",
      detail || "409 Conflict",
    ),

  // 🚫 413 — Payload Too Large
  payloadTooLarge: (detail?: string) =>
    new AppError(
      "PAYLOAD_TOO_LARGE",
      "Размер данных слишком большой",
      detail ? `413 Payload Too Large - ${detail}` : "413 Payload Too Large",
    ),

  // 🚫 415 — Unsupported Media Type
  unsupportedMediaType: () =>
    new AppError(
      "UNSUPPORTED_MEDIA_TYPE",
      "Неподдерживаемый формат данных",
      "415 Unsupported Media Type",
    ),

  // 🚫 429 — Too Many Requests
  rateLimited: (retryAfter?: number) => {
    const sec =
      retryAfter != null && Number.isFinite(retryAfter) ? retryAfter : 60;
    return new AppError(
      "RATE_LIMITED",
      `Слишком много запросов. Повторите через ${sec} с`,
      "429 Too Many Requests",
    );
  },

  // 🚫 500 — Internal Server Error
  serverError: (detail?: string) =>
    new AppError(
      "SERVER_ERROR",
      "На сервере произошла ошибка",
      detail || "500 Internal Server Error",
    ),

  // 🚫 502 — Bad Gateway
  badGateway: () =>
    new AppError(
      "BAD_GATEWAY",
      "Сервер временно недоступен",
      "502 Bad Gateway",
    ),

  // 🚫 503 — Service Unavailable
  serviceUnavailable: () =>
    new AppError(
      "SERVICE_UNAVAILABLE",
      "Сервис временно недоступен. Попробуйте позже",
      "503 Service Unavailable",
    ),

  // 🌐 0 — Network / Fetch Error
  network: (originalError?: Error) =>
    new AppError(
      "NETWORK_ERROR",
      "Нет сети или сервер недоступен",
      originalError?.message || "Неизвестная сетевая ошибка",
    ),

  /** Прерванный запрос (AbortController). */
  aborted: () => new AppError("ABORTED", "Запрос отменён", "AbortError"),

  // ⚠️ 405 — Method Not Allowed
  methodNotAllowed: () =>
    new AppError(
      "METHOD_NOT_ALLOWED",
      "Этот метод запроса не поддерживается",
      "405 Method Not Allowed",
    ),

  // ⚠️ 422 — Unprocessable Entity (валидация на сервере)
  validationFailed: (details: string[] = []) =>
    new AppError(
      "VALIDATION_FAILED",
      "Данные не прошли проверку на сервере",
      details.length > 0
        ? `422 Unprocessable Entity — ${details.join(", ")}`
        : "422 Unprocessable Entity",
    ),

  // ⚠️ 408 — Request Timeout
  timeout: () =>
    new AppError(
      "REQUEST_TIMEOUT",
      "Запрос занял слишком много времени",
      "408 Request Timeout",
    ),

  // ❓ 504 — Gateway Timeout
  gatewayTimeout: () =>
    new AppError(
      "GATEWAY_TIMEOUT",
      "Сервер не ответил вовремя",
      "504 Gateway Timeout",
    ),

  // 🤷 Unknown / Fallback
  unknown: (originalError?: unknown) =>
    new AppError(
      "UNKNOWN_ERROR",
      "Что-то пошло не так",
      originalError instanceof Error ? originalError.message : "Unknown error",
    ),
};
