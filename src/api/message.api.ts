import type { PublicMessage } from "../schemas/message.schema";
import { api } from "./http-client";

interface GetMessagesResult {
  messages: PublicMessage[];
  hasMore: boolean;
}

export const messageApi = {
  getMessages: (chatId: string, before?: string) => {
    const url = before
      ? `/message/${chatId}?before=${before}`
      : `/message/${chatId}`;
    return api.get<GetMessagesResult>(url);
  },
};
