import { z } from "zod";
import { AvatarSchema } from "./avatar.schema";
import { PublicUserSchema } from "./user.schema";
import { PublicMessageSchema } from "./message.schema";

// 🔥 Enum для типа чата
export const ChatTypeSchema = z.enum(["private", "group", "channel"]);
export type ChatType = z.infer<typeof ChatTypeSchema>;

// 🔥 Enum для роли участника
export const ParticipantRoleSchema = z.enum(["member", "moderator", "owner"]);
export type ParticipantRole = z.infer<typeof ParticipantRoleSchema>;

// 🔥 Участник чата
export const ChatParticipantSchema = z.object({
  chatId: z.string(),
  role: ParticipantRoleSchema,
  lastReadMessageTime: z.coerce.date(),
  user: PublicUserSchema,
});
export type ChatParticipant = z.infer<typeof ChatParticipantSchema>;

// 🔥 Базовая информация о чате (Добавлено сюда)
export const ChatInfoSchema = z.object({
  id: z.string(),
  type: ChatTypeSchema,
  createdAt: z.coerce.date(),
});
export type ChatInfo = z.infer<typeof ChatInfoSchema>;

// 🔥 Приватный чат
export const PrivateChatSchema = z.object({
  id: z.string(),
  type: z.literal("private"),
  createdAt: z.coerce.date(),
  messages: z.array(PublicMessageSchema),
  chatParticipant: ChatParticipantSchema,
});

// 🔥 Групповой чат
export const GroupChatSchema = z.object({
  id: z.string(),
  type: z.literal("group"),
  title: z.string(),
  createdAt: z.coerce.date(),
  messages: z.array(PublicMessageSchema),
  avatars: z.array(AvatarSchema),
  chatParticipants: z.array(ChatParticipantSchema),
});

// 🔥 Настройки канала
export const ChannelSettingsSchema = z.object({
  description: z.string().nullable(),
  isPrivate: z.boolean(),
});
export type ChannelSettings = z.infer<typeof ChannelSettingsSchema>;

// 🔥 Канал
export const ChannelChatSchema = z.object({
  id: z.string(),
  type: z.literal("channel"),
  title: z.string(),
  createdAt: z.coerce.date(),
  messages: z.array(PublicMessageSchema),
  avatars: z.array(AvatarSchema),
  channelSettings: ChannelSettingsSchema,
});

// 🔥 Discriminated union для всех типов чатов
export const PublicChatSchema = z.discriminatedUnion("type", [
  PrivateChatSchema,
  GroupChatSchema,
  ChannelChatSchema,
]);
export type PublicChat = z.infer<typeof PublicChatSchema>;

// 🔥 Массив чатов (для ответа joinedAllChats)
export const PublicChatsArraySchema = z.array(PublicChatSchema);