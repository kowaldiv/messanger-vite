import { images } from "@/src/assets";
import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import { Profile } from "./panels/Profile";
import { ProfileEditor } from "./panels/ProfileEditor/ProfileEditor";
import { usePanelStore } from "@/src/stores/panel-store";

export function NavBar() {
  const panel = usePanelStore((store) => store.panel);
  const setPanel = usePanelStore((store) => store.setPanel);

  return (
    <nav className="relative h-full w-90 border-r p-4 border-border">
      <div
        className={`w-full flex gap-3 items-center mb-4 z-1
          ${panel === "chats" || panel === "search" ? "" : "absolute"}`}
      >
        <Button
          onClick={() =>
            panel === "chats" ? setPanel("profile") : setPanel("chats")
          }
        >
          <img
            src={panel === "chats" ? images.icons.menu : images.icons.arrow}
            className="w-6 h-6"
            alt="menu button"
          />
        </Button>
        <Input
          placeholder="Search..."
          onClick={() => setPanel("search")}
          className={`flex-1 ${panel === "chats" || panel === "search" ? "" : "hidden"}`}
        />
      </div>
      <div className="flex flex-col flex-1">
        {panel === "profile" ? (
          <Profile />
        ) : panel === "profile-editor" ? (
          <ProfileEditor />
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
