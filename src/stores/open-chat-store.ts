import { create } from "zustand";
import type { PublicChat, PublicChatParticipant } from "../schemas/chat.schema";

interface OpenChatStore {
  openedChat: PublicChat | null;
  isPreview: boolean;

  setOpenedChat: (openedChat: PublicChat | null, isPreview?: boolean) => void;
  addParticipantToChat: (participant: PublicChatParticipant) => void;
  removeParticipantFromChat: (userId: string) => void;
  updateLastSeenInOpenedChat: (userId: string, lastSeen: Date) => void;
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

  updateLastSeenInOpenedChat: (userId: string, lastSeen: Date) => {
    set((state) => {
      const chat = state.openedChat;
      if (!chat) return state;

      // Проверяем наличие пользователя
      const hasUser =
        (chat.type === "private" && chat.chatParticipant?.user.id === userId) ||
        chat.myParticipant?.user.id === userId ||
        (chat.type === "group" &&
          chat.chatParticipants?.some((p) => p.user.id === userId));

      if (!hasUser) return state;

      const newChat = structuredClone(chat);

      if (
        newChat.type === "private" &&
        newChat.chatParticipant?.user.id === userId
      ) {
        newChat.chatParticipant.user.lastSeen = lastSeen;
      }

      if (newChat.myParticipant?.user.id === userId) {
        newChat.myParticipant.user.lastSeen = lastSeen;
      }

      if (newChat.type === "group" && newChat.chatParticipants) {
        newChat.chatParticipants = newChat.chatParticipants.map((p) => ({
          ...p,
          user: {
            ...p.user,
            lastSeen: p.user.id === userId ? lastSeen : p.user.lastSeen,
          },
        }));
      }

      return { openedChat: newChat };
    });
  },

  reset: () => {
    set({ openedChat: null, isPreview: false });
  },
}));
