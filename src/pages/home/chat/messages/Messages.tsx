import { images } from "@/src/assets";
import { useMessagesStore } from "@/src/stores/messages-store";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { TextMessage } from "./variants/Text";

export function Messages() {
  const openedChat = useOpenChatStore((state) => state.openedChat);
  const allMessages = useMessagesStore((state) => state.messages);

  if (!openedChat) return;

  const messages =
    allMessages.find((mes) => mes.chatId === openedChat.id)?.messages || [];

  return (
    <div
      className="w-full max-w-full flex-1 overflow-y-scroll flex flex-col justify-end pb-20 px-2"
      style={{ backgroundImage: `url(${images.background})` }}
    >
      {messages.map((message) => {
        if (message.type === "text") return <TextMessage message={message} />;
      })}
    </div>
  );
}
