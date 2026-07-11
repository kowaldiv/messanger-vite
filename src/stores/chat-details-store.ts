import { create } from "zustand";

interface ChatDetailsStore {
  isOpen: boolean;

  setIsOpen: (isOpen: boolean) => void;
}

export const useChatDetailsStore = create<ChatDetailsStore>((set) => ({
  isOpen: false,

  setIsOpen: (isOpen) => set({ isOpen }),
}));
