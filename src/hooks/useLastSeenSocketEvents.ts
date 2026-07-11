import { useEffect } from "react";
import { socket } from "../socket-io/client";
import { useChatsStore } from "../stores/chats-store";
import { useOpenChatStore } from "../stores/open-chat-store";

export function useLastSeenSocketEvents() {
  const updateUserLastSeen = useChatsStore((state) => state.updateUserLastSeen);
  const updateLastSeenInOpenedChat = useOpenChatStore(
    (state) => state.updateLastSeenInOpenedChat,
  );

  useEffect(() => {
    const handleLastSeenUpdated = (data: {
      userId: string;
      lastSeen: string | Date;
    }) => {
      console.log("🔄 LastSeen updated:", data);
      updateUserLastSeen(data.userId, new Date(data.lastSeen));
      updateLastSeenInOpenedChat(data.userId, new Date(data.lastSeen));
    };

    socket.on("user:lastSeenUpdated", handleLastSeenUpdated);

    return () => {
      socket.off("user:lastSeenUpdated", handleLastSeenUpdated);
    };
  }, [updateUserLastSeen, updateLastSeenInOpenedChat]);
}
