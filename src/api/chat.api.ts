import { api } from "./http-client";

export interface SearchData {
  chatId: string;
}

export const searchApi = {
  UpdateLastRead: (data: SearchData) =>
    api.put(`/${data.chatId}/last-read`, data),
};
