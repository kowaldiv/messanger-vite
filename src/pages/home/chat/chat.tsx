import { Header } from "./Header";
import { MessageInput } from "./MessageInput";
import { Messages } from "./messages/Messages";

export function Chat() {
  return (
    <div className="flex flex-col flex-1 min-w-dwh sm:min-w-0 h-full relative overflow-hidden">
      <Header />
      <Messages />
      <MessageInput />
    </div>
  );
}
