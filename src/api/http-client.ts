import axios, { AxiosError } from "axios";
import { BACKEND_API } from "../config/backend.api";

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
    const isFormData = body instanceof FormData;

    const config = {
      method,
      url: `${this.baseUrl}${path}`,
      headers: isFormData
        ? {  } // ← для FormData НЕ ставим Content-Type, axios сам всё сделает
        : { "Content-Type": "application/json" },
      withCredentials: true,
      data: body,
    };

    const makeRequest = () => axios(config);
    const getErrorMsg = (status?: number): string => {
      const messages: Record<number, string> = {
        400: "Плохие данные",
        401: "Требуется вход",
        404: "Ресурс не найден",
        409: "Конфликт",
      };
      return messages[status || 0] || "Непредвиденная ошибка!";
    };

    try {
      const res = await makeRequest();
      return { success: true, data: res.data as T };
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        // Если 401 - пробуем обновить токен
        if (status === 401) {
          try {
            await axios.get(`${this.baseUrl}/auth/refresh-token`, {
              withCredentials: true,
            });
            const res = await makeRequest();
            return { success: true, data: res.data as T };
          } catch (refreshError) {
            if (refreshError instanceof AxiosError) {
              const refreshStatus = refreshError.response?.status;
              if (refreshStatus === 401) {
                window.location.href = "/sign-in";
              }
              return {
                success: false,
                userMessage: getErrorMsg(refreshStatus),
              };
            }
          }
        }

        return { success: false, userMessage: getErrorMsg(status) };
      }

      console.error("Unknown error:", error);
      return { success: false, userMessage: "Непредвиденная ошибка!" };
    }
  }

  async get<T>(path: string) {
    return this.request<T>("get", path);
  }

  async post<T>(path: string, body: unknown) {
    return this.request<T>("post", path, body);
  }

  async put<T>(path: string, body: unknown) {
    return this.request<T>("put", path, body);
  }

  async delete(path: string) {
    return this.request<null>("delete", path);
  }
}

export const api = new HttpClient(BACKEND_API);
