import type { JoinedMessage as JoinedMessageType } from "@/src/schemas/message.schema";

/** Системное сообщение "X присоединился к чату" — по центру, без пузыря/аватара. */
export function JoinedMessage({ message }: { message: JoinedMessageType }) {
  const { firstName, lastName } = message.metadata;
  const name = [firstName, lastName].filter(Boolean).join(" ").trim();

  return (
    <div className="flex justify-center py-1">
      <span className="px-3 py-1 rounded-full bg-black/30 text-white text-xs backdrop-blur-sm">
        <span className="font-medium">{name || "Пользователь"}</span>{" "}
        присоединился к чату
      </span>
    </div>
  );
}
