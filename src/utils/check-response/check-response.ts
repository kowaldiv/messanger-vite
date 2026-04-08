import { checkStatus } from "./check-status";
import { isJsonResponse } from "./isJsonResponse";
import { validateData } from "./validate-data";

export async function checkResponse<T extends object>(
  response: Response,
  dtoClass?: new () => T,
): Promise<
  | {
      success: true;
      data?: T;
    }
  | {
      success: false;
      userMessage: string;
    }
> {
  try {
    console.log("Началась проверка ответа от сервера!");
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      console.log("Вернулся html!");
      throw new Error("Запрос не удался! Проверьте соединение с интернетом.");
    }

    const result = await isJsonResponse(response);
    if (!result.success) {
      console.log("Вернулся не json!");
      throw new Error("Запрос не удался! Проверьте соединение с интернетом.");
    }

    if (!response.ok) {
      console.log("Вернулся не 2** ответ!");
      checkStatus(response, result.json);
    }

    if (!dtoClass) {
      return { success: true };
    }

    const validData = validateData(result.json, dtoClass);
    if (!validData.success) {
      console.log("Не верные данные с сервера");
      throw new Error("Ошибка сервера!");
    }

    return { success: true, data: validData.validData };
  } catch (err) {
    return { success: false, userMessage: (err as Error).message || "Ошибка!" };
  }
}
