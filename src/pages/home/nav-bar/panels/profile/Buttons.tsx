import { images } from "@/src/assets";
import { Button } from "@/src/ui/components/atoms/Button";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";
import { useNavBarStore } from "@/src/stores/nav-bar-store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/src/api/auth.api";
import { useChatsStore } from "@/src/stores/chats-store";
import { useMessagesStore } from "@/src/stores/messages-store";
import { useUserStore } from "@/src/stores/user-store";
import { useOpenChatStore } from "@/src/stores/open-chat-store";

export function Buttons() {
  const navigate = useNavigate();
  const setPanel = useNavBarStore.getState().setPanel;

  const [isRequestPending, setIsRequestPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const Buttons = [
    [
      {
        img: images.icons.avatar,
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
        onClick: () => setPanel("devices"),
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
    const result = await authApi.logout();
    setIsRequestPending(false);
    if (!result.success) {
      setErrorMessage(result.userMessage);
    } else {
      useChatsStore.getState().reset();
      useMessagesStore.getState().reset();
      useOpenChatStore.getState().reset();
      useUserStore.getState().reset();
      navigate(DASHBOARD_PAGES.SIGN_IN);
    }
  };

  return (
    <div className="w-full grid gap-4">
      {Buttons.map((buttons, index) => {
        return (
          <div key={index} className="grid gap-1">
            {buttons.map((button) => {
              return (
                <Button
                  key={button.text}
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
