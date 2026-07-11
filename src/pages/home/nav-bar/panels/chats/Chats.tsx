import { images } from "@/src/assets";
import type { PublicMessage } from "@/src/schemas/message.schema";
import { useChatsStore } from "@/src/stores/chats-store";
import { useMessagesStore } from "@/src/stores/messages-store";
import { useNavBarStore } from "@/src/stores/nav-bar-store";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { Button } from "@/src/ui/components/atoms/Button";

function getSubtitle(lastMessage: PublicMessage | undefined): string {
  if (!lastMessage) return "Нет сообщений";

  switch (lastMessage.type) {
    case "text":
      return `${lastMessage.user?.firstName}: ${lastMessage.text}`;
    case "invite":
      return `${lastMessage.user?.firstName} приглашение в чат`;
    case "joined":
      return `${lastMessage.metadata.firstName} зашел(а) в чат`;
    default:
      return "Нет сообщений";
  }
}

const formatMessageDate = (date: Date) => {
  const now = new Date();
  const messageDate = new Date(date);

  // Сегодня
  if (messageDate.toDateString() === now.toDateString()) {
    return messageDate.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Вчера
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (messageDate.toDateString() === yesterday.toDateString()) {
    return "Вчера";
  }

  // Другие дни
  return messageDate.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  });
};

export function Chats() {
  const chats = useChatsStore((state) => state.chats);
  const messages = useMessagesStore((state) => state.messages);

  return (
    <ul className="flex flex-1 flex-col gap-3 pb-10 overflow-y-auto hide-scrollbar">
      {chats.map((chat) => {
        // 1. Вычисляем отображаемые данные в зависимости от типа чата
        let title = "";
        let subtitle = "";
        let avatarUrl = "";

        const chatMessages =
          messages.find((mes) => mes.chatId === chat.id)?.messages || [];

        const lastMessage = chatMessages.at(-1);

        if (chat.type === "private") {
          const participant = chat.chatParticipant;
          const firstName = participant.user?.firstName || "";
          const lastName = participant.user?.lastName || "";

          title = `${firstName} ${lastName}`.trim();
          subtitle = getSubtitle(lastMessage);
          avatarUrl =
            participant.user.avatars?.[0]?.avatarUrl || images.icons.avatar;
        } else if (chat.type === "group") {
          title = chat.title;
          subtitle = getSubtitle(lastMessage);
          avatarUrl = chat.avatars?.[0]?.avatarUrl || images.icons.groupAvatar;
        } else if (chat.type === "channel") {
          title = chat.title;
          subtitle = getSubtitle(lastMessage);
          avatarUrl = chat.avatars?.[0]?.avatarUrl || images.icons.groupAvatar;
        }

        // 2. Рендерим унифицированный UI для всех типов
        return (
          <Button
            onClick={() => {
              useOpenChatStore.getState().setOpenedChat(chat);
              useNavBarStore.getState().setIsHidden(true);
            }}
            key={chat.id}
            className="flex items-center gap-3 p-4 bg-secondary rounded-xl"
          >
            {/* Аватарка */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <img
                src={avatarUrl}
                alt={title}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Контент */}
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <h3 className="font-semibold truncate text-left">{title}</h3>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-sm truncate">{subtitle}</p>
                <span className="text-xs ml-2 shrink-0">
                  {lastMessage && (
                    <span className="text-xs">
                      {formatMessageDate(lastMessage.createdAt)}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </Button>
        );
      })}
      <Button
        onClick={() =>
          useNavBarStore.getState().setPanel("create-group-or-chat")
        }
        className="absolute bottom-3 right-3"
      >
        <img src={images.icons.close} className="rotate-45 w-6 h-6" alt="" />
      </Button>
    </ul>
  );
}
