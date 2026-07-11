import { socket } from "@/src/socket-io/client";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { Button } from "@/src/ui/components/atoms/Button";

export function JoinChannel() {
  const openChat = useOpenChatStore((state) => state.openedChat);
  const myParticipant = openChat?.myParticipant;

  const handleJoinChannel = async () => {
    socket.emit("joinChat", {
      chatId: openChat?.id,
    });
  };

  const handleLeaveChannel = async () => {
    if (!openChat) return;
    socket.emit("leaveChat", {
      chatId: openChat.id,
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Button
        onClick={myParticipant ? handleLeaveChannel : handleJoinChannel}
        variant={myParticipant ? "default" : "primary"}
      >
        {myParticipant
          ? "Отписаться от сообщества"
          : "Присоедениться в сообщество"}
      </Button>
    </div>
  );
}
