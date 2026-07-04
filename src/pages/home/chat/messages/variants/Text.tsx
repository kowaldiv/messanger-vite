import { images } from "@/src/assets";
import type { TextMessage } from "@/src/schemas/message.schema";
import { useUserStore } from "@/src/stores/user-store";
import { formatTime } from "@/src/utils/format-time";

export function TextMessage({ message }: { message: TextMessage }) {
  const currentUserId = useUserStore((state) => state.id);
  const isOwn = currentUserId === message.user?.id;
  const time = formatTime(new Date(message.createdAt));

  return (
    <div className={`flex gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
      <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0">
        <img
          src={
            message.user?.avatars[0]
              ? message.user?.avatars[0].avatarUrl
              : images.icons.avatarWhite
          }
          className="min-w-6 min-h-6 max-w-6 max-h-6"
          alt="menu button"
        />
      </div>

      {/* Сообщение */}
      <div className="flex flex-col max-w-[70%]">
        <div
          className={`
            px-4 py-2.5 rounded-2xl wrap-break-word
            ${
              isOwn
                ? "bg-primary text-white rounded-br-sm"
                : "bg-gray-200 text-black rounded-bl-sm"
            }
          `}
        >
          {message.text}
        </div>

        {/* Время */}
        <span
          className={`text-xs text-gray-400 mt-1 ${isOwn ? "text-right" : "text-left"}`}
        >
          {time}
        </span>
      </div>
    </div>
  );
}
