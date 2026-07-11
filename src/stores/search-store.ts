import { create } from "zustand";
import type { PublicUser } from "../schemas/user.schema";
import type { PublicChat } from "../schemas/chat.schema";

interface SearchStore {
  users: PublicUser[];
  chats: PublicChat[];

  setUsersAndChats: (data: {
    users: PublicUser[];
    chats: PublicChat[];
  }) => void;
  clearUsersAndChats: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  users: [],
  chats: [],

  setUsersAndChats: ({ users, chats }) => set({ users, chats }),
  clearUsersAndChats: () => set({ users: [], chats: [] }),
}));
