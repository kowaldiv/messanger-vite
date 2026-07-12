import { Header } from "./Header";
import { Messages } from "./messages/Messages";
import { Bottom } from "./bottom/Bottom";
import { ChatDetails } from "./chat-details/ChatDetails";
import { useEffect } from "react";
import { chatApi } from "@/src/api/chat.api";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { useChatsStore } from "@/src/stores/chats-store";

export function Chat() {
  const chatId = useOpenChatStore((state) => state.openedChat)?.id;
  const resetUnreadInChat = useChatsStore((state) => state.resetUnreadInChat);

  useEffect(() => {
    const resetUnread = async () => {
      if (!chatId) return;
      const result = await chatApi.updateLastReadMessageTime(chatId);
      console.log(result)
      if (result.success) {
        resetUnreadInChat(chatId);
      }
    };
    resetUnread();
  }, [chatId, resetUnreadInChat]);

  return (
    <div className="flex flex-col flex-1 min-w-dwh sm:min-w-0 h-screen relative overflow-hidden">
      <Header />
      <Messages />
      <Bottom />
      <ChatDetails />
    </div>
  );
}
