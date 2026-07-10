import { Header } from "./Header";
import { Messages } from "./messages/Messages";
import { Bottom } from "./bottom/Bottom";
import { ChatDetails } from "./chat-details/ChatDetails";

export function Chat() {
  return (
    <div className="flex flex-col flex-1 min-w-dwh sm:min-w-0 h-screen relative overflow-hidden">
      <Header />
      <Messages />
      <Bottom />
      <ChatDetails />
    </div>
  );
}
