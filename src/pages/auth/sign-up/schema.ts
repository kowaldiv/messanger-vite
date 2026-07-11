import { z } from "zod";

// Схема для регистрации
export const registerSchema = z
  .object({
    email: z.string().email("Неверный формат email").min(1, "Email обязателен"),

    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),

    passwordAgain: z.string().min(1, "Подтверждение пароля обязательно"),

    username: z
      .string()
      .min(3, "Имя пользователя должно содержать минимум 3 символа")
      .max(30, "Имя пользователя не должно превышать 30 символов")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Имя пользователя может содержать только буквы, цифры и подчеркивание",
      ),

    firstName: z
      .string()
      .min(2, "Имя должно содержать минимум 5 символа")
      .max(50, "Имя не должно превышать 50 символов")
      .regex(
        /^[a-zA-Zа-яА-Я\s-]+$/,
        "Имя может содержать только буквы, пробелы и дефисы",
      ),

    lastName: z
      .string()
      .optional()
      .transform((val) => val?.trim()),
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: "Пароли не совпадают",
    path: ["passwordAgain"],
  });

export type RegisterInput = z.input<typeof registerSchema>;
