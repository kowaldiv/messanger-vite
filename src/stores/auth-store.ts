import { create } from "zustand";
import { signIn } from "@/src/api/auth/sign-in";
import { checkResponse } from "../utils/check-response/check-response";
import { signUp } from "../api/auth/sign-up";
import { forgotPassword } from "../api/auth/forgot-password";
import { resetPassword } from "../api/auth/reset-password";
import { emailVerification } from "../api/auth/email-verification";

interface AuthStore {
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: true } | { success: false; userMessage: string }>;
  register: (
    email: string,
    password: string,
  ) => Promise<{ success: true } | { success: false; userMessage: string }>;
  emailVerification: (
    code: string,
  ) => Promise<{ success: true } | { success: false; userMessage: string }>;
  // если я сделаю как в тг по типу кода который в тг приходит
  // twoFactorAuth: (
  //   code: string,
  // ) => Promise<{ success: true } | { success: false; userMessage: string }>;
  forgotPassword: (
    email: string,
  ) => Promise<{ success: true } | { success: false; userMessage: string }>;
  resetPassword: (
    newPassword: string,
    resetPasswordToken: string,
  ) => Promise<{ success: true } | { success: false; userMessage: string }>;
}

export const useAuthStore = create<AuthStore>(() => ({
  login: async (email, password) => {
    try {
      const response = await signIn(email, password);

      const resultOfCheckResponse = await checkResponse(response);
      if (!resultOfCheckResponse.success) {
        throw new Error(resultOfCheckResponse.userMessage);
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при входе!",
      };
    }
  },

  register: async (email, password) => {
    try {
      const response = await signUp(email, password);

      const resultOfCheckResponse = await checkResponse(response);
      if (!resultOfCheckResponse.success) {
        throw new Error(resultOfCheckResponse.userMessage);
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при Создании акканута!",
      };
    }
  },

  emailVerification: async (code) => {
    try {
      const response = await emailVerification(code);

      const resultOfCheckResponse = await checkResponse(response);
      if (!resultOfCheckResponse.success) {
        throw new Error(resultOfCheckResponse.userMessage);
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при Создании акканута!",
      };
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await forgotPassword(email);

      const resultOfCheckResponse = await checkResponse(response);
      if (!resultOfCheckResponse.success) {
        throw new Error(resultOfCheckResponse.userMessage);
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при Создании акканута!",
      };
    }
  },

  resetPassword: async (newPassword, resetPasswordToken) => {
    try {
      const response = await resetPassword(newPassword, resetPasswordToken);

      const resultOfCheckResponse = await checkResponse(response);
      if (!resultOfCheckResponse.success) {
        throw new Error(resultOfCheckResponse.userMessage);
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при Создании акканута!",
      };
    }
  },
}));
