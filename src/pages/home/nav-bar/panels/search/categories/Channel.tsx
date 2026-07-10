import { images } from "@/src/assets";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { useSearchStore } from "@/src/stores/search-store";
import { Button } from "@/src/ui/components/atoms/Button";

export function ChannelCategory() {
  const chats = useSearchStore((state) => state.chats);
  return (
    <>
      {chats.length === 0 ? (
        <p className="mt-5 text-center">Каналлы не найдены</p>
      ) : (
        ""
      )}
      {chats.map((chat) => {
        if (chat.type !== "channel") return;
        return (
          <Button
            onClick={() => useOpenChatStore.getState().setOpenedChat(chat)}
            key={chat.id}
            className="m-1 flex gap-3 items-center"
          >
            <img
              className="w-10 h-10 rounded-full bg-white"
              src={
                chat.avatars[0]
                  ? chat.avatars[0].avatarUrl
                  : images.icons.groupAvatar
              }
            />
            <p>{chat.title}</p>
          </Button>
        );
      })}
    </>
  );
}
