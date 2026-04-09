import { images } from "@/src/assets";
import { Button } from "@/src/components/button";
import { usePanelStore } from "@/src/stores/panel-store";
import { useUserStore } from "@/src/stores/user-store";

export function Profile() {
  const setPanel = usePanelStore.getState().setPanel;

  const Buttons = [
    [
      {
        img: images.icons.avatarWhite,
        alt: "Profile",
        text: "Profile",
        onClick: () => setPanel("profile-editor"),
      },
    ],
    [
      {
        img: images.icons.favorites,
        alt: "Favorites",
        text: "Favorites",
        onClick: () => {},
      },
      {
        img: images.icons.devices,
        alt: "Devices",
        text: "Devices",
        onClick: () => {},
      },
    ],
    [
      {
        img: images.icons.exit,
        alt: "Exit",
        text: "Exit",
        onClick: () => {},
      },
    ],
  ];

  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const userName = useUserStore((state) => state.userName);
  const avatar = useUserStore((state) => {
    const avatars = state.avatars;
    return avatars?.find((avatar) => avatar.order === 1);
  });

  return (
    <div className="w-full mt-6">
      <div className="flex flex-col items-center mb-8">
        <div
          className={`w-20 h-20 rounded-3xl mb-2 bg-gray-400 ${!avatar ? "p-5" : ""}`}
        >
          <img
            src={avatar ? avatar.avatarUrl : images.icons.avatar}
            alt="avatar"
            className={`w-full`}
          />
        </div>
        <p className="text-lg">
          {firstName ? firstName : "Ivan"} {lastName ? lastName : "Ivanich"}
        </p>
        <p className="text-sm mt-1 text-gray-400">
          {userName ? `@${userName}` : "@UserExample"}
        </p>
      </div>
      <div className="w-full grid gap-4">
        {Buttons.map((buttons) => {
          return (
            <div className="grid gap-1">
              {buttons.map((button) => {
                return (
                  <Button
                    variant="default"
                    className="w-full flex items-center gap-4"
                    onClick={button.onClick}
                  >
                    <img src={button.img} alt={button.alt} className="w-5" />
                    <p>{button.text}</p>
                  </Button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
