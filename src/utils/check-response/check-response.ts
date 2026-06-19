import type { AxiosResponse } from "axios";
import { ApiError } from "./api-errors";

export async function checkResponse<T>(response: AxiosResponse): Promise<T> {
  const contentType = response.headers["content-type"];
  const isHtml =
    contentType &&
    (typeof contentType === "string"
      ? contentType.includes("text/html")
      : false);

  if (isHtml) {
    throw ApiError.networkError();
  }

  if (response.status < 200 || response.status >= 300) {
    if (response.status === 404) throw ApiError.notFound();
    if (response.status === 400) {
      console.log("Bad request data:", response.data);
      throw ApiError.badRequest("Некорректные данные запроса");
    }

    throw new ApiError(
      `Ошибка сервера: статус ${response.status}`,
      response.status,
    );
  }

  return response.data as T;
}
