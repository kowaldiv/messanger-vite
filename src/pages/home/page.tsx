import { useNavBarStore } from "@/src/stores/nav-bar-store";
import { Chat } from "./chat/Chat";
import { NavBar } from "./nav-bar/NavBar";

export default function Home() {
  const isNavBarHidden = useNavBarStore((state) => state.isHidden);

  return (
    <div className="max-w-dvw overflow-hidden">
      <div
        className={`flex min-w-[200dvw] sm:min-w-dvh h-dvh transition-transform duration-300 sm:translate-x-0 ${
          isNavBarHidden ? "-translate-x-[100dvw]" : "translate-x-0"
        }`}
      >
        <NavBar />
        <Chat />
      </div>
    </div>
  );
}
