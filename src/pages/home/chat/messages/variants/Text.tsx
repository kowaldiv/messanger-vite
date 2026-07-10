import type { TextMessage as TextMessageType } from "@/src/schemas/message.schema";
import { MessageWrapper } from "./MessageWrapper";

export function TextMessage({ message }: { message: TextMessageType }) {
  return (
    <MessageWrapper
      user={message.user}
      createdAt={message.createdAt}
      replyTo={message.replyTo}
    >
      {message.text}
    </MessageWrapper>
  );
}
