import { api } from "./http-client";
import { PublicUserSchema, type PublicUser } from "../schemas/user.schema";
import { sessionsSchema, type Sessions } from "../schemas/session.schema";

export interface AddUserAvatarData {
  avatar: File;
}

export interface DeleteUserAvatarData {
  avatarId: string;
}

export interface SetPrimaryUserAvatarData {
  avatarId: string;
}

export interface UpdateUserProfileData {
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
}

export interface RevokeSessionData {
  tokenId: string;
}

export const userApi = {
  // данные пользователя (надо для psotected route, там получаются данные)
  getUserInfo: () => api.get<PublicUser>("/user/getInfo", PublicUserSchema),

  // Сессии пользователя
  sessions: () => api.get<Sessions>("/auth/sessions", sessionsSchema),

  revokeSession: (data: RevokeSessionData) =>
    api.delete(`/auth/sessions/${data.tokenId}`),

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
  updateUserProfile: (data: UpdateUserProfileData) =>
    api.post("/user/updateProfile", data),
};
