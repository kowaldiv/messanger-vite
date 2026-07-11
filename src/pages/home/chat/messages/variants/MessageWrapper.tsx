import { images } from "@/src/assets";
import { useUserStore } from "@/src/stores/user-store";
import { formatTime } from "@/src/utils/format-time";
import type { ReactNode } from "react";
import type { MessageUser, ReplyTo } from "@/src/schemas/message.schema";

interface MessageWrapperProps {
  user: MessageUser | null;
  createdAt: Date;
  /** Цитата сообщения, на которое отвечают (если это ответ). */
  replyTo?: ReplyTo | null;
  children: ReactNode;
}

export function MessageWrapper({
  user,
  createdAt,
  replyTo,
  children,
}: MessageWrapperProps) {
  const currentUserId = useUserStore((state) => state.id);
  const isOwn = user?.id === currentUserId;
  const time = formatTime(new Date(createdAt));
  const avatarUrl = user?.avatars[0]?.avatarUrl || images.icons.avatar;

  return (
    <div
      className={`flex gap-2 items-end ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      <img
        src={avatarUrl}
        className="w-8 h-8 rounded-full bg-gray-300 shrink-0 mb-5"
        alt="avatar"
      />

      <div className="flex flex-col max-w-[70%] min-w-0">
        <div
          className={`
            px-4 py-2.5 text-sm rounded-2xl wrap-break-word
            ${
              isOwn
                ? "bg-primary text-white rounded-br-sm"
                : "bg-gray-200 text-black rounded-bl-sm"
            }
          `}
        >
          {replyTo && <ReplyPreview replyTo={replyTo} isOwn={isOwn} />}
          {children}
        </div>

        <span
          className={`text-xs text-gray-400 mt-1 ${isOwn ? "text-right" : "text-left"}`}
        >
          {time}
        </span>
      </div>
    </div>
  );
}

/** Цитата исходного сообщения над текстом ответа. */
function ReplyPreview({
  replyTo,
  isOwn,
}: {
  replyTo: ReplyTo;
  isOwn: boolean;
}) {
  const authorName = replyTo.user
    ? [replyTo.user.firstName, replyTo.user.lastName].filter(Boolean).join(" ")
    : "Пользователь";

  return (
    <div
      className={`mb-1.5 min-w-0 border-l-2 pl-2 py-0.5 rounded-sm ${
        isOwn ? "border-white/70 bg-white/10" : "border-primary bg-black/5"
      }`}
    >
      <p
        className={`text-xs font-medium ${isOwn ? "text-white" : "text-primary"}`}
      >
        {authorName}
      </p>
      <p
        className={`text-xs truncate ${isOwn ? "text-white/80" : "text-gray-500"}`}
      >
        {replyTo.text || "Вложение"}
      </p>
    </div>
  );
}
