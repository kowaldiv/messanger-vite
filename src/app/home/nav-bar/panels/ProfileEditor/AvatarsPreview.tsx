import { images } from "@/src/assets";
import { Button } from "@/src/components/button";
import { useUserStore } from "@/src/stores/user-store";
import { useCallback, useRef, useState } from "react";

export function AvatarPreview({
  setErrorMessage,
}: {
  setErrorMessage: (errorMessage: string) => void;
}) {
  const avatars = useUserStore((state) => state.avatars);
  const imagePlaceholderRef = useRef<HTMLDivElement>(null);
  const [openedAvatarIndex, setOpenedAvatarIndex] = useState(1);

  const [isRequestPending, setIsRequestPending] = useState(false);

  const scrollToIndex = useCallback(
    (side: "left" | "right") => {
      if (!imagePlaceholderRef.current) return;

      let newIndex = openedAvatarIndex;
      if (side === "left") newIndex = openedAvatarIndex - 1;
      if (side === "right") newIndex = openedAvatarIndex + 1;

      if (newIndex < 1 || newIndex > (avatars?.length ?? 0)) return;

      const offset = -(newIndex - 1) * imagePlaceholderRef.current.offsetWidth;
      imagePlaceholderRef.current.style.transform = `translateX(${offset}px)`;
      setOpenedAvatarIndex(newIndex);
    },
    [openedAvatarIndex, avatars],
  );

  const handleDeleteAvatar = async () => {
    if (!avatars || !avatars[openedAvatarIndex]) return;
    setIsRequestPending(true);
    const result = await useUserStore
      .getState()
      .deleteAvatar(avatars[openedAvatarIndex].avatarId);
    setIsRequestPending(false);
    if (!result.success) {
      setErrorMessage(result.userMessage);
    }
  };

  return (
    <div className="flex w-60 h-60 relative">
      <div className="absolute flex w-full h-60 bg-black overflow-hidden">
        <div ref={imagePlaceholderRef} className="flex w-full transition">
          {avatars?.map((avatar) => {
            return (
              <div className="min-w-full">
                <img
                  src={avatar ? avatar.avatarUrl : images.icons.avatar}
                  alt="avatar"
                  className="w-full h-full object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
      <Button
        disabled={isRequestPending}
        onClick={() => scrollToIndex("left")}
        className="z-1 absolute w-12 h-12 top-1/2 -translate-y-1/2 left-0"
      >
        <img src={images.icons.arrow} alt="" />
      </Button>
      <Button
        disabled={isRequestPending}
        onClick={() => scrollToIndex("right")}
        className="z-1 absolute w-12 h-12 top-1/2 -translate-y-1/2 right-0 rotate-180"
      >
        <img src={images.icons.arrow} alt="" />
      </Button>
      <Button
        disabled={isRequestPending}
        onClick={() => handleDeleteAvatar()}
        className="z-1 absolute w-12 h-12 right-0"
      >
        <img src={images.icons.trashBin} alt="" />
      </Button>
    </div>
  );
}
