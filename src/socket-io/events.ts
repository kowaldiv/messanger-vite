import type { PublicChat, PublicChatParticipant } from "../schemas/chat.schema";
import type { PublicMessage } from "../schemas/message.schema";

// Сервер -> Клиент (то, что мы получаем)
export interface ServerToClientEvents {
  // Ответ от сервера после успешного подключения ко всем чатам
  joinedAllChats: (data: { success: boolean; chats: PublicChat[] }) => void;

  // Общая ошибка
  error: (data: { message: string }) => void;

  // Новый чат
  "chat:new": (data: { chat: PublicChat }) => void;

  // Новое сообщение
  newMessage: (data: { success: boolean; message: PublicMessage }) => void;

  "chat:userJoined": (data: { chatParticipant: PublicChatParticipant }) => void;

  "chat:deleted": (data: { chatId: string }) => void;

  "chat:userLeft": (data: { chatId: string; userId: string }) => void;

  "chat:transferOwnershipSuccess": (data: {
    chatId: string;
    newOwnerId: string;
  }) => void;
}

// Клиент -> Сервер (то, что отправляем)
export interface ClientToServerEvents {
  // Запрос на подключение ко всем чатам (без данных)
  joinAllChats: () => void;

  // Отправить сообщение
  sendMessage: (data: { chatIdOrUserId: string; text: string }) => void;

  createChat: (
    data:
      | { type: "group"; title: string }
      | {
          type: "channel";
          title: string;
          description: string;
          isPrivate: boolean;
        },
  ) => void;

  invite: (data: { destinationChatId: string; chatIds: string[] }) => void;

  joinChat: (data: { inviteLinkToken?: string; chatId?: string }) => void;

  kickUser: (data: { chatId: string; targetUserId: string }) => void;

  deleteChat: (data: { chatId: string }) => void;

  leaveChat: (data: { chatId: string }) => void;

  transferOwnership: (data: { chatId: string; newOwnerId: string }) => void;
}
