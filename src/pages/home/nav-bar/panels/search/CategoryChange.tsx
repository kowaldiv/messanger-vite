import { Button } from "@/src/ui/components/atoms/Button";
import type { Tab } from "./SearchResult";

interface Button {
  title: string;
  tab: Tab;
}

export function CategoryChange({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (tab: Tab) => void;
}) {
  const buttons: Button[] = [
    {
      title: "Пользователи",
      tab: "users",
    },
    {
      title: "Каналлы",
      tab: "channels",
    },
  ];

  return (
    <div>
      {buttons.map((button) => {
        return (
          <Button
            key={button.tab}
            className={`${button.tab === tab ? "" : "text-gray-400"}`}
            onClick={() => setTab(button.tab)}
          >
            {button.title}
          </Button>
        );
      })}
    </div>
  );
}
