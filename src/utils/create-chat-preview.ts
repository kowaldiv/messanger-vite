import type { PublicChat } from "../schemas/chat.schema";
import type { PublicUser } from "../schemas/user.schema";

export function createChatPreview(user: PublicUser): PublicChat {
  return {
    id: user.id, // Временный ID
    type: "private",
    createdAt: new Date(),
    messages: [],
    chatParticipant: {
      chatId: user.id,
      user: user,
      role: "member",
      lastReadMessageTime: new Date(),
    },
  };
}