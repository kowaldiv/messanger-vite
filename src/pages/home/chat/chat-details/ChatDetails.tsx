import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { AvatarsPreview } from "./AvatarsPreview";
import { useChatDetailsStore } from "@/src/stores/chat-details-store";
import { useEffect } from "react";
import { Button } from "@/src/ui/components/atoms/Button";
import { images } from "@/src/assets";
import { ChatParticipantsList } from "./ChatParticipantsList";
import { Buttons } from "./Buttons";

export function ChatDetails() {
  const isOpen = useChatDetailsStore((state) => state.isOpen);
  const chat = useOpenChatStore((state) => state.openedChat);

  useEffect(() => {
    useChatDetailsStore.getState().setIsOpen(false);
  }, [chat?.id]);

  if (!chat || !isOpen) return;

  const avatars =
    chat.type === "private" ? chat.chatParticipant.user.avatars : chat.avatars;

  return (
    <div className="absolute px-10 right-0 top-0 bottom-0 bg-background border-l border-l-border sm:w-100 w-full max-h-screen overflow-y-auto">
      <Button
        className="absolute left-2 top-3"
        onClick={() => useChatDetailsStore.getState().setIsOpen(false)}
      >
        <img
          src={images.icons.arrow}
          className="min-w-6 min-h-6 max-w-6 max-h-6"
          alt="menu button"
        />
      </Button>
      <div className="flex justify-center mt-7">
        <AvatarsPreview avatars={avatars} />
      </div>
      {chat.type === "private" ? (
        <div className="mt-3">
          <p className="text-center">
            {chat.chatParticipant.user.firstName}{" "}
            {chat.chatParticipant.user.lastName}
          </p>
          <p className="text-center">@{chat.chatParticipant.user.username}</p>
        </div>
      ) : (
        ""
      )}
      <p className={`mt-6 text-center ${chat.type !== "channel" && "hidden"}`}>
        {chat.type === "channel"
          ? `Описание Канала: ${chat.channelSettings.description}`
          : ""}
      </p>
      <ChatParticipantsList />
      {chat.type !== "private" ? (
        <Buttons
          isUserOwner={chat.myParticipant?.role === "owner"}
          chatId={chat.id}
        />
      ) : (
        ""
      )}
    </div>
  );
}
