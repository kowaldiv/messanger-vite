import { images } from "@/src/assets";
import { socket } from "@/src/socket-io/client";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { Button } from "@/src/ui/components/atoms/Button";
import { Input } from "@/src/ui/components/atoms/Input";
import { useState } from "react";

export function MessageInput() {
  const chatOrUserId = useOpenChatStore((state) => state.openedChat?.id);
  const [text, setText] = useState<string>("");

  function sendMessage() {
    if (!chatOrUserId) return;
    if (!text.trim()) return;

    console.log(`Отправляю сообщение: '${text}'`)
    socket.emit("sendMessage", {
      chatIdOrUserId: chatOrUserId,
      text: text.trim(),
    });

    setText("");
  }

  return (
    <div className={`${chatOrUserId || "hidden"} w-full flex items-center gap-2 pb-3 px-3 pt-2 absolute bottom-0 backdrop-blur-[2px]`}>
      <Button>
        <img
          src={images.icons.parperclip}
          className="min-w-6 min-h-6 max-w-6 max-h-6"
          alt="menu button"
        />
      </Button>
      <Input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Сообщение"
        className="flex-1"
      />
      <Button className={`${text.length > 0 ? "" : "hidden"}`} onClick={sendMessage}>
        <img
          src={images.icons.arrow}
          className="min-w-6 min-h-6 max-w-6 max-h-6 rotate-90"
          alt="menu button"
        />
      </Button>
    </div>
  );
}
