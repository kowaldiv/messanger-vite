import { create } from "zustand";
import { getMyInfo } from "../api/user/get-my-info";
import { checkResponse } from "../utils/check-response/check-response";
import { UserInfoDto } from "../api/user/dto/get-user-info-response.dto";
import { uploadNewAvatar } from "../api/user/upload-new-avatar";
import { deleteAvatar } from "../api/user/delete-avatar";
import { updateUserProfileInfo } from "../api/user/update-user-profile-info";
import { logout } from "../api/user/logout";
import { getUserDevices } from "../api/user/get-user-devices";
import { DevicesDTO } from "../api/user/dto/get-user-devices-response.dto";

interface UserStore {
  userId: string | null;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  about: string | null;
  avatars: { avatarUrl: string; avatarId: string; order: number }[] | null;
  devices: { name: string; from: string }[] | null;

  getMyInfo: () => Promise<
    { success: true } | { success: false; userMessage: string }
  >;

  uploadNewAvatar: (
    avatar: File,
  ) => Promise<{ success: true } | { success: false; userMessage: string }>;

  deleteAvatar: (
    avatarId: string,
  ) => Promise<{ success: true } | { success: false; userMessage: string }>;

  updateUserProfieInfo: ({
    userName,
    firstName,
    lastName,
    about,
  }: {
    userName?: string;
    firstName?: string;
    lastName?: string;
    about?: string;
  }) => Promise<{ success: true } | { success: false; userMessage: string }>;

  logout: () => Promise<
    { success: true } | { success: false; userMessage: string }
  >;

  getUserDevices: () => Promise<
    { success: true } | { success: false; userMessage: string }
  >;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  userName: null,
  firstName: null,
  lastName: null,
  about: null,
  avatars: null,
  devices: null,

  getMyInfo: async () => {
    try {
      const response = await getMyInfo();

      const result = await checkResponse(response, UserInfoDto);
      if (!result.success) {
        throw new Error(result.userMessage);
      }

      set({
        userId: result.data?.userId,
        userName: result.data?.userName,
      });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при входе!",
      };
    }
  },

  uploadNewAvatar: async (avatar) => {
    try {
      const response = await uploadNewAvatar(avatar);

      const result = await checkResponse(response);
      if (!result.success) {
        throw new Error(result.userMessage);
      }
      // TODO: сделать загрузку аватара
      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при загрузке аватара!",
      };
    }
  },

  deleteAvatar: async (avatarId) => {
    try {
      const response = await deleteAvatar(avatarId);

      const result = await checkResponse(response);
      if (!result.success) {
        throw new Error(result.userMessage);
      }
      // TODO: сделать удаление аватара
      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при загрузке аватара!",
      };
    }
  },

  updateUserProfieInfo: async ({ userName, firstName, lastName, about }) => {
    try {
      const response = await updateUserProfileInfo({
        userName,
        firstName,
        lastName,
        about,
      });

      const result = await checkResponse(response);
      if (!result.success) {
        throw new Error(result.userMessage);
      }

      set({
        userName,
        firstName,
        lastName,
        about,
      });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при загрузке аватара!",
      };
    }
  },

  logout: async () => {
    try {
      const response = await logout();

      const result = await checkResponse(response);
      if (!result.success) {
        throw new Error(result.userMessage);
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при выходе из профиля!",
      };
    }
  },

  getUserDevices: async () => {
    try {
      const response = await getUserDevices();

      const result = await checkResponse(response, DevicesDTO);
      if (!result.success) {
        throw new Error(result.userMessage);
      }

      set({ devices: result.data?.devices });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при загрузке устройств!",
      };
    }
  },
}));

// Пример возможных данных пользователя
// userId: "asdlfkjhasdflkjhasdflkjhaflkjh",
// userName: "kowaldiv",
// firstName: "Владислав",
// lastName: "Ефименко",
// about: "<div>kowal</div>",
// avatars: [
//   {
//     avatarId: "flaj;sdfh",
//     avatarUrl:
//       "https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg",
//     order: 1,
//   },
//   {
//     avatarId: "flaj;sdfh",
//     avatarUrl: "https://avatarko.ru/img/kartinka/14/zhivotnye_kot_13379.jpg",
//     order: 1,
//   },
//   {
//     avatarId: "flaj;sdfh",
//     avatarUrl:
//       "https://png.pngtree.com/thumb_back/fh260/background/20240717/pngtree-new-nature-beautiful-background-pictures-image_16017682.jpg",
//     order: 1,
//   },
// ],
// devices: [
//   { name: "iPhone", from: "Frankfurt am Main, Germany" },
//   { name: "Windows PC", from: "Tumen ios 26.2" },
// ],
