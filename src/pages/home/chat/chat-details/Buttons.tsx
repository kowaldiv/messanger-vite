import { images } from "@/src/assets";
import type { Avatar } from "@/src/schemas/avatar.schema";
import { socket } from "@/src/socket-io/client";
import { useChatsStore } from "@/src/stores/chats-store";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { Button } from "@/src/ui/components/atoms/Button";
import { useState } from "react";

export function Buttons({
  chatId,
  isUserOwner,
}: {
  chatId: string;
  isUserOwner: boolean;
}) {
  const [isChatsToInvitePreview, setIsChatsToInvitePreview] = useState(false);

  const buttons = [
    {
      alt: "Пригласить пользователей",
      text: "Пригласить пользователей",
      onClick: () => setIsChatsToInvitePreview(true),
    },

    {
      alt: isUserOwner ? "Удалить чат" : "Выйти из чата",
      text: isUserOwner ? "Удалить чат" : "Выйти из чата",
      onClick: isUserOwner
        ? () => {
            useOpenChatStore.getState().setOpenedChat(null);
            socket.emit("deleteChat", {
              chatId: chatId,
            });
          }
        : () => {
            useOpenChatStore.getState().setOpenedChat(null);
            socket.emit("leaveChat", {
              chatId: chatId,
            });
          },
    },
  ];

  return (
    <div className="flex flex-col gap-2 mt-6 relative">
      {buttons.map((button) => {
        return (
          <Button
            key={button.text}
            variant="default"
            className="w-full flex items-center gap-4"
            onClick={button.onClick}
          >
            {button.text}
          </Button>
        );
      })}
      {isChatsToInvitePreview ? (
        <ChatsToInvitePreview
          setIsChatsToInvitePreview={setIsChatsToInvitePreview}
          chatId={chatId}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function ChatsToInvitePreview({
  chatId,
  setIsChatsToInvitePreview,
}: {
  chatId: string;
  setIsChatsToInvitePreview: (isChatsToInvitePreview: boolean) => void;
}) {
  const chats = useChatsStore((state) => state.chats);
  const [selectedChats, setSelectedChats] = useState<string[]>([]);

  const getAvatarUrl = (avatars: Avatar[] | undefined, fallback: string) => {
    if (!avatars || avatars.length === 0) return fallback;
    const primary = avatars.find((a) => a.isPrimary);
    return primary?.avatarUrl || avatars[0].avatarUrl || fallback;
  };

  const toggleChatSelection = (chatId: string) => {
    setSelectedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  };

  function sendInvites() {
    socket.emit("invite", {
      destinationChatId: chatId,
      chatIds: selectedChats,
    });
  }

  return (
    <div className="absolute grid gap-3 bg-background border border-border rounded-2xl top-10 w-full mb-5">
      <div>
        {chats.map((chat) => {
          const isSelected = selectedChats.includes(chat.id);

          return (
            <Button
              key={chat.id}
              className={`flex items-center gap-2 w-full ${isSelected ? "opacity-40" : ""}`}
              onClick={() => toggleChatSelection(chat.id)}
            >
              <img
                src={
                  chat.type === "private"
                    ? getAvatarUrl(
                        chat.chatParticipant.user.avatars,
                        images.icons.avatar,
                      )
                    : getAvatarUrl(chat.avatars, images.icons.groupAvatar)
                }
                className="w-8 h-8 rounded-full bg-gray-300 shrink-0"
                alt="avatar"
              />
              <p>
                {chat.type === "private"
                  ? `${chat.chatParticipant.user.firstName} ${chat.chatParticipant.user.lastName}`
                  : chat.title}
              </p>
            </Button>
          );
        })}
      </div>
      <Button
        onClick={() => {
          sendInvites();
          setIsChatsToInvitePreview(false);
        }}
        variant="primary"
      >
        Отправить в чаты:
      </Button>
      <div className="grid gap-2 mx-3 mb-3">
        {selectedChats.map((id) => {
          const chat = chats.find((chat) => chat.id === id);
          if (!chat) return;
          return (
            <div className="flex items-center gap-2">
              <img
                src={
                  chat.type === "private"
                    ? getAvatarUrl(
                        chat.chatParticipant.user.avatars,
                        images.icons.avatar,
                      )
                    : getAvatarUrl(chat.avatars, images.icons.groupAvatar)
                }
                className="w-8 h-8 rounded-full bg-gray-300 shrink-0"
                alt="avatar"
              />
              <p>
                {chat.type === "private"
                  ? `${chat.chatParticipant.user.firstName} ${chat.chatParticipant.user.lastName}`
                  : chat.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
