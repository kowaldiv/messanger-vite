import { images } from "@/src/assets";
import { useMessagesStore } from "@/src/stores/messages-store";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { TextMessage } from "./variants/Text";
import { useEffect, useMemo, useRef } from "react";
import { useUserStore } from "@/src/stores/user-store";

export function Messages() {
  const openedChat = useOpenChatStore((state) => state.openedChat);
  const allMessages = useMessagesStore((state) => state.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentUserId = useUserStore((state) => state.id);

  const messages = useMemo(() => {
    if (!openedChat) return [];
    return (
      allMessages.find((mes) => mes.chatId === openedChat.id)?.messages || []
    );
  }, [openedChat, allMessages]);

  const isNearBottom = (threshold: number = 400) => {
    const container = containerRef.current;
    if (!container) return false;
    return (
      container.scrollHeight - container.scrollTop - container.clientHeight <=
      threshold
    );
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage &&
      lastMessage.type === "text" &&
      lastMessage.user?.id === currentUserId
    ) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    if (isNearBottom(150)) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, currentUserId]);

  if (!openedChat) return null;

  return (
    <div
      ref={containerRef}
      className="w-full flex-1 overflow-y-auto"
      style={{
        backgroundImage: `url(${images.background})`,
        height: "100%", // Явно задаем высоту
        minHeight: 0,
      }}
    >
      <div className="flex flex-col min-h-full justify-end px-2 pb-15">
        {messages.map((message, index) => {
          if (message.type === "text")
            return <TextMessage key={index} message={message} />;
          return null;
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
