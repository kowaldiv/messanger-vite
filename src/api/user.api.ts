import { api } from "./http-client";

export interface Session {
  id: string;
  userId: string;
  fingerprint: string;
  createdAt: Date;
}

export interface Avatar {
  id: string;
  avatarUrl: string;
  isPrimary: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string | null;
  bio: string | null;
  lastSeen: Date;
  createdAt: Date;
  avatars: Avatar[];
}

export interface AddUserAvatarData {
  avatar: File;
}

export interface DeleteUserAvatarData {
  avatarId: string;
}

export interface SetPrimaryUserAvatarData {
  avatarId: string;
}

export interface UpdateUserProfile {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
}

// Пока что тут заглушки, нормальные api настрою попозже, как с беком закончу

export const userApi = {
  // Сессии пользователя
  devices: () => api.get<Session[]>("/auth/sessions"),

  // Добавить аватар
  addUserAvatar: (data: AddUserAvatarData) =>
    api.post("/avatar/uploadUserAvatar", data),

  // Удалить аватар
  deleteUserAvatar: (data: DeleteUserAvatarData) =>
    api.post("/avatar/deleteUserAvatar", data),

  // Поставить аватар пользователя главным
  setPrimaryUserAvatar: (data: SetPrimaryUserAvatarData) =>
    api.post("/auth/forgot-password", data),

  // Обновить профиль пользователя
  updateUserProfile: (data: UpdateUserProfile) =>
    api.post("/auth/reset-password", data),
};
