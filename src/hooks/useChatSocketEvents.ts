import { useEffect } from "react";
import { socket } from "../socket-io/client";
import { useChatsStore } from "../stores/chats-store";
import {
  PublicChatParticipantSchema,
  PublicChatsArraySchema,
  PublicChatSchema,
  type PublicChat,
  type PublicChatParticipant,
} from "../schemas/chat.schema";
import z from "zod";
import { useMessagesStore } from "../stores/messages-store";
import { useNavBarStore } from "../stores/nav-bar-store";
import { useOpenChatStore } from "../stores/open-chat-store";

export function useChatSocketEvents() {
  const setChats = useChatsStore((state) => state.setChats);
  const addChat = useChatsStore.getState().addChat;
  const addMessage = useMessagesStore.getState().addMessage;
  const openedChat = useOpenChatStore((state) => state.openedChat);

  useEffect(() => {
    // Обработка ответа после joinAllChats
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
        console.error("Invalid joinedAllChats data:", result);
        console.error("Raw data was:", rawData);
        return;
      }

      const { success, chats } = result.data;

      if (success) {
        console.log(`Joined ${chats.length} chats`);
        setChats(chats);
        chats.map((chat) => {
          chat.messages.map((message) => {
            addMessage(chat.id, message);
          });
        });
      }
    };

    // Обработка нового чата
    const handleNewChat = (rawData: { chat: PublicChat }) => {
      console.log("Raw chat:new data:", rawData);

      const ResponseSchema = z.object({
        chat: PublicChatSchema,
      });

      const result = ResponseSchema.safeParse(rawData);

      if (!result.success) {
        console.error("Invalid chat:new data:", result);
        console.error("Raw data was:", rawData);
        return;
      }

      console.log("📩 New chat received:", result.data.chat);
      addChat(result.data.chat);
      result.data.chat.messages.map((message) => {
        addMessage(result.data.chat.id, message);
      });
      if (result.data.chat.type !== "private") {
        useNavBarStore.getState().setPanel("chats");
      }
      if (
        result.data.chat.type === "private" &&
        openedChat?.type === "private" &&
        result.data.chat.chatParticipant.user.id ===
          openedChat.chatParticipant.user.id
      ) {
        useOpenChatStore.getState().setOpenedChat(result.data.chat);
      }
    };

    // Обработка нового пользователя в чате
    const handleUserJoinedChat = (rawData: {
      chatParticipant: PublicChatParticipant;
    }) => {
      const ResponseSchema = z.object({
        chatParticipant: PublicChatParticipantSchema,
      });

      const result = ResponseSchema.safeParse(rawData);

      if (!result.success) {
        console.error("Invalid chat:userJoined data:", result);
        return;
      }

      const participant = result.data.chatParticipant;
      console.log(
        `👤 User ${participant.user.username} joined chat ${participant.chatId}`,
      );

      // Обновляем список участников в chatsStore
      useChatsStore.getState().addParticipantToChat(participant);

      // Если это текущий открытый чат - обновляем его
      if (openedChat?.id === participant.chatId) {
        useOpenChatStore.getState().addParticipantToChat(participant);
      }
    };

    // Обработка удаления чата
    const handleChatDeleted = (rawData: { chatId: string }) => {
      const ResponseSchema = z.object({
        chatId: z.string(),
      });

      const result = ResponseSchema.safeParse(rawData);
      if (!result.success) {
        console.error("Invalid chat:deleted data:", result);
        return;
      }

      const { chatId } = result.data;
      console.log(`Chat ${chatId} deleted`);

      useChatsStore.getState().removeChat(chatId);
      useMessagesStore.getState().removeMessagesForChat(chatId);

      // Если удалён открытый чат — сбрасываем его
      if (openedChat?.id === chatId) {
        useOpenChatStore.getState().reset();
      }
    };

    // Обработка выхода пользователя из чата
    const handleUserLeftChat = (rawData: {
      chatId: string;
      userId: string;
    }) => {
      const ResponseSchema = z.object({
        chatId: z.string(),
        userId: z.string(),
      });

      const result = ResponseSchema.safeParse(rawData);
      if (!result.success) {
        console.error("Invalid chat:userLeft data:", result);
        return;
      }

      const { chatId, userId } = result.data;
      console.log(`User ${userId} left chat ${chatId}`);

      useChatsStore.getState().removeParticipantFromChat(chatId, userId);

      if (openedChat?.id === chatId) {
        useOpenChatStore.getState().removeParticipantFromChat(userId);
      }
    };

    // Обработка успешной передачи прав владельца
    const handleTransferOwnershipSuccess = (rawData: {
      chatId: string;
      newOwnerId: string;
    }) => {
      const ResponseSchema = z.object({
        chatId: z.string(),
        newOwnerId: z.string(),
      });

      const result = ResponseSchema.safeParse(rawData);
      if (!result.success) {
        console.error("❌ Invalid chat:transferOwnershipSuccess data:", result);
        return;
      }

      const { chatId, newOwnerId } = result.data;
      console.log(
        `Ownership of chat ${chatId} transferred to user ${newOwnerId}`,
      );

      // Можно обновить роли в сторе, если нужно
    };

    // Обработка ошибок
    const handleError = (data: { message: string }) => {
      console.error("❌ Socket error:", data.message);
    };

    socket.on("joinedAllChats", handleJoinedAllChats);
    socket.on("chat:new", handleNewChat);
    socket.on("chat:userJoined", handleUserJoinedChat);
    socket.on("chat:deleted", handleChatDeleted);
    socket.on("chat:userLeft", handleUserLeftChat);
    socket.on("chat:transferOwnershipSuccess", handleTransferOwnershipSuccess);
    socket.on("error", handleError);

    return () => {
      socket.off("joinedAllChats", handleJoinedAllChats);
      socket.off("chat:new", handleNewChat);
      socket.off("chat:userJoined", handleUserJoinedChat);
      socket.off("chat:deleted", handleChatDeleted);
      socket.off("chat:userLeft", handleUserLeftChat);
      socket.off(
        "chat:transferOwnershipSuccess",
        handleTransferOwnershipSuccess,
      );
      socket.off("error", handleError);
    };
  }, [setChats, addChat, addMessage, openedChat]);
}
