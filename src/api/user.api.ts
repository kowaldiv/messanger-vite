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
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
}

// Пока что тут заглушки, нормальные api настрою попозже, как с беком закончу

export const userApi = {
  // данные пользователя (надо для psotected route, там получаются данные)
  getUserInfo: () => api.get<PublicUser>("/user/getInfo"),

  // Сессии пользователя
  devices: () => api.get<Session[]>("/user/sessions"),

  // Добавить аватар
  addUserAvatar: (data: AddUserAvatarData) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar); // ← добавляем файл в FormData

    return api.post("/avatar/uploadUserAvatar", formData);
  },

  // Удалить аватар
  deleteUserAvatar: (data: DeleteUserAvatarData) =>
    api.get(`/avatar/deleteUserAvatar/${data.avatarId}`),

  // Поставить аватар пользователя главным
  setPrimaryUserAvatar: (data: SetPrimaryUserAvatarData) =>
    api.post("/auth/forgot-password", data),

  // Обновить профиль пользователя
  updateUserProfile: (data: UpdateUserProfile) =>
    api.post("/user/updateProfile", data),
};
