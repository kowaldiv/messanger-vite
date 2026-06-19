import { create } from "zustand";
import type { Avatar, Session, User } from "../api/user.api";

interface UserStore {
  id: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  avatars: Avatar[] | null;
  sessions: Session[] | null;

  setUserInfo: (data: User) => void;
  setSessions: (sessions: Session[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  id: null,
  username: null,
  firstName: null,
  lastName: null,
  bio: null,
  avatars: null,
  sessions: null,

  setUserInfo: (data) => {
    set({
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio,
      avatars: data.avatars,
    });
  },

  setSessions: (sessions) => {
    set({ sessions });
  },
}));
