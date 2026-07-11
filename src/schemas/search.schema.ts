import z from "zod";
import { PublicUserSchema } from "./user.schema";
import { PublicChatSchema } from "./chat.schema";

export const SearchResultSchema = z.object({
  users: z.array(PublicUserSchema),
  chats: z.array(PublicChatSchema),
});

export type SearchResult = z.infer<typeof SearchResultSchema>;