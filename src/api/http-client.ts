import axios from "axios";
import { BACKEND_API } from "../config/backend.api";
import { checkResponse } from "../utils/check-response/check-response";
import { ApiError } from "../utils/check-response/api-errors";

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(
    path: string,
  ): Promise<
    { success: true; data: T } | { success: false; userMessage: string }
  > {
    try {
      const res = await axios.get(`${this.baseUrl}${path}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await checkResponse<T>(res);
      return { success: true, data: data };
    } catch (err) {
      if (err instanceof ApiError) {
        console.log(`API Error (${err.statusCode}): ${err.userMessage}`);
        return {
          success: false,
          userMessage: err.userMessage,
        };
      }

      console.error("Unknown error:", err);
      return {
        success: false,
        userMessage: "Непредвиденная ошибка!",
      };
    }
  }

  async post<T extends object, B = unknown>(
    path: string,
    body: B,
  ): Promise<
    { success: true; data: T } | { success: false; userMessage: string }
  > {
    try {
      const res = await axios.post(`${this.baseUrl}${path}`, body, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await checkResponse<T>(res);

      return {
        success: true,
        data: data,
      };
    } catch (err) {
      if (err instanceof ApiError) {
        console.log(`API Error (${err.statusCode}): ${err.userMessage}`);
        return {
          success: false,
          userMessage: err.userMessage,
        };
      }

      console.error("Unknown error:", err);
      return {
        success: false,
        userMessage: "Непредвиденная ошибка!",
      };
    }
  }

  async put<T extends object, B = unknown>(
    path: string,
    body: B,
  ): Promise<
    { success: true; data: T } | { success: false; userMessage: string }
  > {
    try {
      const res = await axios.put(`${this.baseUrl}${path}`, body, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await checkResponse<T>(res);

      return {
        success: true,
        data: data,
      };
    } catch (err) {
      if (err instanceof ApiError) {
        console.log(`API Error (${err.statusCode}): ${err.userMessage}`);
        return {
          success: false,
          userMessage: err.userMessage,
        };
      }

      console.error("Unknown error:", err);
      return {
        success: false,
        userMessage: "Непредвиденная ошибка!",
      };
    }
  }

  async delete(
    path: string,
  ): Promise<{ success: true } | { success: false; userMessage: string }> {
    try {
      const res = await axios.delete(`${this.baseUrl}${path}`);

      await checkResponse(res);

      return { success: true };
    } catch (err) {
      if (err instanceof ApiError) {
        console.log(`API Error (${err.statusCode}): ${err.userMessage}`);
        return {
          success: false,
          userMessage: err.userMessage,
        };
      }

      console.error("Unknown error:", err);
      return {
        success: false,
        userMessage: "Непредвиденная ошибка!",
      };
    }
  }
}

export const api = new HttpClient(BACKEND_API);
