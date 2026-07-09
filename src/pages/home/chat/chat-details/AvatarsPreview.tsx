import { images } from "@/src/assets";
import { Button } from "@/src/ui/components/atoms/Button";
import { useCallback, useRef, useState } from "react";
import type { Avatar } from "@/src/schemas/avatar.schema";

export function AvatarsPreview({ avatars }: { avatars: Avatar[] }) {
  const imagePlaceholderRef = useRef<HTMLDivElement>(null);
  const [openedAvatarIndex, setOpenedAvatarIndex] = useState(1);

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

  return (
    <div className="flex w-60 h-60 relative">
      <div className="absolute flex w-full h-60 bg-black overflow-hidden">
        <div ref={imagePlaceholderRef} className="flex w-full transition">
          {avatars?.map((avatar, index) => {
            return (
              <div className="min-w-full" key={index}>
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
        onClick={() => scrollToIndex("left")}
        className={`z-1 absolute w-12 h-12 top-1/2 -translate-y-1/2 left-0 ${avatars.length < 2 ? "hidden" : ""}`}
      >
        <img src={images.icons.arrow} alt="" />
      </Button>
      <Button
        onClick={() => scrollToIndex("right")}
        className={`z-1 absolute w-12 h-12 top-1/2 -translate-y-1/2 right-0 rotate-180 ${avatars.length < 2 ? "hidden" : ""}`}
      >
        <img src={images.icons.arrow} alt="" />
      </Button>
    </div>
  );
}
