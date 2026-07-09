import { socket } from "@/src/socket-io/client";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { Button } from "@/src/ui/components/atoms/Button";

export function JoinChannel() {
  const openChat = useOpenChatStore((state) => state.openedChat);

  const handleJoinChannel = async () => {
    socket.emit("joinChat", {
      chatId: openChat?.id,
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Button onClick={handleJoinChannel} variant="primary">
        Присоедениться в сообщество
      </Button>
    </div>
  );
}
