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
      const existingChatIndex = state.messages.findIndex(
        (m) => m.chatId === chatId,
      );

      if (existingChatIndex !== -1) {
        // Добавляем сообщение в существующий чат
        const updatedMessages = [...state.messages];
        updatedMessages[existingChatIndex] = {
          chatId,
          messages: [...updatedMessages[existingChatIndex].messages, message],
        };
        return { messages: updatedMessages };
      } else {
        // Создаем новый чат с одним сообщением
        return {
          messages: [...state.messages, { chatId, messages: [message] }],
        };
      }
    }),

  getMessagesByChatId: (chatId: string) => {
    const chat = get().messages.find((m) => m.chatId === chatId);
    return chat?.messages || [];
  },

  reset: () => {
    set({ messages: [] });
  },
}));
