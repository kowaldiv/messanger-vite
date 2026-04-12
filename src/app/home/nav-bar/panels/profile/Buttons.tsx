import { images } from "@/src/assets";
import { Button } from "@/src/components/button";
import { usePanelStore } from "@/src/stores/panel-store";
import { useUserStore } from "@/src/stores/user-store";
import { useState } from "react";

export function Buttons() {
  const setPanel = usePanelStore.getState().setPanel;

  const [isRequestPending, setIsRequestPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        alt: "Logout",
        text: "Logout",
        onClick: () => handleLogout(),
      },
    ],
  ];

  const handleLogout = async () => {
    setIsRequestPending(true);
    const result = await useUserStore.getState().logout();
    setIsRequestPending(false);
    if (!result.success) {
      setErrorMessage(result.userMessage);
    }
  };

  return (
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
                  disabled={button.text === "Logout" && isRequestPending}
                >
                  <img src={button.img} alt={button.alt} className="w-5" />
                  <p>{button.text}</p>
                </Button>
              );
            })}
          </div>
        );
      })}
      {errorMessage ? (
        <p className="text-center text-sm sm:text-base text-red-600 mt-2">
          {errorMessage}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
