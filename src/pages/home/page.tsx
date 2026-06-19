import { Chat } from "./chat/chat";
import { NavBar } from "./nav-bar/NavBar";

export default function Home() {
  return (
    <div className="h-dvh flex">
      <NavBar />
      <Chat />
    </div>
  );
}
