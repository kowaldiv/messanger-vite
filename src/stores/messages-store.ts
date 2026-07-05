import { create } from "zustand";
import type { PublicMessage } from "../schemas/message.schema";

interface MessagesStore {
  messages: { chatId: string; messages: PublicMessage[] }[];

  addMessage: (chatId: string, message: PublicMessage) => void;
  getMessagesByChatId: (chatId: string) => PublicMessage[];
  reset: () => void;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
  messages: [],

  addMessage: (chatId: string, message: PublicMessage) =>
    set((state) => {
      // 1. Ищем существующий чат
      const existingChatIndex = state.messages.findIndex(
        (m) => m.chatId === chatId,
      );

      const updatedMessages = [...state.messages];

      if (existingChatIndex !== -1) {
        // 2. Чат существует – проверяем дубликат по id (или по другому уникальному полю)
        const chat = updatedMessages[existingChatIndex];
        const isDuplicate = chat.messages.some((m) => m.id === message.id);
        if (isDuplicate) {
          // Если сообщение уже есть – возвращаем состояние без изменений
          return state;
        }

        // 3. Добавляем новое сообщение и сортируем их по времени (по возрастанию – старые сверху)
        const newMessages = [...chat.messages, message];
        newMessages.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        updatedMessages[existingChatIndex] = {
          ...chat,
          messages: newMessages,
        };
      } else {
        // 4. Новый чат – создаём с одним сообщением
        updatedMessages.push({ chatId, messages: [message] });
      }

      // 5. Сортируем список чатов по времени последнего сообщения (новые сверху)
      updatedMessages.sort((a, b) => {
        const aLast = a.messages[a.messages.length - 1]?.createdAt || 0;
        const bLast = b.messages[b.messages.length - 1]?.createdAt || 0;
        return new Date(bLast).getTime() - new Date(aLast).getTime();
      });

      return { messages: updatedMessages };
    }),

  getMessagesByChatId: (chatId: string) => {
    const chat = get().messages.find((m) => m.chatId === chatId);
    return chat?.messages || [];
  },

  reset: () => {
    set({ messages: [] });
  },
}));
