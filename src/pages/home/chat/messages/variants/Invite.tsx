import type { InviteMessage as InviteMessageType } from "@/src/schemas/message.schema";
import { Button } from "@/src/ui/components/atoms/Button";
import { images } from "@/src/assets";
import { MessageWrapper } from "./MessageWrapper";
import { socket } from "@/src/socket-io/client";

interface InviteMessageProps {
  message: InviteMessageType;
  onAccept?: (inviteId?: string) => void;
  onDecline?: (inviteId?: string) => void;
}

export function InviteMessage({ message }: InviteMessageProps) {
  const metadata = message.metadata;
  const chat = metadata.chat;
  const chatAvatar = chat.avatars[0]?.avatarUrl || images.icons.avatar;

  const isExpired =
    "expiresAt" in metadata && new Date(metadata.expiresAt) < new Date();


  function joinByInvite() {
    if ("token" in metadata && metadata.token) {
      socket.emit("joinChat", {
        inviteLinkToken: metadata.token,
      });
    } else {
      socket.emit("joinChat", {
        chatId: metadata.chat.id,
      });
    }
  }

  return (
    <MessageWrapper user={message.user} createdAt={message.createdAt}>
      <div className="px-4 py-3 rounded-2xl bg-gray-100 text-black rounded-bl-sm max-w-70">
        {/* Заголовок */}
        <p className="text-xs text-gray-500 mb-2">
          {message.user?.firstName} приглашает вас в{" "} {chat.title}
        </p>

        {/* Информация о чате */}
        <div className="flex gap-3 items-center mb-3">
          <img
            src={chatAvatar}
            alt={chat.title}
            className="w-10 h-10 rounded-full bg-gray-300 shrink-0 object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{chat.title}</p>

          </div>
        </div>

        {/* Срок действия */}
        {"expiresAt" in metadata && (
          <p className="text-xs text-gray-500 mb-3">
            {isExpired
              ? "⚠️ Приглашение истекло"
              : `Действует до ${new Date(metadata.expiresAt).toLocaleDateString("ru-RU")}`}
          </p>
        )}

        {/* Кнопки действий */}
        <div>
          <Button
            onClick={joinByInvite}
            variant="default"
            disabled={isExpired}
            className="flex-1 text-xs"
          >
            {isExpired ? "Истекло" : "Принять"}
          </Button>
        </div>
      </div>
    </MessageWrapper>
  );
}
