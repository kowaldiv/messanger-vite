import { z } from "zod";
import { AvatarSchema } from "./avatar.schema";

export const InviteLinkChatInfoSchema = z.object({
  id: z.string(),
  type: z.enum(["private", "group", "channel"]),
  createdAt: z.coerce.date(),
  title: z.string(),
  avatars: z.array(AvatarSchema),
});

export const PublicInviteLinkSchema = z.object({
  id: z.string(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  chat: InviteLinkChatInfoSchema,
});

export type InviteLinkChatInfo = z.infer<typeof InviteLinkChatInfoSchema>;
export type PublicInviteLink = z.infer<typeof PublicInviteLinkSchema>;