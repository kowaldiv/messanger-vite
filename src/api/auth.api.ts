import { PublicUserSchema, type PublicUser } from "../schemas/user.schema";
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

// export interface EmailVerificationData {
//   code: string;
// }

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export const authApi = {
  // Вход
  login: (data: LoginData) =>
    api.post<PublicUser>("/auth/login", data, PublicUserSchema),

  // Регистрация
  register: (data: RegisterData) =>
    api.post<PublicUser>("/auth/register", data, PublicUserSchema),

  // Подтвердить почту
  // emailVerification: (data: EmailVerificationData) =>
  //   api.post("/auth/register", data),

  // Запрос на восстановление (отправляем email)
  forgotPassword: (data: ForgotPasswordData) =>
    api.post("/auth/forgot-password", data),

  // Сброс пароля (с токеном из письма)
  resetPassword: (data: ResetPasswordData) =>
    api.post("/auth/reset-password", data),

  // Выход (опционально, если сервер аннулирует токен)
  logout: () => api.get("/auth/logout"),

  refreshToken: () => api.get("/auth/refresh-token"),
};
