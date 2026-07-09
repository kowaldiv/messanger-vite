import { useEffect } from "react";
import { socket } from "../socket-io/client";
import { useMessagesStore } from "../stores/messages-store";
import { PublicMessageSchema, type PublicMessage } from "../schemas/message.schema";
import z from "zod";
import { useChatsStore } from "../stores/chats-store";

export function useMessageSocketEvents() {
  const addMessage = useMessagesStore((state) => state.addMessage);

  useEffect(() => {
    // 🔥 Новое сообщение
    const handleNewMessage = (rawData: {
      success: boolean;
      message: PublicMessage;
    }) => {
      const ResponseSchema = z.object({
        success: z.boolean(),
        message: PublicMessageSchema,
      });

      const result = ResponseSchema.safeParse(rawData);

      if (!result.success) {
        console.error("❌ Invalid newMessage data:", result);
        console.error("📦 Raw data was:", rawData);
        return;
      }

      const { success, message } = result.data;

      if (success) {
        console.log("💬 New message:", message);
        addMessage(message.chatId, message);
        useChatsStore.getState().moveChatToTop(message.chatId)
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [addMessage]);
}
