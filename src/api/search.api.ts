import type { PublicChat } from "../schemas/chat.schema";
import type { PublicUser } from "../schemas/user.schema";
import { api } from "./http-client";

export interface SearchData {
  pattern: string;
}

interface SearchResult {
  users: PublicUser[];
  chats: PublicChat[];
}

export const searchApi = {
  // Вход
  search: (data: SearchData) => api.post<SearchResult>("/search", data),
};
