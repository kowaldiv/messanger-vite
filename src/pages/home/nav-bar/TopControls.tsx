import { Input } from "@/src/ui/components/atoms/Input";
import { useNavBarStore } from "@/src/stores/nav-bar-store";
import { Button } from "@/src/ui/components/atoms/Button";
import { images } from "@/src/assets";
import { searchApi } from "@/src/api/search.api";
import { useSearchStore } from "@/src/stores/search-store";
import { useState } from "react";

export function TopControls() {
  const panel = useNavBarStore((store) => store.panel);
  const setPanel = useNavBarStore((store) => store.setPanel);
  const [timeOut, setTimeOut] = useState<number | null>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const pattern = e.target.value.trim();

  if (timeOut) {
    clearTimeout(timeOut);
    setTimeOut(null);
  }

  if (pattern === "") {
    useSearchStore.getState().clearUsersAndChats();
    return;
  }

  setTimeOut(
    setTimeout(async () => {
      try {
        const data = await searchApi.search({ pattern });
        if (!data.success) {
          console.log(data.userMessage);
          return;
        }
        console.log(data.data);
        useSearchStore.getState().setUsersAndChats(data.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500),
  );
};

  return (
    <div
      className={` flex gap-3 items-center mb-4 z-1
        ${panel === "chats" || panel === "search" ? "" : "absolute"}`}
    >
      <Button
        onClick={() =>
          panel === "chats" ? setPanel("profile") : setPanel("chats")
        }
      >
        <img
          src={panel === "chats" ? images.icons.menu : images.icons.arrow}
          className="min-w-6 min-h-6 max-w-6 max-h-6"
          alt="menu button"
        />
      </Button>
      <div
        className={`flex-1 min-w-0 ${panel === "chats" || panel === "search" ? "" : "hidden"}`}
      >
        <Input
          placeholder="Search..."
          onClick={() => setPanel("search")}
          onChange={onChange}
          className="w-full min-w-0"
        />
      </div>
    </div>
  );
}
