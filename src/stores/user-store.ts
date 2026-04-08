import { create } from "zustand";
import { getUserInfo } from "../api/user/get-user-info";
import { checkResponse } from "../utils/check-response/check-response";
import { UserInfoDto } from "../api/user/dto/get-user-info-response.dto";

interface UserStore {
  isRequestPending: boolean;

  userId: string | null;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;

  getUserInfo: () => Promise<
    { success: true } | { success: false; userMessage: string }
  >;
}

export const useUserStore = create<UserStore>((set) => ({
  isRequestPending: false,

  userId: null,
  userName: null,
  firstName: null,
  lastName: null,
  avatar: null,

  getUserInfo: async () => {
    set({ isRequestPending: true });
    try {
      const response = await getUserInfo();

      const result = await checkResponse(response, UserInfoDto);
      if (!result.success) {
        throw new Error(result.userMessage);  
      }

      set({
        isRequestPending: false,
        userId: result.data?.userId,
        userName: result.data?.userName,
      });
      return { success: true };
    } catch (err) {
      set({ isRequestPending: false });
      return {
        success: false,
        userMessage: (err as Error).message || "Ошибка при входе!",
      };
    }
  },
}));
