import { Profile } from "./panels/profile/Profile";
import { ProfileEditor } from "./panels/profile-editor/ProfileEditor";
import { Devices } from "./panels/devices/Devices";
import { TopControls } from "./TopControls";
import { useNavBarStore } from "@/src/stores/nav-bar-store";
import { SearchResult } from "./panels/search/SearchResult";
import { Chats } from "./panels/chats/Chats";
import { CreateGroupOrChat } from "./panels/create-group-or-chat/CreateGroupOrChat";

export function NavBar() {
  const panel = useNavBarStore((store) => store.panel);

  return (
    <nav className="relative h-full flex flex-col min-w-dvw sm:min-w-90 w-dvw sm:w-90 border-r p-4 border-border">
      <TopControls />
      <div className="flex flex-col min-h-0 flex-1">
        {panel === "profile" ? (
          <Profile />
        ) : panel === "profile-editor" ? (
          <ProfileEditor />
        ) : panel === "devices" ? (
          <Devices />
        ) : panel === "search" ? (
          <SearchResult />
        ) : panel === "chats" ? (
          <Chats />
        ) : panel === "create-group-or-chat" ? (
          <CreateGroupOrChat />
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
