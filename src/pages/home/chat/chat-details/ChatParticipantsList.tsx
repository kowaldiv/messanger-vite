import { useState } from "react";
import { images } from "@/src/assets";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { Button } from "@/src/ui/components/atoms/Button";
import type { PublicUser } from "@/src/schemas/user.schema";
import { createChatPreview } from "@/src/utils/create-chat-preview";
import { useNavBarStore } from "@/src/stores/nav-bar-store";
import { useChatsStore } from "@/src/stores/chats-store";
import { socket } from "@/src/socket-io/client";

export function ChatParticipantsList() {
  const openChat = useOpenChatStore((state) => state.openedChat);
  const [openedParticipantId, setOpenedParticipantId] = useState<string | null>(
    null,
  );

  if (openChat?.type !== "group") return;

  const toggleParticipant = (userId: string) => {
    setOpenedParticipantId((prev) => (prev === userId ? null : userId));
  };

  return (
    <div className="mt-6">
      <p className="text-center">Участники чата:</p>
      <div className="mt-2 flex flex-col gap-3">
        {[openChat.myParticipant, ...openChat.chatParticipants].map(
          (participant) => {
            if (!participant) return;
            const isOpened = openedParticipantId === participant.user.id;

            return (
              <div key={participant.user.id} className="relative">
                <Button
                  className="flex justify-between items-center w-full"
                  onClick={() => toggleParticipant(participant.user.id)}
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={
                        participant.user?.avatars[0]
                          ? participant.user.avatars[0].avatarUrl
                          : images.icons.avatar
                      }
                      className="w-8 h-8 rounded-full bg-gray-300 shrink-0"
                      alt="avatar"
                    />
                    <p>
                      {participant.user.firstName} {participant.user.lastName}
                    </p>
                  </div>
                  <p>
                    {participant.role === "member"
                      ? "Участник"
                      : participant.role === "owner"
                        ? "Админ"
                        : ""}
                  </p>
                </Button>

                {isOpened && (
                  <ParticipantActions
                    openChatId={openChat.id}
                    user={participant.user}
                    isUserOwner={openChat.myParticipant?.role === "owner"}
                    isCurrentUser={
                      openChat.myParticipant?.user.id === participant.user.id
                    }
                  />
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

function ParticipantActions({
  openChatId,
  isUserOwner,
  user,
  isCurrentUser,
}: {
  openChatId: string;
  isUserOwner: boolean;
  user: PublicUser;
  isCurrentUser: boolean;
}) {
  const chats = useChatsStore((state) => state.chats);

  function kickUserFromChat() {
    socket.emit("kickUser", {
      chatId: openChatId,
      targetUserId: user.id,
    });
  }

  function transferOwnership() {
    socket.emit("transferOwnership", {
      chatId: openChatId,
      newOwnerId: user.id,
    });
  }

  return (
    <div className="z-50 flex flex-col rounded-2xl bg-background border border-border absolute left-0 right-0 w-full">
      {isCurrentUser && <Button>Это вы!</Button>}
      {!isCurrentUser && (
        <Button
          onClick={() => {
            const chat = chats.find(
              (chat) =>
                chat.type === "private" &&
                chat.chatParticipant.user.id === user.id,
            );
            if (chat) {
              useOpenChatStore.getState().setOpenedChat(chat);
              useNavBarStore.getState().setIsHidden(true);
              return;
            }
            useOpenChatStore
              .getState()
              .setOpenedChat(createChatPreview(user), true);
            useNavBarStore.getState().setIsHidden(true);
            useNavBarStore.getState().setPanel("chats");
          }}
        >
          Написать сообщение
        </Button>
      )}
      {isUserOwner && !isCurrentUser && (
        <Button onClick={kickUserFromChat}>Исключить пользователя</Button>
      )}
      {isUserOwner && !isCurrentUser && (
        <Button onClick={transferOwnership}>Передать права владельца</Button>
      )}
    </div>
  );
}
