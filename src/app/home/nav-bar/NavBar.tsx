import { images } from "@/src/assets";
import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import { useState } from "react";
import { Profile } from "./panels/Profile";

type Panels = "chats" | "search" | "profile";

export function NavBar() {
  const [panel, setPanel] = useState<Panels>("chats");

  return (
    <nav className="relative h-full w-90 border-r p-4 border-border">
      <div
        className={`w-full flex gap-3 items-center mb-4 
          ${panel === "profile" ? "absolute" : ""}`}
      >
        <Button
          onClick={() =>
            panel === "chats" ? setPanel("profile") : setPanel("chats")
          }
        >
          <img
            src={panel === "chats" ? images.icons.menu : images.icons.back}
            className="w-6 h-6"
            alt="menu button"
          />
        </Button>
        <Input
          placeholder="Search..."
          onClick={() => setPanel("search")}
          className={`flex-1 ${panel === "profile" ? "hidden" : ""}`}
        />
      </div>
      <div className="flex flex-col flex-1">
        {panel === "profile" ? <Profile /> : ""}
      </div>
    </nav>
  );
}
