import { api } from "./http-client";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  username: string;
}

export interface EmailVerificationData {
  code: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export const authApi = {
  // Вход
  login: (data: LoginData) => api.post("/auth/login", data),

  // Регистрация
  register: (data: RegisterData) => api.post("/auth/register", data),

  // Подтвердить почту
  emailVerification: (data: EmailVerificationData) =>
    api.post("/auth/register", data),

  // Запрос на восстановление (отправляем email)
  forgotPassword: (data: ForgotPasswordData) =>
    api.post("/auth/forgot-password", data),

  // Сброс пароля (с токеном из письма)
  resetPassword: (data: ResetPasswordData) =>
    api.post("/auth/reset-password", data),

  // Обновление токена (если нужно)
  refreshToken: () => api.get("/auth/refresh"),

  // Выход (опционально, если сервер аннулирует токен)
  logout: () => api.post("/auth/logout", {}),
};
