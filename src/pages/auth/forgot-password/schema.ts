import { z } from "zod";

// Схема для регистрации
export const forgotPasswordSchema = z.object({
  email: z.string().email("Неверный формат email").min(1, "Email обязателен"),
});

export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>;
