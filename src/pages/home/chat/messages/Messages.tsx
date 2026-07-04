import { images } from "@/src/assets";
import { useMessagesStore } from "@/src/stores/messages-store";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { TextMessage } from "./variants/Text";
import { useEffect, useMemo, useRef } from "react";

export function Messages() {
  const openedChat = useOpenChatStore((state) => state.openedChat);
  const allMessages = useMessagesStore((state) => state.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(() => {
    if (!openedChat) return [];
    return (
      allMessages.find((mes) => mes.chatId === openedChat.id)?.messages || []
    );
  }, [openedChat, allMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!openedChat) return null;

  return (
    <div
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
