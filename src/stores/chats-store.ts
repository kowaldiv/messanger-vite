import { create } from "zustand";
import type { PublicChat, PublicChatParticipant } from "../schemas/chat.schema";

interface ChatsStore {
  chats: PublicChat[];

  setChats: (chats: PublicChat[]) => void;
  addChat: (chat: PublicChat) => void;
  removeChat: (chatId: string) => void;
  moveChatToTop: (chatId: string) => void;
  addParticipantToChat: (chatParticipant: PublicChatParticipant) => void;
  removeParticipantFromChat: (chatId: string, userId: string) => void;
  updateUserLastSeen: (userId: string, lastSeen: Date) => void;
  resetUnreadInChat: (chatId: string) => void;
  incrementUnreadInChat: (chatId: string) => void;
  reset: () => void;
}

export const useChatsStore = create<ChatsStore>((set, get) => ({
  chats: [],

  setChats: (chats: PublicChat[]) => {
    const sorted = [...chats].sort((a, b) => {
      const getLastMsgTime = (chat: PublicChat) => {
        if (chat.messages && chat.messages.length > 0) {
          const last = chat.messages.reduce((latest, msg) =>
            new Date(msg.createdAt) > new Date(latest.createdAt) ? msg : latest,
          );
          return new Date(last.createdAt).getTime();
        }
        // Если сообщений нет – используем дату присоединения или создания чата
        return new Date(
          chat.myParticipant?.joinedAt ?? chat.createdAt,
        ).getTime();
      };
      return getLastMsgTime(b) - getLastMsgTime(a);
    });
    set({ chats: sorted });
  },

  addChat: (chat: PublicChat) => set({ chats: [chat, ...get().chats] }),

  removeChat: (chatId: string) => {
    set((state) => ({
      chats: state.chats.filter((c) => c.id !== chatId),
    }));
  },

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

  addParticipantToChat: (chatParticipant: PublicChatParticipant) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.type !== "group" || chat.id !== chatParticipant.chatId) {
          return chat;
        }
        return {
          ...chat,
          chatParticipants: [...chat.chatParticipants, chatParticipant],
        };
      }),
    }));
  },

  removeParticipantFromChat: (chatId: string, userId: string) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.type !== "group" || chat.id !== chatId) {
          return chat;
        }
        return {
          ...chat,
          chatParticipants: chat.chatParticipants.filter(
            (p) => p.user.id !== userId,
          ),
        };
      }),
    }));
  },

  updateUserLastSeen: (userId: string, lastSeen: Date) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        // Клонируем чат
        const updatedChat = { ...chat };

        // 1. Обновляем в myParticipant (если это текущий пользователь)
        if (updatedChat.myParticipant?.user.id === userId) {
          updatedChat.myParticipant = {
            ...updatedChat.myParticipant,
            user: {
              ...updatedChat.myParticipant.user,
              lastSeen: lastSeen,
            },
          };
        }

        // 2. Обновляем в chatParticipants (для групп и каналов)
        if (updatedChat.type === "group" && updatedChat.chatParticipants) {
          updatedChat.chatParticipants = updatedChat.chatParticipants.map(
            (participant) => {
              if (participant.user.id === userId) {
                return {
                  ...participant,
                  user: {
                    ...participant.user,
                    lastSeen: lastSeen,
                  },
                };
              }
              return participant;
            },
          );
        }

        return updatedChat;
      }),
    }));
  },

  resetUnreadInChat: (chatId: string) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id !== chatId || !chat.myParticipant) {
          return chat;
        }
        return {
          ...chat,
          myParticipant: {
            ...chat.myParticipant,
            unread: 0,
          },
        };
      }),
    }));
  },

  incrementUnreadInChat: (chatId: string) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id !== chatId || !chat.myParticipant) {
          return chat;
        }
        return {
          ...chat,
          myParticipant: {
            ...chat.myParticipant,
            unread: (chat.myParticipant.unread || 0) + 1,
          },
        };
      }),
    }));
  },

  reset: () => set({ chats: [] }),
}));
