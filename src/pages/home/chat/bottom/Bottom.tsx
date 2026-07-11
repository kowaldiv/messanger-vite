import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { JoinChannel } from "./JoinChannel";
import { MessageInput } from "./MessageInput";

export function Bottom() {
  const chatOrUserId = useOpenChatStore((state) => state.openedChat?.id);
  const openedChat = useOpenChatStore((state) => state.openedChat);

  return (
    <div
      className={`${chatOrUserId || "hidden"} w-full flex items-center gap-2 pb-3 px-3 pt-2 absolute bottom-0 backdrop-blur-[2px]`}
    >
      {openedChat?.type !== "channel" ||
      openedChat.myParticipant?.role === "owner" ? (
        <MessageInput />
      ) : (
        <JoinChannel />
      )}
    </div>
  );
}
