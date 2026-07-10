import { create } from "zustand";
import type { Avatar } from "../schemas/avatar.schema";
import type { PublicUser } from "../schemas/user.schema";
import type { Sessions } from "../schemas/session.schema";

interface UserStore {
  id: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  avatars: Avatar[] | null;
  sessions: Sessions | null;

  setUserInfo: (data: PublicUser) => void;
  updateUserInfo: (data: {
    username?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
  }) => void;

  setSessions: (sessions: Sessions) => void;
  deleteSession: (id: string) => void;
  addAvatarFirst: (avatar: Avatar) => void;
  deleteAvatar: (id: string) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
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

  updateUserInfo: (data) => {
    set((state) => ({
      username: data.username ?? state.username,
      firstName: data.firstName ?? state.firstName,
      lastName: data.lastName ?? state.lastName,
      bio: data.bio ?? state.bio,
    }));
  },

  setSessions: (sessions) => {
    set({ sessions });
  },

  deleteSession: (id: string) => {
    set({
      sessions: get().sessions?.filter((session) => session.id !== id),
    });
  },

  addAvatarFirst: (avatar: Avatar) => {
    set((state) => ({
      avatars: state.avatars ? [avatar, ...state.avatars] : [avatar],
    }));
  },

  deleteAvatar: (id: string) => {
    set((state) => ({
      avatars: state.avatars?.filter((avatar) => avatar.id !== id) ?? null,
    }));
  },

  reset: () => {
    set({
      id: null,
      username: null,
      firstName: null,
      lastName: null,
      bio: null,
      avatars: null,
      sessions: null,
    });
  },
}));
