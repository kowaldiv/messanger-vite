import { images } from "@/src/assets";
import { socket } from "@/src/socket-io/client";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { Button } from "@/src/ui/components/atoms/Button";
import { Input } from "@/src/ui/components/atoms/Input";
import { useRef } from "react";

export function MessageInput() {
  const chatOrUserId = useOpenChatStore((state) => state.openedChat?.id);
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if (!chatOrUserId) return;
    const text = inputRef.current?.value.trim();
    if (!text) return;

    console.log(`Отправляю сообщение: '${text}'`);
    socket.emit("sendMessage", {
      chatIdOrUserId: chatOrUserId,
      text: text,
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div
      className={`${chatOrUserId || "hidden"} w-full flex items-center gap-2 pb-3 px-3 pt-2 absolute bottom-0 backdrop-blur-[2px]`}
    >
      <Button>
        <img
          src={images.icons.parperclip}
          className="min-w-6 min-h-6 max-w-6 max-h-6"
          alt="menu button"
        />
      </Button>
      <Input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        placeholder="Сообщение"
        className="flex-1 min-w-0"
      />
      <Button onClick={sendMessage}>
        <img
          src={images.icons.arrow}
          className="min-w-6 min-h-6 max-w-6 max-h-6 rotate-90"
          alt="menu button"
        />
      </Button>
    </div>
  );
}
