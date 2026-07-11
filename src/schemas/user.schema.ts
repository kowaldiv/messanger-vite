import { z } from "zod";
import { AvatarSchema } from "./avatar.schema";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  bio: z.string().nullable(),
  lastSeen: z.coerce.date(),
  createdAt: z.coerce.date(),
});


export const PublicUserSchema = UserSchema.extend({
  avatars: z.array(AvatarSchema),
});

export type User = z.infer<typeof UserSchema>;
export type PublicUser = z.infer<typeof PublicUserSchema>;