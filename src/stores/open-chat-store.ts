import { create } from "zustand";
import type { PublicChat } from "../schemas/chat.schema";

interface OpenChatStore {
  openedChat: PublicChat | null;
  isPreview: boolean;

  setOpenedChat: (openedChat: PublicChat, isPreview?: boolean) => void;
  reset: () => void;
}

export const useOpenChatStore = create<OpenChatStore>((set) => ({
  openedChat: null,
  isPreview: false,

  setOpenedChat: (openedChat, isPreview) =>
    set({
      openedChat,
      isPreview: isPreview || false,
    }),

  reset: () => {
    set({ openedChat: null, isPreview: false });
  },
}));
