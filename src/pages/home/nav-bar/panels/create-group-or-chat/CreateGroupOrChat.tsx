import { socket } from "@/src/socket-io/client";
import { Button } from "@/src/ui/components/atoms/Button";
import { Input } from "@/src/ui/components/atoms/Input";
import { useState } from "react";

export function CreateGroupOrChat() {
  const [groupOrChat, setGroupOrchat] = useState<"group" | "channel">("group");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const create = async () => {
    if (!title) return;

    if (groupOrChat === "group") {
      socket.emit("createChat", {
        type: groupOrChat,
        title: title,
      });
    } else if (groupOrChat === "channel") {
      socket.emit("createChat", {
        type: groupOrChat,
        title: title,
        description: description,
        isPrivate: isPrivate,
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-center">
        <Button
          variant="default"
          onClick={() =>
            groupOrChat === "group"
              ? setGroupOrchat("channel")
              : setGroupOrchat("group")
          }
        >
          {groupOrChat === "group" ? "Группа" : "Канал"}
        </Button>
      </div>
      <div className="w-full flex flex-col gap-2 items-center">
        <Input
          value={title}
          placeholder="Название"
          onChange={(e) => setTitle(e.target.value)}
        />
        {groupOrChat === "channel" ? (
          <>
            <Input
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="default" onClick={() => setIsPrivate(!isPrivate)}>
              {isPrivate ? "Приватный" : "Публичный"}
            </Button>
          </>
        ) : (
          ""
        )}
        <Button
          className="mt-2"
          variant="primary"
          onClick={() => create()}
        >
          Создать
        </Button>
      </div>
    </div>
  );
}
