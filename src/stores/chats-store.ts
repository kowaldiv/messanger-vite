import { create } from "zustand";
import type { PublicChat } from "../schemas/chat.schema";

interface ChatsStore {
  chats: PublicChat[];

  setChats: (chats: PublicChat[]) => void;
  addChat: (chat: PublicChat) => void;
  moveChatToTop: (chatId: string) => void;
  reset: () => void;
}

export const useChatsStore = create<ChatsStore>((set, get) => ({
  chats: [],

  setChats: (chats: PublicChat[]) => {
    // Сортируем по убыванию даты последнего сообщения
    const sorted = [...chats].sort((a, b) => {
      const getLastMsgTime = (chat: PublicChat) => {
        if (chat.messages && chat.messages.length > 0) {
          const last = chat.messages.reduce((latest, msg) =>
            new Date(msg.createdAt) > new Date(latest.createdAt) ? msg : latest,
          );
          return new Date(last.createdAt).getTime();
        }
        // Если сообщений нет – используем дату создания чата
        return new Date(chat.createdAt).getTime();
      };
      return getLastMsgTime(b) - getLastMsgTime(a);
    });
    set({ chats: sorted });
  },

  addChat: (chat: PublicChat) => set({ chats: [chat, ...get().chats] }),

  moveChatToTop: (chatId: string) => {
    const { chats } = get();
    const index = chats.findIndex((c) => c.id === chatId);
    if (index === -1) return; // если чат не найден, ничего не делаем
    const chat = chats[index];
    const newChats = [
      chat,
      ...chats.slice(0, index),
      ...chats.slice(index + 1),
    ];
    set({ chats: newChats });
  },
  reset: () => set({ chats: [] }),
}));
