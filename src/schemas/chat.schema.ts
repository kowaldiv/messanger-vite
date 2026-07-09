import { z } from "zod";
import { AvatarSchema } from "./avatar.schema";
import { PublicUserSchema } from "./user.schema";
import { PublicMessageSchema } from "./message.schema";

export const ParticipantRoleSchema = z.enum(["moderator", "member", "owner"]);
export type ParticipantRole = z.infer<typeof ParticipantRoleSchema>;

export const PublicChatParticipantSchema = z.object({
  chatId: z.string(),
  role: ParticipantRoleSchema,
  lastReadMessageTime: z.coerce.date(),
  joinedAt: z.coerce.date(),
  user: PublicUserSchema,
  unread: z.number(),
});

export type PublicChatParticipant = z.infer<typeof PublicChatParticipantSchema>;

export const ChatTypeSchema = z.enum(["private", "group", "channel"]);
export type ChatType = z.infer<typeof ChatTypeSchema>;

export const ChannelSettingsSchema = z.object({
  description: z.string().nullable(),
  isPrivate: z.boolean(),
});

// Базовые поля для всех типов чатов
const BaseChatSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  messages: z.array(PublicMessageSchema),
  myParticipant: PublicChatParticipantSchema.optional(),
});

// Схема для private чата
const PrivateChatSchema = BaseChatSchema.extend({
  type: z.literal("private"),
  chatParticipant: PublicChatParticipantSchema,
});

// Схема для group чата
const GroupChatSchema = BaseChatSchema.extend({
  type: z.literal("group"),
  title: z.string(),
  avatars: z.array(AvatarSchema),
  chatParticipants: z.array(PublicChatParticipantSchema),
});

// Схема для channel чата
const ChannelChatSchema = BaseChatSchema.extend({
  type: z.literal("channel"),
  title: z.string(),
  avatars: z.array(AvatarSchema),
  channelSettings: ChannelSettingsSchema,
});

// Discriminated union по полю type
export const PublicChatSchema = z.discriminatedUnion("type", [
  PrivateChatSchema,
  GroupChatSchema,
  ChannelChatSchema,
]);

export type PublicChat = z.infer<typeof PublicChatSchema>;

// 🔥 Массив чатов (для ответа joinedAllChats)
export const PublicChatsArraySchema = z.array(PublicChatSchema);
