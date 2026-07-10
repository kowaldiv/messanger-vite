import { api } from "./http-client";

export interface SearchData {
  chatId: string;
}

export const chatApi = {
  // Обновить время последнего прочитанного сообщения
  updateLastRead: (chatId: string) => api.put(`/chats/${chatId}/last-read`),

  // Удалить чат (только owner)
  deleteChat: (chatId: string) => api.delete(`/chats/${chatId}`),

  // Выйти из чата
  leaveChat: (chatId: string) => api.delete(`/chats/${chatId}/leave`),

  // Передать права владельца
  transferOwnership: (chatId: string, newOwnerId: string) =>
    api.put(`/chats/${chatId}/transfer-ownership`, { newOwnerId }),
};
