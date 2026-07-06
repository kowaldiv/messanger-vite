import { z } from "zod";
import { AvatarSchema } from "./avatar.schema";
import { PublicInviteLinkSchema } from "./invite-link.schema";

// 🔥 Пользователь сообщения (упрощённая версия PublicUser)
export const MessageUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  avatars: z.array(AvatarSchema),
});
export type MessageUser = z.infer<typeof MessageUserSchema>;

// 🔥 Вложение (файл/картинка)
export const AttachmentSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  messageId: z.string(),
  fileUrl: z.string(),
  fileType: z.string(),
  fileName: z.string(),
});
export type Attachment = z.infer<typeof AttachmentSchema>;

// 🔥 Реакция на сообщение
export const MessageReactionSchema = z.object({
  id: z.string(),
  userId: z.string().nullable(),
  messageId: z.string(),
  emoji: z.string(),
});
export type MessageReaction = z.infer<typeof MessageReactionSchema>;

// 🔥 Ответ на другое сообщение
export const ReplyToSchema = z.object({
  id: z.string(),
  chatId: z.string().nullable(),
  userId: z.string().nullable(),
  text: z.string().nullable(),
  createdAt: z.coerce.date(),
  editedAt: z.coerce.date(),
  user: MessageUserSchema.nullable(),
});
export type ReplyTo = z.infer<typeof ReplyToSchema>;

// 🔥 Текстовое сообщение
export const TextMessageSchema = z.object({
  id: z.string(),
  chatId: z.string(),
  userId: z.string().nullable(),
  text: z.string().nullable(),
  type: z.literal("text"),
  createdAt: z.coerce.date(),
  editedAt: z.coerce.date(),
  user: MessageUserSchema.nullable(),
  attachments: z.array(AttachmentSchema),
  messageReactions: z.array(MessageReactionSchema),
  replyTo: ReplyToSchema.nullable(),
});
export type TextMessage = z.infer<typeof TextMessageSchema>;

// 🔥 Метаданные системного сообщения о присоединении
export const JoinedMessageMetadataSchema = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
});
export type JoinedMessageMetadata = z.infer<typeof JoinedMessageMetadataSchema>;

// 🔥 Системное сообщение о присоединении
export const JoinedMessageSchema = z.object({
  id: z.string(),
  chatId: z.string(),
  type: z.literal("joined"),
  metadata: JoinedMessageMetadataSchema,
  createdAt: z.coerce.date(),
});
export type JoinedMessage = z.infer<typeof JoinedMessageSchema>;

// 🔥 Системное сообщение с приглашением
export const InviteMessageSchema = z.object({
  id: z.string(),
  chatId: z.string(),
  userId: z.string().nullable(),
  type: z.literal("invite"),
  metadata: z.union([
    PublicInviteLinkSchema,
    z.object({ chat: PublicInviteLinkSchema.shape.chat }) // Pick<PublicInviteLink, "chat">
  ]),
  createdAt: z.coerce.date(),
  user: MessageUserSchema.nullable(),
});

export type InviteMessage = z.infer<typeof InviteMessageSchema>;

// 🔥 Discriminated union для всех типов сообщений
export const PublicMessageSchema = z.discriminatedUnion("type", [
  TextMessageSchema,
  JoinedMessageSchema,
  InviteMessageSchema,
]);
export type PublicMessage = z.infer<typeof PublicMessageSchema>;
