import {
  SearchResultSchema,
  type SearchResult,
} from "../schemas/search.schema";
import { api } from "./http-client";

export interface SearchData {
  pattern: string;
}

export const searchApi = {
  // Вход
  search: (data: SearchData) =>
    api.post<SearchResult>("/search", data, SearchResultSchema),
};
