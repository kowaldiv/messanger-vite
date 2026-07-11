import { z } from "zod";

// Схема для регистрации
export const resetPassowordSchema = z
  .object({
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),

    passwordAgain: z.string().min(1, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: "Пароли не совпадают",
    path: ["passwordAgain"],
  });

export type ResetPasswordInput = z.input<typeof resetPassowordSchema>;
