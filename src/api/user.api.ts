import type { Session } from "react-router-dom";
import { api } from "./http-client";
import type { PublicUser } from "../schemas/user.schema";

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
  // данные пользователя (надо для psotected route, там получаются данные)
  getUserInfo: () => api.get<PublicUser>("/user/getInfo"),

  // Сессии пользователя
  devices: () => api.get<Session[]>("/user/sessions"),

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
