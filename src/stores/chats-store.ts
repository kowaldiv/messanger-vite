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

  setChats: (chats: PublicChat[]) => set({ chats }),

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
