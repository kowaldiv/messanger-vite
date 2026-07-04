import { images } from "@/src/assets";
import { useNavBarStore } from "@/src/stores/nav-bar-store";
import { useOpenChatStore } from "@/src/stores/open-chat-store";
import { Button } from "@/src/ui/components/atoms/Button";

export function Header() {
  const chat = useOpenChatStore((state) => state.openedChat);
  if (!chat) return;

  const getAvatarUrl = () => {
    if (chat.type === "private") {
      return (
        chat.chatParticipant.user.avatars?.[0]?.avatarUrl || images.icons.avatar
      );
    }
    if (chat.type === "group" || chat.type === "channel") {
      return chat.avatars?.[0]?.avatarUrl || images.icons.groupAvatar;
    }
    return images.icons.avatar;
  };

  return (
    <div className="w-full max-w-dvw px-2 max-h-15 h-15 border-b border-b-border flex items-center justify-between">
      <Button
        className="sm:hidden"
        onClick={() => useNavBarStore.getState().setIsHidden(false)}
      >
        <img
          src={images.icons.arrow}
          className="min-w-6 min-h-6 max-w-6 max-h-6"
          alt="menu button"
        />
      </Button>
      <Button
        className="hidden sm:block"
        onClick={() => useNavBarStore.getState().setIsHidden(false)}
      >
        <img
          src={images.icons.arrow}
          className="min-w-6 min-h-6 max-w-6 max-h-6"
          alt="menu button"
        />
      </Button>
      <div className="min-w-0 flex-1">
        <p className="text-center text-nowrap truncate">
          {chat.type === "private"
            ? `${chat.chatParticipant.user.firstName} ${chat.chatParticipant.user.lastName}`
            : chat.title}
        </p>
      </div>
      <Button>
        <img
          src={getAvatarUrl()}
          alt="avatar"
          className="max-w-10 max-h-10 min-w-10 min-h-10 bg-white rounded-full"
        />
      </Button>
    </div>
  );
}
