import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { AvatarsPreview } from "./AvatarsPreview";

export function ChatDetails() {
  const chat = useOpenChatStore((state) => state.openedChat);

  if (!chat) return;

  const avatars =
    chat.type === "private" ? chat.chatParticipant.user.avatars : chat.avatars;

  return (
    <div className="absolute right-0 top-0 bottom-0 bg-background border-l border-l-border sm:w-100 w-full">
      <div className="flex justify-center mt-7">
        <AvatarsPreview avatars={avatars} />
      </div>
    </div>
  );
}
