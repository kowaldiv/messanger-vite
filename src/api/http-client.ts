import axios from "axios";
import { BACKEND_API } from "../config/backend.api";
import { checkResponse } from "../utils/check-response/check-response";
import { ApiError } from "../utils/check-response/api-errors";

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Главный метод, который обрабатывает все запросы
  private async request<T>(
    method: "get" | "post" | "put" | "delete",
    path: string,
    body?: unknown,
  ): Promise<
    { success: true; data: T } | { success: false; userMessage: string }
  > {
    try {
      const config = {
        method,
        url: `${this.baseUrl}${path}`,
        headers: { "Content-Type": "application/json" },
        data: body,
      };

      const res = await axios(config);
      const data = await checkResponse<T>(res);
      return { success: true, data };
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.statusCode === 401) {
          const refreshRes = await axios.get(
            `${this.baseUrl}/auth/refresh-token`,
          );
          if (refreshRes.status !== 200) {
            window.location.href = "/sign-in";
            return { success: false, userMessage: "Требуется вход" };
          }

          // Повторяем запрос
          const config = {
            method,
            url: `${this.baseUrl}${path}`,
            headers: { "Content-Type": "application/json" },
            data: body,
          };
          const res2 = await axios(config);
          const data2 = await checkResponse<T>(res2);
          return { success: true, data: data2 };
        }
        return { success: false, userMessage: err.userMessage };
      }

      console.error("Unknown error:", err);
      return { success: false, userMessage: "Непредвиденная ошибка!" };
    }
  }

  async get<T>(path: string) {
    return this.request<T>("get", path);
  }

  async post<T, B = unknown>(path: string, body: B) {
    return this.request<T>("post", path, body);
  }

  async put<T, B = unknown>(path: string, body: B) {
    return this.request<T>("put", path, body);
  }

  async delete(path: string) {
    return this.request<null>("delete", path);
  }
}

export const api = new HttpClient(BACKEND_API);
