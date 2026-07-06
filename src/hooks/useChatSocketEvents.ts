import { useEffect } from "react";
import { socket } from "../socket-io/client";
import { useChatsStore } from "../stores/chats-store";
import {
  PublicChatsArraySchema,
  PublicChatSchema,
  type PublicChat,
} from "../schemas/chat.schema";
import z from "zod";
import { useMessagesStore } from "../stores/messages-store";
import { useNavBarStore } from "../stores/nav-bar-store";

export function useChatSocketEvents() {
  const setChats = useChatsStore((state) => state.setChats);
  const addChat = useChatsStore.getState().addChat;
  const addMessage = useMessagesStore.getState().addMessage;

  useEffect(() => {
    // 🔥 Обработка ответа после joinAllChats
    const handleJoinedAllChats = (rawData: {
      success: boolean;
      chats: PublicChat[];
    }) => {
      const ResponseSchema = z.object({
        success: z.boolean(),
        chats: PublicChatsArraySchema,
      });

      const result = ResponseSchema.safeParse(rawData);

      if (!result.success) {
        console.error("❌ Invalid joinedAllChats data:", result);
        console.error("📦 Raw data was:", rawData);
        return;
      }

      const { success, chats } = result.data;

      if (success) {
        console.log(`✅ Joined ${chats.length} chats`);
        setChats(chats);
        chats.map((chat) => {
          chat.messages.map((message) => {
            addMessage(chat.id, message);
          });
        });
      }
    };

    // 🔥 Обработка нового чата
    const handleNewChat = (rawData: { chat: PublicChat }) => {
      console.log("📦 Raw chat:new data:", rawData);

      const ResponseSchema = z.object({
        chat: PublicChatSchema,
      });

      const result = ResponseSchema.safeParse(rawData);

      if (!result.success) {
        console.error("❌ Invalid chat:new data:", result);
        console.error("📦 Raw data was:", rawData);
        return;
      }

      console.log("📩 New chat received:", result.data.chat);
      addChat(result.data.chat);
      if (result.data.chat.type !== "private") {
        useNavBarStore.getState().setPanel("chats");
      }
    };

    // 🔥 Обработка ошибок
    const handleError = (data: { message: string }) => {
      console.error("❌ Socket error:", data.message);
    };

    socket.on("joinedAllChats", handleJoinedAllChats);
    socket.on("chat:new", handleNewChat);
    socket.on("error", handleError);

    return () => {
      socket.off("joinedAllChats", handleJoinedAllChats);
      socket.off("chat:new", handleNewChat);
      socket.off("error", handleError);
    };
  }, [setChats, addChat, addMessage]);
}
