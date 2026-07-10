import { create } from "zustand";
import type { PublicChat, PublicChatParticipant } from "../schemas/chat.schema";

interface OpenChatStore {
  openedChat: PublicChat | null;
  isPreview: boolean;

  setOpenedChat: (openedChat: PublicChat | null, isPreview?: boolean) => void;
  addParticipantToChat: (participant: PublicChatParticipant) => void;
  removeParticipantFromChat: (userId: string) => void;
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

  addParticipantToChat: (participant: PublicChatParticipant) => {
    set((state) => {
      if (!state.openedChat) return state;
      if (
        state.openedChat.type !== "group" ||
        state.openedChat.id !== participant.chatId
      ) {
        return state;
      }

      return {
        openedChat: {
          ...state.openedChat,
          chatParticipants: [...state.openedChat.chatParticipants, participant],
        },
      };
    });
  },

  removeParticipantFromChat: (userId: string) => {
    set((state) => {
      if (!state.openedChat) return state;
      if (state.openedChat.type !== "group") return state;
      return {
        openedChat: {
          ...state.openedChat,
          chatParticipants: state.openedChat.chatParticipants.filter(
            (p) => p.user.id !== userId,
          ),
        },
      };
    });
  },

  reset: () => {
    set({ openedChat: null, isPreview: false });
  },
}));
