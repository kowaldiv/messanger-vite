import { z } from "zod";

export const AvatarSchema = z.object({
  id: z.string(),
  avatarUrl: z.string(),
  isPrimary: z.boolean(),
  createdAt: z.coerce.date(),
});

// Выводим тип из схемы
export type Avatar = z.infer<typeof AvatarSchema>;