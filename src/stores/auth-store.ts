import { create } from "zustand";
import { signIn } from "@/src/api/auth/sign-in";
import { checkResponse } from "../utils/check-response/check-response";
import { signUp } from "../api/auth/sign-up";
import { forgotPassword } from "../api/auth/forgot-password";
import { resetPassword } from "../api/auth/reset-password";

interface AuthStore {
  isRequestPending: boolean;

  login: (
    email: string,
    password: string,
  ) => Promise<{ success: true } | { success: false; userMessage: string }>;
  register: (
    email: string,
    password: string,
  ) => Promise<{ success: true } | { success: false; userMessage: string }>;
  // confirmEmail: (
  //   code: string,
  // ) => Promise<{ success: true } | { success: false; userMessage: string }>;
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

export const useAuthStore = create<AuthStore>((set) => ({
  isRequestPending: false,

  login: async (email, password) => {
    set({ isRequestPending: true });
    try {
      const response = await signIn(email, password);

      const resultOfCheckResponse = await checkResponse(response);
      if (!resultOfCheckResponse.success) {
        throw new Error(resultOfCheckResponse.userMessage);
      }

      set({ isRequestPending: false });
      return { success: true };
    } catch (err) {
      set({ isRequestPending: false });
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при входе!",
      };
    }
  },

  register: async (email, password) => {
    set({ isRequestPending: true });
    try {
      const response = await signUp(email, password);

      const resultOfCheckResponse = await checkResponse(response);
      if (!resultOfCheckResponse.success) {
        throw new Error(resultOfCheckResponse.userMessage);
      }

      set({ isRequestPending: false });
      return { success: true };
    } catch (err) {
      set({ isRequestPending: false });
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при Создании акканута!",
      };
    }
  },

  forgotPassword: async (email) => {
    set({ isRequestPending: true });
    try {
      const response = await forgotPassword(email);

      const resultOfCheckResponse = await checkResponse(response);
      if (!resultOfCheckResponse.success) {
        throw new Error(resultOfCheckResponse.userMessage);
      }

      set({ isRequestPending: false });
      return { success: true };
    } catch (err) {
      set({ isRequestPending: false });
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при Создании акканута!",
      };
    }
  },

  resetPassword: async (newPassword, resetPasswordToken) => {
    set({ isRequestPending: true });
    try {
      const response = await resetPassword(newPassword, resetPasswordToken);

      const resultOfCheckResponse = await checkResponse(response);
      if (!resultOfCheckResponse.success) {
        throw new Error(resultOfCheckResponse.userMessage);
      }

      set({ isRequestPending: false });
      return { success: true };
    } catch (err) {
      set({ isRequestPending: false });
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при Создании акканута!",
      };
    }
  },
}));
