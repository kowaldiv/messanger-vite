import { useState } from "react";
import { UserCategory } from "./categories/User";
import { ChannelCategory } from "./categories/Channel";
import { CategoryChange } from "./CategoryChange";

export type Tab = "users" | "channels";

export function SearchResult() {
  const [tab, setTab] = useState<Tab>("users");

  return (
    <div className="w-full flex flex-col">
      <CategoryChange tab={tab} setTab={setTab} />
      {tab === "users" ? (
        <UserCategory />
      ) : tab === "channels" ? (
        <ChannelCategory />
      ) : (
        ""
      )}
    </div>
  );
}
