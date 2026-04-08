import { AppErrors } from "@/src/errors/app-errors";

export function checkStatus(response: Response, json: unknown): boolean {
  let messageFromServer: undefined | string;

  if (
    json &&
    typeof json === "object" &&
    "message" in json &&
    typeof json.message === "string"
  ) {
    messageFromServer = json.message;
  }
  // сделал самую простую проверку сообщения потому что на беке 
  // решил всегда отправлять его в {message: ...}

  switch (response.status) {
    case 400:
      throw AppErrors.invalidInput(messageFromServer);

    case 401:
      throw AppErrors.unauthorized(messageFromServer);

    case 403:
      throw AppErrors.forbidden(messageFromServer);

    case 404:
      throw AppErrors.notFound(messageFromServer);

    case 405:
      throw AppErrors.methodNotAllowed();

    case 408:
      throw AppErrors.timeout();

    case 409:
      throw AppErrors.conflict(messageFromServer);

    case 413:
      throw AppErrors.payloadTooLarge(messageFromServer);

    case 415:
      throw AppErrors.unsupportedMediaType();

    case 422:
      throw AppErrors.validationFailed(
        messageFromServer ? [messageFromServer] : [],
      );

    case 429: {
      const ra = response.headers.get("Retry-After");
      const sec = ra ? parseInt(ra, 10) : NaN;
      throw AppErrors.rateLimited(Number.isFinite(sec) ? sec : undefined);
    }

    case 500:
      throw AppErrors.serverError(messageFromServer);

    case 502:
      throw AppErrors.badGateway();

    case 503:
      throw AppErrors.serviceUnavailable();

    case 504:
      throw AppErrors.gatewayTimeout();

    default:
      throw AppErrors.unknown(
        messageFromServer
          ? `HTTP ${response.status}: ${messageFromServer}`
          : `HTTP ${response.status}: ${response.statusText || "Error"}`,
      );
  }
}
