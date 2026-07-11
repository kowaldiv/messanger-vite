import { z } from "zod";

// Схема для регистрации
export const loginSchema = z.object({
  email: z.string().email("Неверный формат email").min(1, "Email обязателен"),

  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export type LoginInput = z.input<typeof loginSchema>;
