import { images } from "@/src/assets";
import { useChatsStore } from "@/src/stores/chats-store";
import { useNavBarStore } from "@/src/stores/nav-bar-store";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { useSearchStore } from "@/src/stores/search-store";
import { Button } from "@/src/ui/components/atoms/Button";
import { createChatPreview } from "@/src/utils/create-chat-preview";

export function UserCategory() {
  const users = useSearchStore((state) => state.users);
  const chats = useChatsStore((state) => state.chats);

  return (
    <>
      {users.length === 0 ? (
        <p className="mt-5 text-center">Пользователи не найдены</p>
      ) : (
        ""
      )}
      {users.map((user) => {
        return (
          <Button
            key={user.id}
            onClick={() => {
              const chat = chats.find(
                (chat) =>
                  chat.type === "private" &&
                  chat.chatParticipant.user.id === user.id,
              );
              if (chat) {
                console.log(JSON.stringify(chat));
                useOpenChatStore.getState().setOpenedChat(chat);
                useNavBarStore.getState().setIsHidden(true);
                return;
              }
              useOpenChatStore
                .getState()
                .setOpenedChat(createChatPreview(user), true);
              useNavBarStore.getState().setIsHidden(true);
              useNavBarStore.getState().setPanel("chats");
            }}
            className="m-1 flex gap-3 items-center"
          >
            <img
              className="w-10 h-10 rounded-full bg-white"
              src={
                user.avatars[0]
                  ? user.avatars[0].avatarUrl
                  : images.icons.avatar
              }
            />
            <div className="flex gap-2">
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
            </div>
          </Button>
        );
      })}
    </>
  );
}
