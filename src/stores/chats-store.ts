import { create } from "zustand";
import type { PublicChat } from "../schemas/chat.schema";

interface ChatsStore {
  chats: PublicChat[];
  setChats: (chats: PublicChat[]) => void;
  addChat: (chat: PublicChat) => void;
  reset: () => void;
}

export const useChatsStore = create<ChatsStore>((set, get) => ({
  chats: [],
  setChats: (chats: PublicChat[]) => set({ chats }),
  addChat: (chat: PublicChat) => set({ chats: [...get().chats, chat] }),

  reset: () => {
    set({
      chats: [],
    });
  },
}));
