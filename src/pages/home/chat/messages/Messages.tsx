import { images } from "@/src/assets";
import { useMessagesStore } from "@/src/stores/messages-store";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { TextMessage } from "./variants/Text";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUserStore } from "@/src/stores/user-store";
import { messageApi } from "@/src/api/message.api";

export function Messages() {
  const openedChat = useOpenChatStore((state) => state.openedChat);
  const allMessages = useMessagesStore((state) => state.messages);
  const addMessage = useMessagesStore.getState().addMessage;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesTopRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentUserId = useUserStore((state) => state.id);
  const lastMessageIdRef = useRef<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!openedChat) return;

    const loadMessages = async () => {
      try {
        const data = await messageApi.getMessages(openedChat.id);
        if (data.success) {
          for (const message of data.data.messages) {
            addMessage(openedChat.id, message);
          }
          // После загрузки — скроллим в самый низ
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.scrollTop =
                containerRef.current.scrollHeight;
            }
          }, 0);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    loadMessages();
  }, [openedChat, addMessage]);

  const messages = useMemo(() => {
    if (!openedChat) return [];
    return (
      allMessages.find((mes) => mes.chatId === openedChat.id)?.messages || []
    );
  }, [openedChat, allMessages]);

  const isNearBottom = (threshold: number = 150) => {
    const container = containerRef.current;
    if (!container) return false;
    return container.scrollTop <= threshold;
  };
  const isNearTop = (threshold: number = 100) => {
    const container = containerRef.current;
    if (!container) return false;
    return container.scrollTop <= threshold;
  };

  // прокрутка в конец когда отправляешь сообщение
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    // Если последнее сообщение новое (пришло снизу) — скроллим
    if (lastMessage && lastMessage.id !== lastMessageIdRef.current) {
      // Только если это сообщение от текущего пользователя или мы уже внизу
      if (
        (lastMessage.type === "text" &&
          lastMessage.user?.id === currentUserId) ||
        isNearBottom(150)
      ) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      lastMessageIdRef.current = lastMessage.id;
    }
  }, [messages, currentUserId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !openedChat || messages.length === 0) return;

    const handleScroll = async () => {
      if (!isNearTop()) return;

      const oldestMessage = messages[0];
      const data = await messageApi.getMessages(
        openedChat.id,
        oldestMessage.id,
      );

      if (data.success) {
        for (const message of data.data.messages) {
          addMessage(openedChat.id, message);
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [openedChat, messages, addMessage]);

  if (!openedChat) return null;

  return (
    <div
      ref={containerRef}
      className="w-full flex-1 overflow-y-auto"
      style={{
        backgroundImage: `url(${images.background})`,
        height: "100%",
        minHeight: 0,
      }}
    >
      <div className="flex flex-col-reverse gap-2 min-h-full px-2 pb-15 pt-10">
        {/* Визуально внизу (первый в DOM) */}
        <div ref={messagesEndRef} />

        {/* Сообщения в обратном порядке */}
        {[...messages].reverse().map((message, index) => {
          if (message.type === "text")
            return <TextMessage key={index} message={message} />;
          return null;
        })}

        {/* Визуально сверху (последний в DOM) */}
        <div ref={messagesTopRef} />
      </div>
    </div>
  );
}
